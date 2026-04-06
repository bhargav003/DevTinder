const adminAuth = (req,resp,next)=>{
    console.log("Admin is getting autho...");
    const token = "xyz";
    const isAuthorized = token ==='xyz';

    if(!isAuthorized){
        resp.status(401).send("UnAuthorized Admin")
    }else{
        next();
    }
}

const userAuth = (req,resp,next)=>{
    console.log("User is getting Authorized")
    const token = "abc";
    const isAuthorized = token ==='abc';
    if(!isAuthorized){
        resp.status(401).send("UnAuthorized User");
    }else {
        next();
    }
}

module.exports = {
    adminAuth,userAuth
}