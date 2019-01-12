const fs = require('fs');

var skuArr = JSON.parse(fs.readFileSync('pingjia2.json').toString());

var newArr = skuArr.map((item,index)=>{
    var a = item.CommentsCount.map((val,i)=>{
        let sku = val.SkuId,
        ProductId = val.ProductId,
        ShowCount = val.ShowCount,
        ShowCountStr = val.ShowCountStr,
        CommentCount = val.CommentCount,
        CommentCountStr = val.CommentCountStr,
        AverageScore = val.AverageScore,
        DefaultGoodCountStr = val.DefaultGoodCountStr,
        DefaultGoodCount = val.DefaultGoodCount,
        GoodCountStr = val.GoodCountStr,
        GoodCount = val.GoodCount,
        AfterCount = val.AfterCount,
        AfterCountStr = val.AfterCountStr,
        OneYear = val.OneYear,
        VideoCount = val.VideoCount,
        VideoCountStr = val.VideoCountStr,
        GoodRate = val.GoodRate,
        GoodRateShow = val.GoodRateShow,
        GoodRateStyle = val.GoodRateStyle,
        GeneralCountStr = val.GeneralCountStr,
        GeneralCount = val.GeneralCount,
        GeneralRate = val.GeneralRate,
        GeneralRateShow = val.GeneralRateShow,
        GeneralRateStyle = val.GeneralRateStyle,
        PoorCountStr = val.PoorCountStr,
        PoorCount = val.PoorCount,
        SensitiveBook = val.SensitiveBook,
        PoorRate = val.PoorRate,
        PoorRateShow = val.PoorRateShow,
        PoorRateStyle = val.PoorRateStyle;
        
        return [
            sku,
            ProductId,
            CommentCountStr,//全部评价
            GoodCountStr,//好评
            AfterCountStr,//追评
            VideoCountStr,//视频晒单
            GoodRate,//好评度
            GeneralCountStr,//中评
            PoorCountStr//差评
        ]
    });
    //console.log(a.length)
    return a;
})
//console.log(newArr.length)
console.log(newArr)
console.log(newArr.length)



var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "168168",
  database: "test"
});
var count = 0;

con.connect();
var sql = "INSERT INTO pingjia (sku,ProductId,CommentCountStr,GoodCountStr,AfterCountStr,VideoCountStr,GoodRate,GeneralCountStr,PoorCountStr) VALUES ?";
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





