// import { web3, lms } from '../helpers/web3.helper'
import request from 'request'
import config from '../config'

export class AuthController {
    createAccount (req, res) {
        request({
            url: config.lms_url,
            method: 'POST',
            json: req.body
        }, function(error, response, body) {
            console.log(error);
            if (error) {
                res.send({
                    status: "failure",
                    data : body
                });
            } else {
                res.send({
                    status: "success",
                    data: body
                });
            }
        });
    }
}