require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');
var count = 1;
var page = 1;
var s =1;
let driver = new webdriver.Builder().forBrowser('chrome').build()
var root = 'https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&click=0'
async function start(page,s) {
    var url = root + "&page=" + page + "&s=" + s;
    await driver.get(url);
    await driver.executeScript('for(var i=0;i<document.body.scrollHeight;i++){window.scrollTo(0, i)}');
    await driver.sleep(2000);
    driver.getPageSource().then((val) => {
        const $ = cheerio.load(val);
        var result = data($)
        console.log(result)
        console.log(`li的长度：${result.length}`)
        if (result.length < 60 && page != 199) {
            start(page);
        } else {
            if (page == 1) {
                var str = '[' + JSON.stringify(result) + ',';
            } else {
                if (page < 199) {
                    var str = JSON.stringify(result) + ',';
                } else {
                    var str = JSON.stringify(result) + ']';
                }
            }
            fs.appendFile('./firstpageallmsg3.json', str, (err) => {
                if (err) throw err
                console.log('is saved')
                if (page < 200) {
                    page+=2;
                    s += 60;
                    count++;
                    start(page,s);
                    console.log(`开始第:${count}页`);
                } else {
                    driver.close()
                    driver.quit()

                }
                // driver.close();

            })
        }

    })

}


function data($) {
    var resultArr = []
    $('.gl-warp .gl-item').each(function (idx, element) {
        var $element = $(element);
        var arr = [];
        var obj = {};
        obj = {
            sku: $(element).attr('data-sku'),//sku
            detailPageUrl: $element.find('.p-img').children('a').attr('href'),//详情页链接
            thumbnail: $element.find('.p-img').children('a').children('img').attr('data-lazy-img'),//缩略图链接
            price: $element.find('.p-price').find('i').text(),//价格
            judgeNum: $element.find('.p-commit').find('a').text(),//评价数
            shopName: $element.find('.p-shop').find('a').text(),//商店名称
            shopUrl: $element.find('.p-shop').find('a').attr('href'),//商店链接
        }
        resultArr.push(obj);
    })
    console.log(`数量：resultArr.length`);
    return resultArr;
}


start(page,s)
console.log(`开始第一页`)
