'use strict'
var jwt = require('jwt-simple');
var moment=require('moment');
var secret='proyecto_dps';
exports.createToken=function(user){
    var payload={
        sub:user._id,
        name: user.subname,
        subname:user.subname,
        email: user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp: moment().add(30, 'days').unix
    };
    return jwt.encode(payload, secret);
};