const fs = require('fs');

var skuArr = JSON.parse(fs.readFileSync('sku2.json').toString());

var newArr = skuArr.map((item,index)=>{
    var a = item.map((val,i)=>{
        return [val,index*60+i]
    });
    return a;
})
console.log(newArr)




var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "168168",
  database: "test"
});
var count = 0;

con.connect();
var sql = "INSERT INTO sku (sku, sallSort) VALUES ?";
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





