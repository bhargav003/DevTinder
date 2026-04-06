// //Dynamic Route
// app.get('/user/:userId/:name/:password', (req,resp)=>{
//     console.log(req.params);
//     resp.send({firstName:"Bhargav", lastName:"Allu"})
// })

// app.get('/user', (req,resp)=>{
//     resp.send({firstName:"Bhargav", lastName:"Allu"})
// })

// app.post('/user', (req,resp)=>{ 
//     resp.send("Data Has been Posted");
// })

// //.use will match all the http request methods.


// a route can have multiple route handlers like below syntax
//Route Handlers are called as Middlewares
// app.use('/test',(req, resp, next)=>{
//     console.log("Resp handler 1")
//     // resp.send("Hello From Test"); 
//     next();
// },
// (req,resp)=>{
//     console.log("Resp Handler2")
//     resp.send("sending from handler 2");
// }

// )
// a route can have multiple route handlers like below syntax
//app.use('route', ()=>{} //this is called route handler, ()=>{})

// app.use('/admin', adminAuth);
// app.get('/admin', (req,resp)=>{
//     resp.send("Sending Admin after Authorization");
// })
// app.use('/user', userAuth, (req,resp)=>{
//     resp.send("Send User Data after Authorization")
// })