var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');
var arr = JSON.parse(fs.readFileSync('sku2.json'));
var newArr = arr.map((item)=>{
    return item.join(',');
})
var resultArr = []
var api = `https://club.jd.com/comment/productCommentSummaries.action?referenceIds=`
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
                fs.writeFile('./pingjia2.json',JSON.stringify(resultArr),function(err){
                    if (err) throw err;
                    console.log('写入成功')
                })
            }
        }
    });
})

