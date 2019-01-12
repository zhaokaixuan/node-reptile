const fs = require('fs');
var skuArr = JSON.parse(fs.readFileSync('secondpageallmsg2.json').toString());
var newArr = skuArr.map((item,index)=>{
        let val = item[0];
        let sku = val.sku,
        titleName = val.titleName.replace(/[\r\n\s]/g,""),
        shangpinprice = val.shangpinprice.replace(/[\r\n\s]/g,""),
        pingfen = val.pingfen.replace(/[\r\n\s]/g,""),
        pinpai = val.pinpai.replace(/[\r\n\s]/g,""),
        shangpinmingcheng = val.shangpinmingcheng.replace(/[\r\n\s]/g,""),
        shangpinbianhao = val.shangpinbianhao.replace(/[\r\n\s]/g,""),
        dianpu = val.dianpu.replace(/[\r\n\s]/g,""),
        shangpinmaozhong = val.shangpinmaozhong.replace(/[\r\n\s]/g,""),
        shangpinchandi = val.shangpinchandi.replace(/[\r\n\s]/g,""),
        texing = val.huohao.replace(/[\r\n\s]/g,""),
        rongliang = val.jiekou.replace(/[\r\n\s]/g,""),
        jiekou = val.texing.replace(/[\r\n\s]/g,"");
var shangpinjieshao = JSON.stringify([shangpinmingcheng,shangpinbianhao,dianpu,shangpinmaozhong,shangpinchandi,rongliang,jiekou,texing])
console.log(pingfen)
        return [
            sku,
            titleName,//标题
            shangpinprice,//商品价格
            pingfen,//评分（部分没有）
            pinpai,//品牌
            shangpinjieshao//商品介绍
        ]
})
//console.log(newArr.length)
function group (array,subGroupLength){
    let index = 0;
    let newArray = [];
    while(index < array.length){
        newArray.push(array.slice(index,index+=subGroupLength));
    }
    return newArray;
}
let lastArray = group(newArr,60);
console.log(lastArray.length)



/* 
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "168168",
  database: "test"
});
var count = 0;

con.connect();
var sql = "INSERT INTO secondpageallmsg (sku,titleName,shangpinprice,pingfen,pinpai,shangpinjieshao) VALUES ?";
function indata(count){
    con.query(sql,[lastArray[count]],(err,res)=>{
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
           }        
          console.log('--------------------------INSERT----------------------------');
          //console.log('INSERT ID:',result.insertId);        
          console.log('INSERT ID:',res);        
          console.log('-----------------------------------------------------------------\n\n');  
          if(count<99){
              count++;
              indata(count);
          }else{
              con.end();
          }
    })
}
indata(count);

 */



