require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');
let driver = new webdriver.Builder().forBrowser('chrome').build()
var url = 'https://item.jd.com/'
var sku = '6268372';
async function start(sku) {
    await driver.get(url+sku+'.html');
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(2000);
    driver.getPageSource().then((val) => {
        const $ = cheerio.load(val);
        console.log($('.contact').find('.u-jd').text())
        var isJd = $('.contact').find('.u-jd').text();
        var shopName = $('.J-hove-wrap item').eq(0).find('a').text();
        var price = $('.summary-price').find('.p-price').text();
        var obj = {
            isJd: isJd,
            shopName: shopName,
            price: price
        }
        console.log(obj)
        driver.close()
        // fs.writeFile('./sku.json', JSON.stringify(titles), (err) => {
        //     if (err) throw err
        //     console.log('is saved')
            
        // })
    })
}
start(sku)
