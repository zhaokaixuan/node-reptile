var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');
var arr = JSON.parse(fs.readFileSync('product.json'));
var newArr = arr.map((item)=>{
    return item.ProductId;
})
console.log(newArr)
var resultArr = []
var api = `https://sclub.jd.com/comment/productPageComments.action?score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1&productId=`
newArr.map((item)=>{
    var url = api + item
    request({
        url: url,   // 请求的URL
        method: 'GET',
        encoding:null
    }, function (error, res,body) {
        if (!error && res.statusCode == 200) {
            var strings = iconv.decode(body, 'gb2312').toString();
            console.log(typeof strings)
             var obj = JSON.parse(strings);
             console.log(obj);
            // resultArr.push(obj);
            // console.log(`数组长度：${resultArr.length}`)
            // if(resultArr.length == 6000){
            //     fs.writeFile('./newpingjia.json',JSON.stringify(resultArr),function(err){
            //         if (err) throw err;
            //         console.log('写入成功')
            //     })
            // }
        }
    });
})

