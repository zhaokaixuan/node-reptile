var cheerio = require('cheerio');
var https = require('https');
var iconv = require('iconv-lite');

var url = 'https://search.jd.com/search?keyword=%E9%9E%8B%E5%AD%90%E5%A5%B3%E5%86%AC%E5%AD%A3%E9%95%BF%E9%9D%B4%E5%AD%A6%E7%94%9F&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V03&wq=%E9%9E%8B%E5%AD%90%E5%A5%B3%E9%95%BF%E9%9D%B4&ev=exbrand_%E5%AF%8C%E8%B4%B5%E9%B8%9F%EF%BC%88FUGUINIAO%EF%BC%89%5E&psort=3&click=0';
// https.get(url, function(sres) {
//     var chunks = [];
//     sres.on('data', function(chunk) {
//       chunks.push(chunk);
//     });
//     // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
//     // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
//     // 剩下就都是 jQuery 的内容了
//     console.log(chunks)
//     sres.on('end', function() {
//       var titles = [];
//       //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
//       //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
//       var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
//       var $ = cheerio.load(html, {decodeEntities: false});
//       $('.gl-warp .gl-item .gl-i-wrap').each(function (idx, element) {
//         var $element = $(element);
//         var arr = [];
//         $element.find('.p-icons').children('i').each(()=>{
//             arr.push({
//                 text:$(this).text(),
//                 title:$(this).attr('data-tips')
//             })
//         })
//         titles.push({
//           detailPageUrl: $element.find('.p-img').children('a').attr('href'),//详情页链接
//           thumbnail: $element.find('.p-img').find('img').attr('src'),//缩略图链接
//           price:$element.find('.p-price').find('i').text(),//价格
//           judgeNum:$element.find('.p-commit').find('a').text(),//评价数
//           shopName:$element.find('.p-shop').find('a').text(),//商店名称
//           shopUrl:$element.find('.p-shop').find('a').attr('href'),//商店链接
//           icons:arr//优惠icons
//         })
//       })    
//       console.log(titles);     
//     });
//   });
