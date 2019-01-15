var request = require('request');
var fs = require('fs');
var iconv = require('iconv-lite');
var arr = JSON.parse(fs.readFileSync('product.json'));
var newArr = arr.map((item)=>{
    return item.ProductId;
})
var resultArr = []
var sub = 70;
var api = `https://sclub.jd.com/comment/productPageComments.action?score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1&productId=`
function init(sub){
    var url = api +newArr[sub];
    request({
        url:url,
        method:"GET",
        encoding:null
    },function(error,res,body){
        if(!error && res.statusCode == 200){
            console.log(`第${sub}个`);
            var stings = iconv.decode(body,'gb2312').toString();
            console.log('-------start-----------------')
            console.log(stings);
            var obj = JSON.parse(stings);
            console.log(`----------- center--------- ------- `)
            console.log(obj);
            console.log(`--------------end----------`)
            if(sub<5999){
                sub+=1;
                fs.appendFile('./newpingjia.json',JSON.stringify(obj)+',',function(err){
                    if (err) throw err;
                   console.log('写入成功')
                   init(sub);
                })
            }else{

                      
            }
            
        }
    })
}
init(sub);
// newArr.map((item,index)=>{
//     var url = api + item
//     request({
//         url: url,   // 请求的URL
//         method: 'GET',
//         encoding:null
//     }, function (error, res,body) {
//         if (!error && res.statusCode == 200) {
//             console.log(`第${index}个`)
//             var strings = iconv.decode(body, 'gb2312').toString();
//             console.log(typeof strings)
//              var obj = JSON.parse(strings);
//              console.log(obj);
//             // resultArr.push(obj);
//             // console.log(`数组长度：${resultArr.length}`)
//             // if(resultArr.length == 6000){
//             //     fs.writeFile('./newpingjia.json',JSON.stringify(resultArr),function(err){
//             //         if (err) throw err;
//             //         console.log('写入成功')
//             //     })
//             // }
//         }
//     });
// })

