const fs = require('fs');

fs.writeFile("hey.txt","",(cb)=>{
    if(cb) console.error(cb);
    else console.log("Done");
})