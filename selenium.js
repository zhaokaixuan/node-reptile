require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');

let driver = new webdriver.Builder().forBrowser('chrome').build()
var root = 'https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&s=61&click=0'
async function start(page) {
        var url = root + "&page=" + page;
        await driver.get(url);
        await driver.executeScript('for(var i=0;i<document.body.scrollHeight;i++){window.scrollTo(0, i)}');
        await driver.sleep(2000);
        driver.getPageSource().then((val) => {
            const $ = cheerio.load(val);
            var titles = [];
            $('.gl-warp li').each(function (idx, element) {
                titles.push($(element).attr('data-sku'))
            })
            console.log(titles)
            console.log(`li的长度：${$('.gl-warp li').length}`)
            console.log(`页数:${page}`);
            if($('.gl-warp li').length<60&&page!=100){
                start(page);
            }else{
                if(page ==1){
                    var str = '[' + JSON.stringify(titles) +',';
                }else{
                    if(page<100){
                        var str = JSON.stringify(titles) +',';
                    }else{
                        var str = JSON.stringify(titles) +']';
                    }
                }
                fs.appendFile('./sku.json', str, (err) => {
                    if (err) throw err
                    console.log('is saved')
                    if(page<100){
                        page++;
                        start(page);
                    }else{
                        driver.close()
                        driver.quit()
    
                    }
                    // driver.close();
    
                })
            }
            
        })

}
start(1)
