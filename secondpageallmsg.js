require('chromedriver'); //chrome浏览器驱动
let webdriver = require('selenium-webdriver'); //浏览器自动操作
let cheerio = require('cheerio'); //获取页面数据
let fs = require('fs');

let driver = new webdriver.Builder().forBrowser('chrome').build()
var page = 1;
var skuArr = JSON.parse(fs.readFileSync('sku1.json').toString());
var root = 'https://item.jd.com/'
var urlArr = skuArr.reduce((acc,cur)=>acc.concat(cur));
async function start(sku) {
    var url = root + sku +'.html';
    await driver.get(url);
    await driver.executeScript('for(var i=0;i<document.body.scrollHeight;i++){window.scrollTo(0, i)}');
    await driver.sleep(4000);
    driver.getPageSource().then((val) => {
        const $ = cheerio.load(val);
        var result = data($,sku)
        console.log(result)
        console.log(`条数:${page}`);
            if (page == 1) {
                var str = '[' + JSON.stringify(result) + ',';
            } else {
                if (page < 6000) {
                    var str = JSON.stringify(result) + ',';
                } else {
                    var str = JSON.stringify(result) + ']';
                }
            }
            fs.appendFile('./secondpageallmsg1.json', str, (err) => {
                if (page < 6000) {
                    page++;
                    start(urlArr[page-1]);
                } else {
                    driver.close()
                    driver.quit()

                }

            })

    })

}


function data($,sku) {
    var resultArr = []
    var sku = sku;
    var titleName = $('body > div:nth-child(11) > div > div.itemInfo-wrap > div.sku-name').text();
    var shangpinprice = $('body > div:nth-child(11) > div > div.itemInfo-wrap > div.summary.summary-first > div > div.summary-price.J-summary-price > div.dd > span.p-price > span.price').text();
    //评分
    var pingfen = $('#popbox > div > div.mc').text();
    //品牌介绍
    var pinpai = $('#parameter-brand > li > a').text();
    var shangpinmingcheng = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(1)').text();
    var shangpinbianhao = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(2)').text();
    var dianpu = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(3) > a').text();
    var shangpinmaozhong = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(4)').text();
    var shangpinchandi = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(5)').text();
    var huohao = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(6)').text();
    var jiekou = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(7)').text();
    var texing = $('#detail > div.tab-con > div:nth-child(1) > div.p-parameter > ul.parameter2.p-parameter-list > li:nth-child(8)').text();
    //规格包装
    var guigepinpai = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(1) > dl > dl:nth-child(1) > dd').text();
    var guigexinghao = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(1) > dl > dl:nth-child(2) > dd').text();
    var guigeyanse = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(1) > dl > dl:nth-child(3) > dd').text();
    var guigewaikecaizhi = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(1) > dl > dl:nth-child(4) > dd').text();
    var guigerongliang = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(2) > dl > dl:nth-child(1) > dd:nth-child(3)').text();
    var guigejiekouleixing = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(2) > dl > dl:nth-child(2) > dd').text();
    var guigeyaoshikong = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(2) > dl > dl:nth-child(3) > dd').text();
    var guigezhishideng = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(2) > dl > dl:nth-child(4) > dd').text();
    var guigechicun = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(2) > dl > dl:nth-child(5) > dd').text();
    var guigezhongliang = $('#detail > div.tab-con > div:nth-child(2) > div.Ptable > div:nth-child(2) > dl > dl:nth-child(6) > dd').text();
    var obj = {
        sku:sku,
        titleName:titleName.replace('\\n','\n'),
        shangpinprice:shangpinprice.replace('\\n','\n'),
        pingfen:pingfen.replace('\\n','\n'),
        pinpai:pinpai.replace('\\n','\n'),
        shangpinmingcheng:shangpinmingcheng.replace('\\n','\n'),
        shangpinbianhao:shangpinbianhao.replace('\\n','\n'),
        dianpu:dianpu.replace('\\n','\n'),
        shangpinmaozhong:shangpinmaozhong.replace('\\n','\n'),
        shangpinchandi:shangpinchandi.replace('\\n','\n'),
        huohao:huohao.replace('\\n','\n'),
        jiekou:jiekou.replace('\\n','\n'),
        texing:texing.replace('\\n','\n'),
        guigepinpai:guigepinpai.replace('\\n','\n'),
        guigexinghao:guigexinghao.replace('\\n','\n'),
        guigeyanse:guigeyanse.replace('\\n','\n'),
        guigewaikecaizhi:guigewaikecaizhi.replace('\\n','\n'),
        guigerongliang:guigerongliang.replace('\\n','\n'),
        guigejiekouleixing:guigejiekouleixing.replace('\\n','\n'),
        guigeyaoshikong:guigeyaoshikong.replace('\\n','\n'),
        guigezhishideng:guigezhishideng.replace('\\n','\n'),
        guigechicun:guigechicun.replace('\\n','\n'),
        guigezhongliang:guigezhongliang.replace('\\n','\n')
    }
    resultArr.push(obj);
    console.log(`数量：obj.keys().length`);
    console.log(obj);
    return resultArr;
}


start(urlArr[0])
