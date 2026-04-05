const express = require('express');

const app = express();


app.use('/',(req, resp)=>{
  resp.send("Hello From Root");  
})
app.use('/test',(req, resp)=>{
  resp.send("Hello From Test");  
})
app.use((req, resp)=>{
  resp.send("Hello From Server");  
})
app.listen(3000, ()=>{
    console.log("Server is Successfully listening on 3000:...")
});