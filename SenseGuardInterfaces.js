class SenseGuardDetails{
    _maxAdrs;
    _version;
    _headers;
    _patient;
    _measureStartTime;
    _data;

    constructor(){
        this._data=[];
    }

    addValue(newVal){
        this._data.push(newVal);
    }

    static parse(){
        
    }

    get Data(){return this._data;}
}

module.exports.SenseGuardDetails=SenseGuardDetails;