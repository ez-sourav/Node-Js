// const fs =require('fs');
import fs from'fs'

// Sync.....
// fs.writeFileSync('./test.txt','Hey hello this Node js ');
// Async....
// it use callback function 
// fs.writeFile('./test','Hey hello this Node js ',(err) =>{} );

// const result = fs.readFileSync('./contact.txt',"utf-8")
// console.log(result);

// fs.readFile('./contact.txt',"utf-8",(error,result)=>{
//     if(error){
//         console.log("Error :",error);
//     }else{
//         console.log(result);
//     }
// })

// fs.appendFileSync('./test.txt',`${new Date().toLocaleString()} Hay i am here \n`)

// Use For Copy File
// fs.cpSync('./test.txt','./copy.txt') 

// For Delete File
// fs.unlinkSync('./copy.txt')

// console.log(fs.statSync('./test.txt'));
fs.mkdirSync('my-doc/folder1') // make a new folder
