const fs = require('fs')
const path = require('path')


function copyFiles() {
  fs.mkdir(path.join(__dirname, 'files-copy'), err =>{
    if(err) throw err;
    console.log('Папка создана');
    fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, fileList) => {
      if(!err) {
        fileList.forEach((file) => {
          fs.copyFile(path.join(__dirname, 'files', `${file.name}`), path.join(__dirname, 'files-copy', `${file.name}`), err => {
            if (err) console.log(err);
          })
        })
      } else {
        console.log(err);
      }
    })
  })
}

fs.stat(path.join(__dirname, 'files-copy'), err => {
  if(!err) {
    fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
      if(err) throw err;
      console.log('папка удалена');
      copyFiles();
      
    })  
  } else {
    copyFiles();
  }  
})



