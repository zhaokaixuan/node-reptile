require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');
var arrRes = []
var page = 1;
var s = 1;
let driver = new webdriver.Builder().forBrowser('chrome').build()
var root = 'https://search.jd.com/Search?keyword=u%E7%9B%98&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&suggest=1.def.0.V13&wq=upan&psort=3&click=0'
async function start(page,s) {
        var url = root + "&page=" + page+ "&s="+ s;
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
            if($('.gl-warp li').length<60&&page!=199){
                start(page,s);
            }else{
                if(page<=199){
                    arrRes.push(titles);
                    page+=2;
                    s+=60;
                    start(page,s);
                    console.log(`开始第${page}页`)
                }else{
                    fs.writeFile('./sku2.json', JSON.stringify(arrRes), (err) => {
                        if (err) throw err
                        console.log('is saved')
                            driver.close()
                            driver.quit()

                        // driver.close();
        
                    })
                }
                
            }
            
        })

}
start(page,s)
console.log(`开始第1条`)
