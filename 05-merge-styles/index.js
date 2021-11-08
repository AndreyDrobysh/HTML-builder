const fs = require('fs');
const path = require('path')



function creatFileCss(cb) {
  fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', err =>{
    if(err) throw err;
    console.log('file created');
    cb();
  });
}

fs.stat(path.join(__dirname, 'project-dist', 'bundle.css'), err => {
  if(!err) {
    fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'), (err) => {
      if(err) throw err;
      console.log('File deleted');
      creatFileCss(() => getCssFile());
    })  
  } else {
    creatFileCss(() => getCssFile());
  }  
})

function getCssFile () {
  fs.readdir(path.join(__dirname, 'styles'), (err, fileList) => {
    if(!err) { 
      let output = fs.createWriteStream((path.join(__dirname, 'project-dist', 'bundle.css')))
      fileList.forEach((file) => {
        if (getExtension(file) === 'css') {
          let input = fs.createReadStream((path.join(__dirname, 'styles', `${file}`)));
          input.pipe(output);
        }
       
      });
    } else {
      console.log('neydacha');
    }
  })
}

function getExtension(fileName) {
  return fileName.split('.').pop();
}


