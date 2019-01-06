var phantom = require('phantom');
var cheerio = require('cheerio');
var fs  =require('fs')
//var page = require('webpage').create();
var firstPage = [];
var step = 0;
var url = 'https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&page=3&s=61&click=0'
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
      console.log(`页面打开成功`)
      return sitepage.property('content');
    }).then(function (content) {
        //content.documentElement.scrollTo(content.body.scrollLeft,content.body.scrollHeight)
        var $ = cheerio.load(content);
        //$('html').scrollTop($('body')[0].scrollHeight)
      console.log( `页面载入成功`)
      callback($)
      
    }).then(function() {
      
        sitepage.close();
        phInstance.exit();
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
              console.log(firstPage.length); 
              fs.writeFileSync('./index.json',JSON.stringify(firstPage))
}
function sku($){
  var titles = []
  console.log(`li的长度：${$('.gl-warp li').length}`)
  $('.gl-warp li').each(function (idx, element) {
    titles.push($(element).attr('data-sku'))
})
console.log(titles);
console.log(titles.length)
}
news(url,sku)
