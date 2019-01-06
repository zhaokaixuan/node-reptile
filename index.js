var cheerio = require('cheerio');
var https = require('https');
var iconv = require('iconv-lite');
var request = require('request');
var fs = require('fs')

var url = 'https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&page=3&s=61&click=0';

// https.get(url, function(sres) {
//     var chunks = [];
//     sres.on('data', function(chunk) {
//       chunks.push(chunk);
//     });
//     // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
//     // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
//     // 剩下就都是 jQuery 的内容了
//     sres.on('end', function() {
//         console.log(chunks)
//       var titles = [];
//       //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
//       //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
//       var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
//       var $ = cheerio.load(html, {decodeEntities: false});  
//     });
//   });

request({
    url: url,   // 请求的URL
    method: 'GET'
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body) // 输出网页内容
        // var html = iconv.decode(body, 'utf-8');
        var $ = cheerio.load(body);
        
        console.log(body)
        var titles = [];
        $('.gl-warp li').each(function (idx, element) {
            titles.push($element.attr('data-sku'))
        })
        console.log(titles)

    }
});
