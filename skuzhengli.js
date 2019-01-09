const fs = require('fs');
const http = require('http');

let server = http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/plain"});
    var skuArr = JSON.parse(fs.readFileSync('sku.json').toString());
var urlArr = skuArr.reduce((acc,cur)=>acc.concat(cur));
    res.end(JSON.stringify(urlArr))
})

server.listen(8888);
console.log('server is running at http://127.0.0.1:8888/')



