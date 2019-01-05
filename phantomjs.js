var phantom = require('phantom');
var cheerio = require('cheerio');
var fs  =require('fs')
//var page = require('webpage').create();
var firstPage = [];
var step = 0;
var url = 'https://search.jd.com/search?keyword=%E9%9E%8B%E5%AD%90%E5%A5%B3%E5%86%AC%E5%AD%A3%E9%95%BF%E9%9D%B4%E5%AD%A6%E7%94%9F&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V03&wq=%E9%9E%8B%E5%AD%90%E5%A5%B3%E9%95%BF%E9%9D%B4&ev=exbrand_%E5%AF%8C%E8%B4%B5%E9%B8%9F%EF%BC%88FUGUINIAO%EF%BC%89%5E&psort=3&click=0'
function news(url,callback) {
  var sitepage, phInstance;
  phantom.create()
    .then(function (instance) {
      phInstance = instance;
      return instance.createPage();
    }).then(function (page) {
      sitepage = page;
      return page.open(url);
    }).then(function (status) {
      return sitepage.property('content');
    }).then(function (content) {
      var $ = cheerio.load(content);
      callback($)
    }).then(function() {
      
        sitepage.close();
        phInstance.exit();
      var len = firstPage.length;
      if(step<1){
          step++;
          var newUrl = 'https:'+firstPage[step-1].detailPageUrl;
          console.log(newUrl)
        news(newUrl,secondData);
      }
    }).catch(function (err) {
      phInstance.exit();
    })
}
function data($){
    $('.gl-warp .gl-item .gl-i-wrap').each(function (idx, element) {
                var $element = $(element);
                var arr = [];
                $element.find('.p-icons').children('i').each(()=>{
                    arr.push({
                        text:$(this).text(),
                        title:$(this).attr('data-tips')
                    })
                })
                firstPage.push({
                  detailPageUrl: $element.find('.p-img').children('a').attr('href'),//详情页链接
                  thumbnail: $element.find('.p-img').children('a').children('img').attr('data-lazy-img'),//缩略图链接
                  price:$element.find('.p-price').find('i').text(),//价格
                  judgeNum:$element.find('.p-commit').find('a').text(),//评价数
                  shopName:$element.find('.p-shop').find('a').text(),//商店名称
                  shopUrl:$element.find('.p-shop').find('a').attr('href'),//商店链接
                  icons:arr//优惠icons
                })
              })    
              console.log(firstPage); 
              fs.writeFileSync('./index.json',JSON.stringify(firstPage))
}
function secondData($){
    console.log('---------------')
    var arr = [];
    arr.push({
        skuName:$('.itemInfo-wrap').find('.sku-name').text(),
        price:$('.itemInfo-wrap').find('.p-price').children('.price').text(),
        judgeNum:$('.itemInfo-wrap').find('.count ').text(),
        yunfei: $('itemInfo-wrap').find('.J-dcashDesc').text()
    })
    console.log(arr)
}
news(url,data)