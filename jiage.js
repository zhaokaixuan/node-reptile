var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');
var arr = JSON.parse(fs.readFileSync('sku1.json'));
var newArr = arr.map((item)=>{
    var a = item.map((val)=>{
        return 'J_'+val;
    });
    return a.join('%2C');
})
var resultArr = []
var api = `https://p.3.cn/prices/mgets?skuIds=`
newArr.map((item)=>{
    var url = api + item
    request({
        url: url,   // 请求的URL
        method: 'GET',
        encoding:null
    }, function (error, res,body) {
        if (!error && res.statusCode == 200) {
            var strings = iconv.decode(body, 'gb2312').toString();
            var obj = JSON.parse(strings);
            console.log(obj);
            resultArr.push(obj);
            console.log(`数组长度：${resultArr.length}`)
            if(resultArr.length == 100){
                fs.writeFile('./jiage1.json',JSON.stringify(resultArr),function(err){
                    if (err) throw err;
                    console.log('写入成功')
                })
            }
        }
    });
})

