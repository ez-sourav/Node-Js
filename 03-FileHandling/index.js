const fs = require('fs');

// fs.writeFile("hey.txt","Hi \n",(cb)=>{
//     if(cb) console.error(cb);
//     else console.log("Done");
// })

// fs.appendFile("hey.txt","Hello \n",(err)=>{
//     if(err) console.log(err);
//     else console.log("Done");
// })

// fs.rename("hey.txt","new.txt",(err)=>{
//     if(err) throw err;
//     else console.log("Rename the FIle");
// })

fs.copyFile("new.txt","./copy/copy.txt",(err)=>{
    if(err) throw err;
    else console.log(("Copy File"));

})

