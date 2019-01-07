require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');
let async = require('async');
let driver = new webdriver.Builder().forBrowser('chrome').build()
var rootUrl = 'https://item.jd.com/';
var skuArr = JSON.parse(fs.readFileSync('sku.json').toString());
var urlArr = skuArr.map((item)=>{
    return {url:rootUrl + item + '.html',sku:item};
})

var count = 0;
var arr = [];
async function start(url,sku) {
    await driver.get(url);
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(2000);
    driver.getPageSource().then((val) => {
        const $ = cheerio.load(val);
        var isJd = $('.contact').find('.u-jd').text();
        var shopName = $('.J-hove-wrap item').eq(0).find('a').text();
        var price = $('.summary-price').find('.p-price').text();
        var obj = {
            sku:sku,
            isJd: isJd,
            shopName: shopName,
            price: price
        }
        console.log(obj)
        arr.push(obj);
        console.log(`第${count}个页面；数据数：${arr.length};url:${url}`)
        count++;
        if(count<urlArr.length){
            start(urlArr[count].url,urlArr[count].sku);
        }else{
            console.log(arr);
            driver.close()
        }

        // fs.writeFile('./sku.json', JSON.stringify(titles), (err) => {
        //     if (err) throw err
        //     console.log('is saved')
            
        // })
    })
}

