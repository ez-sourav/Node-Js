const cluster = require("cluster");
const express = require("express");
const os = require('os');

const totalCPUs = os.cpus().length;
// console.log(totalCPUs);
if(cluster.isPrimary){
    for(let i=0; i<totalCPUs; i++){
        cluster.fork();
    }
}else{
    const app = express();
    const PORT = 3000;
    
    app.get('/',(req,res)=>{
        return res.json({
            message:"Hello From Express Server "+ process.pid,
        })
    })
    app.listen(PORT,()=>{
        console.log("Server Started At Port ", PORT);
    })

}