const request = require('request-promise');

class RestClient {
    static async getReq(srcUrl='http://52.16.82.127:3000/new_id') {
        let body= await request(srcUrl).catch(err=>{
            console.log(err);
        });

        return body;
    }

    static async postJson(dstUrl="http://52.16.82.127:3000/mr", json) {
        return await request.post(dstUrl, {json: json}).catch(err=>{
            console.log(err);
        });
    }
}

RestClient.getReq();
module.exports.RestClient = RestClient;