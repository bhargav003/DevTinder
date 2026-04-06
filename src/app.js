const express = require('express');

const app = express();


//Dynamic Route
app.get('/user/:userId/:name/:password', (req,resp)=>{
    console.log(req.params);
    resp.send({firstName:"Bhargav", lastName:"Allu"})
})

app.get('/user', (req,resp)=>{
    resp.send({firstName:"Bhargav", lastName:"Allu"})
})

app.post('/user', (req,resp)=>{ 
    resp.send("Data Has been Posted");
})

//.use will match all the http request methods.
app.use('/test',(req, resp)=>{
  resp.send("Hello From Test");  
})

app.listen(3000, ()=>{
    console.log("Server is Successfully listening on 3000:...")
});