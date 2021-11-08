const fs = require('fs')
const path = require('path')



fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, fileList) => {
  if(!err) {
    fileList.forEach((file) => {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
        if (!file.isDirectory()) {          
          console.log(`${getName(file.name)} - ${getExtension(file.name)} - ${(stats.size / 1024).toFixed(3)}kb`);
        }
      })
    });
  } else {
    console.log(err);
  }
});  

function getName(fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}

function getExtension(fileName) {
  return fileName.split('.')[1];
}
  