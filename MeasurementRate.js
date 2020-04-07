
class MeasurementRate{
    constructor(){
        this.unitId= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.patientId= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.age= -1;
        this.weight= -1;
        this.gender= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.timeTag= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.vendor= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.audioPath= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.primery_priority= {
            pulse: 0,
            fev1: -1,
            fvc: -1,
            tlc: -1,
            rv: -1,
            erv: -1,
            frc: -1,
            breath_rate: -1,
            wheezing: false,
            cough_presence_rate: -1
        };
        this.secondery_priority= {
            fever: -1,
            bpm: -1,
            rpmf: -1,
            saturation: -1,
            blood_pressure_h: -1,
            blood_pressure_l: -1
        };
    }
    

    // get unitId(){}
    // get patientId()= "ABCDEFGHIJKLMNOPQRSTUVWXY",
    // get age()= 934,
    // get weight()= 599.75,
    // get gender()= "ABCDEFGHIJKLMNOPQRS",
    // get timeTag()= "ABCDEFGH",
    // get vendor()= "ABCDEFGHIJ",
    // get audioPath()= "ABCDEFGHIJKLMNOPQRSTUV",
    // get primery_priority()= {
    //     get secondery_priority
}

module.exports.MeasurementRate=MeasurementRate;