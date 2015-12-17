/**
 * Created by caonima on 2015/12/14.
 */
var AV = require('leanengine');
var http = require('http');
var url = require('url');

exports.exec= function (req, res) {
    req.setEncoding('utf8');
    var latitude=req.query.latitude||30.63011;
    var longitude=req.query.longitude||104.0514;
    var radius=req.query.radius||400;
    var token=req.query.token||"bHDFDibvg55xEdBzaGacJbEE458uw8DY";
    var geoqueryUrl=apiurl+"query?latitude="+latitude+"&longitude="+longitude+"&radius="+radius+"&token="+token+""
    console.log("latitude:"+latitude+" longitude:"+longitude+" radius:"+radius+" token:"+token);
    http.get(geoqueryUrl, function (_res) {
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
                error.message = '解析geoquery返回的JSON数据错误' + str;
                //cb(error, null);
            }
        })
    })
}