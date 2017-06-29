// import { web3, lms } from '../helpers/web3.helper'
import request from 'request'
import config from '../config'
import User from '../models/user.model';

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
    findOrCreateUser (profile, done) {
        User.findOne({ oauthID: profile.id }, function(err, user) {
            if(err) {
                console.log(err);  // handle errors!
            }
            if (!err && user !== null) {
                done(null, user);
            } else {
                user = new User({
                    oauthID: profile.id,
                    name: profile.displayName,
                    email: profile.email,
                    created: Date.now()
                });
                user.save(function(err) {
                    if(err) {
                        console.log(err);  // handle errors!
                    } else {
                        console.log("saving user ...");
                        done(null, user);
                    }
                });
            }
        });
    }
}