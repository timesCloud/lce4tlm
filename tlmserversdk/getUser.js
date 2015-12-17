/**
 * Created by caonima on 2015/12/14.
 */

    /*oR0fbst67gJ7LLMCSlYBoxIRYzg0 -zhangrui的微信openid*/
var AV = require('leanengine');
var http = require('http');
var https =  require('https');
var url = require('url');


//微信关注用户注册
exports.reguser = function (req, res) {
    req.setEncoding('utf8');
    var openid=req.query.openid||"oQ4rts-XWUXVwDQwEG_NV9MY1B2E";
    var token=req.query.token||"jz0cD7AVCwFjeghaYyWIB99GAgjh7YwC";
    var mobile=req.query.mobile||"18681381406";
    console.log("openid:"+openid+" token:"+token);
    var getTokenUrl = apiurl+'reguser?openid='+openid+'&mobile='+mobile+'&token='+token;
    console.log(getTokenUrl);
    http.get(getTokenUrl, function (_res) {
        var str = '';
        _res.on('data', function (data) {
            str += data;
            console.log(str);
        });
        _res.on('end', function () {
            try {
                var resp = JSON.parse(str);
                res.send(resp);
            } catch (e) {
                var error = new Object();
                error.code = -1;
                error.message = '解析token返回的JSON数据错误' + str;
                //cb(error, null);
            }
        })
    })
}


//获取用户信息
exports.exec= function (req, res) {
    req.setEncoding('utf8');
    var openid=req.query.openid||"oQ4rts-XWUXVwDQwEG_NV9MY1B2E";
    var token=req.query.token||"jz0cD7AVCwFjeghaYyWIB99GAgjh7YwC";
    var getTokenUrl = apiurl+'getuser?openid='+openid+'&token='+token;
    console.log(getTokenUrl);
    http.get(getTokenUrl, function (_res) {
        var str = '';
        _res.on('data', function (data) {
            str += data;
            console.log(str);
        });
        _res.on('end', function () {
            try {
                var resp = JSON.parse(str);
                res.send(resp);
            } catch (e) {
                var error = new Object();
                error.code = -1;
                error.message = '解析token返回的JSON数据错误' + str;
                //cb(error, null);
            }
        })
    })
}

exports.wechatAccess_Token=function(req, res) {
    var access_token=req.query.access_token||"hP4rlDsppxiL_bBrYEVbH3IZqGFAEBCPVYE25FmQeUV6u9ACGczSl_XYlqs0vYCgFgrMaCb7loATfbyJhOVJ7xHLjYDrl_wN1K3CsIjeJO4BAFeAGATSX";
    var QueryWechatMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=' + access_token;
    console.log(QueryWechatMenuUrl);
    https.get(QueryWechatMenuUrl, function (_res) {
        var str = '', resp;
        _res.on('data', function (data) {
            str += data;
            console.log(str);
        });
        _res.on('end', function () {
            try {
                resp = JSON.parse(str);
            } catch (e) {
                var error = new Object();
                error.code = -1;
                error.message = '解析远程JSON数据错误' + str;
                res.error(error);
            }

            //res.success(resp);
        });
        _res.on('error', function (e) {
            var error = new Object();
            error.code = -1;
            error.message = 'POST请求错误';
            res.error(error);
        });
    });
}


