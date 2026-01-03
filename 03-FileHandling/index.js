const fs = require('fs');
const http = require('http');

// fs.writeFile("hey.txt","Hi \n",(cb)=>{
//     if(cb) console.error(cb);
//     else console.log("Done");
// })

// fs.appendFile("hey.txt","Hello \n",(err)=>{
//     if(err) console.log(err);
//     else console.log("Done");
// })

// fs.rename("./new folder","folder",(err)=>{
//     if(err) throw err;
//     else console.log("Rename the FIle");
// })

// fs.copyFile("new.txt","./copy/copy.txt",(err)=>{
//     if(err) throw err;
//     else console.log(("Copy File"));

// })

// fs.unlink('./folder', { recursive: true, force: true },(err)=>{
//     if(err) throw err;
//     console.log("File Deleted");
// })

// fs.rm('./copy',{recursive:true} ,(err)=>{
//     if(err) throw err;
//     console.log("Delete");
// })

// fs.mkdir("./new folder/text.txt",(err)=>{
//     if(err) throw err;
//     console.log(("Created Folder"));
// })

// fs.readFile('new.txt','utf8',(err,data)=>{
//     if(err) throw err ;
//     console.log(data);
// })

// fs.readdir('./folder',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

// HTTP 

const server = http.createServer((req,res)=>{
    res.end("Hello World");
})
server.listen(3000)