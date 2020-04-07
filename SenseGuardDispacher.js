const fs = require('fs');
const coreutils = require('util');
const MeasurementRate= require('./MeasurementRate').MeasurementRate;
const Moment= require('moment');
//const RestClient=require('./restClient').RestClient;
const request = require('request-promise');
const readFile = coreutils.promisify(fs.readFile);


class SenseGuardDispacher {
    _recordFile;
    _options;
    

    constructor() {
        this._configJson = '';
        this._data = [];
        this._fileFullPath = '';
        this.macAdrs='';
        this.measureStartTime='';
        this.getIdURL='';
        this.postResultURL='';
        this.reportCnt=0;
    }

    get Data() { return this._data; }

    async init() {
        await this.readConfig();
        this.macAdrs=this.findMacAdrs();
        this.measureStartTime=this.findMeasureStartTime();
    }

    getFile(path){
        return readFile(path);
    }

    async readConfig() {
        this._configJson= JSON.parse(await this.getFile('./config.json'));
        this._options = this._configJson.options;
        this._fileFullPath = this._configJson.recordPath + this._configJson.fileName;
        this.getIdURL=this._configJson.getIdURL;
        this.postResultURL=this._configJson.postResultURL;
        this._recordFile=await this.getFile(this._fileFullPath);
        return this;
    }

    findMacAdrs(){
        console.log('finding mac address');
        return this._recordFile.toString().match(/^[\s*]|[a-fA-F0-9:]{17}|[\s*a-fA-F0-9]{12}$/)[0];
    }

    findMeasureStartTime(){
        console.log('finding measure start time');
        let startTimeStr= this._recordFile.toString().match(/\d{1,2}:\d{1,2}:\d{1,2}\.\d+/)[0]
        .replace('.',':');
        return Moment(startTimeStr, 'HH:mm:ss:SSS');
    }

    parse() {
        let mr= new MeasurementRate();
        let linesArr = this._recordFile.toString().split('\n');
        let headersLst = linesArr[this._options.headers.startInLine - 1].split(/\s+/)
        for (let i = this._options.data.startInLine; i < linesArr.length; i++) {
            if(linesArr[i]!=""){
                let dataLst = linesArr[i].split(/\s+/);
                let newVal = [];
                dataLst.forEach((val, idx) => {
                    newVal[headersLst[idx].toLowerCase()] = val;
                });
                    
                this._data.push(newVal);
            }
        }
    }

    sendReports(){
        this._data.forEach(async (val, idx)=>{
            let json= await this.deriveMRJson(val);
            request.post(this.postResultURL, {json: json}, req=>{
                console.log('request success');
                this.reportCnt++;
            }).catch(err=>{
                console.log(err);
            });
        });
    }

    async deriveMRJson(singleReport){
        try{
            let mr= new MeasurementRate();
            let body=await request(this.getIdURL).catch(err=>{
                console.log(err);
            });

            mr.unitId=JSON.parse(body).new_id;
            mr.patientId=this._configJson['patientId'];
            mr.gender= "male";
            mr.vendor="SenseGuard";
            let timeTag=this.measureStartTime.clone();
            let secondsToAdd=parseInt(singleReport['time'].split('.')[0]);
            let msToAdd=parseInt(singleReport['time'].split('.')[1]);
            timeTag.add('s', secondsToAdd);
            timeTag.add('ms', msToAdd);
            mr.timeTag=timeTag.format('HH:mm:ss:SSS');
            return mr;

        } catch(exception){
            console.log('deriving json failed to report');
        }
    }
}

module.exports.SenseGuardDispacher = SenseGuardDispacher