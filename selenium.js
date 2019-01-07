require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');

let driver = new webdriver.Builder().forBrowser('chrome').build()
var url = 'https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&page=3&s=61&click=0'
async function start() {
    await driver.get(url);
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(2000);
    driver.getPageSource().then((val) => {
        const $ = cheerio.load(val);
        var titles = [];
        $('.gl-warp li').each(function (idx, element) {
            titles.push($(element).attr('data-sku'))
        })
        console.log(titles)
        console.log(`li的长度：${$('.gl-warp li').length}`)
        fs.writeFile('./sku.json', JSON.stringify(titles), (err) => {
            if (err) throw err
            console.log('is saved')
           // driver.close();

        })//将数据写进mes.txt文件中
    })
}
start()
