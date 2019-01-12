const fs = require('fs');

var skuArr = JSON.parse(fs.readFileSync('firstpageallmsg2.json').toString());
console.log(`skuArr${skuArr}`)
var newArr = skuArr.map((item,index)=>{
    var a = item.map((val,i)=>{
        let sku = val.sku,
        detailPageUrl = val.detailPageUrl,
        thumbnail = val.thumbnail,
        price = val.price,
        judgeNum = val.judgeNum,
        shopName = val.shopName,
        shopUrl = val.shopUrl;
        return [sku,detailPageUrl,thumbnail,price,judgeNum,shopName,shopUrl]
    });
    //console.log(a.length)
    return a;
})
//console.log(newArr.length)
console.log(newArr)



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
var sql = "INSERT INTO firstpageallmsg (sku, detailPageUrl,thumbnail,price,judgeNum,shopName,shopUrl) VALUES ?";
function indata(count){
    con.query(sql,[newArr[count]],(err,res)=>{
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



