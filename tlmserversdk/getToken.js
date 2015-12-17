/**
 * Created by caonima on 2015/12/11.
 */
var AV = require('leanengine');
var http = require('http');
var https = require('https');
var url = require('url');

exports.exec = function (req, res) {
    req.setEncoding('utf8');
    var appid=req.query.appid;

    if(!req.query.appid){
        appid="cpp.08be7a9943a39506399839d4027c";
    }
    var getTokenUrl = apiurl+'token?appid='+appid;
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


exports.access_token = function (req, res) {
    req.setEncoding('utf8');
    var token=req.query.token;
    if(!token){
        token='HI2JDBjyhICxEYiWYc5b1YExDAgVBg2z';
    }
    var getTokenUrl = apiurl+'access_token?token='+token;
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
                error.message = '解析access_token返回的JSON数据错误' + str;
                //cb(error, null);
            }
        })
    })
}
/*//获取令牌
exports.exec= function (req, res) {
    req.setEncoding('utf8');
    var appid=req.query.appid;

    if(!req.query.appid){
        appid="cpp.08be7a9943a39506399839d4027c";
    }
    console.log(appid);
    AV.Cloud.httpRequest({
        url: 'http://tinglema.cn:8000/api/AppService.asmx/token?appid='+appid+'',
        text:false,
        success: function(httpResponse) {
            console.log(httpResponse);
            res.end(httpResponse.text);
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
}*/

//获取微信access_token
/*
exports.access_token= function (req, res) {
    req.setEncoding('utf8');
    var token=req.query.token;
    if(!token){
        token='vCGV5-GQ1hhrpADKE4ij8xcyePlz595U6FFJMsnT-VNoW4P5moMvoYGIyIuBLkh0VqVYf9yLmDmpWrT_UAMMysBZ5UbCOStsfxfx9MVii7cIBDjAEALEG';
    }
    console.log('req:'+token);
    AV.Cloud.httpRequest({
        url:'http://apiurl/access_token?token='+token+'',
        text:false,
        success: function (_res) {
            console.log(_res);
            res.end(_res.data);
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    })
}*/
