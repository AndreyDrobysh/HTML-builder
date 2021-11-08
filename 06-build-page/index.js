const fs = require('fs');
const path = require('path')


// creat HTML and create dir

function getIndexHtml() {
  let output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'))
  let input = fs.createReadStream(path.join(__dirname, 'template.html'));
  input.pipe(output);
  console.log('index.html creat or overwritten');
}

function copyFilesHtml() {
  fs.mkdir(path.join(__dirname, 'project-dist'), err =>{
    if(err) throw err;
    console.log('Папка project-dist создана');
    getIndexHtml()
    
  })
}

fs.stat(path.join(__dirname, 'project-dist'), err => {
  if(!err) {
    getIndexHtml()
  } 
  else {
    copyFilesHtml();
  }  
})


// Change HTML
function getName(fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}
let stream = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');

fs.readdir(path.join(__dirname, 'components'), (err, fileList) => {
  if (!err) {
    fs.readFile(
      path.join(__dirname, 'components', `header.html`),
      'utf-8',
      (err, header) => {
        if (err) throw err;
        fs.readFile(
          path.join(__dirname, 'components', `articles.html`),
          'utf-8',
          (err, articles) => {
            fs.readFile(
              path.join(__dirname, 'components', `footer.html`),
              'utf-8',
              (err, footer) => {
                let writestream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8');
                stream.on('data', function(chunk) {
                  writestream.write(
                    chunk
                    .replace(`{{header}}`, header)
                    .replace(`{{articles}}`, articles)
                    .replace(`{{footer}}`, footer)
                  );
                });
              }
            ) 
          })         
      }
    ); 
  } else {
    console.log(err);
  }
})


//  creat and get CSS

function creatFileCss(cb) {
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', err =>{
    if(err) throw err;
    console.log('file style.css created');
    cb();
  });
}

fs.stat(path.join(__dirname, 'project-dist', 'style.css'), err => {                                                                                                                                                                                                                                      
  if(!err) {
    fs.unlink(path.join(__dirname, 'project-dist', 'style.css'), (err) => {
      if(err) throw err;
      console.log('File style.css deleted');
      creatFileCss(() => getCssFile());
    })  
  } else {
    creatFileCss(() => getCssFile());
  }  
})

function getCssFile () {
  fs.readdir(path.join(__dirname, 'styles'), (err, fileList) => {
    if(!err) { 
      let output = fs.createWriteStream((path.join(__dirname, 'project-dist', 'style.css')))
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

// creat assets

// function copyFiles() {
//   fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), err =>{
//     if(err) throw err;
//     console.log('Папка создана');
//     fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, fileList) => {
//       if(!err) {
//         fileList.forEach((file) => {
//           console.log(file);
//           fs.copyFile(path.join(__dirname, 'assets', `${file.name}`), path.join(__dirname, 'assets', `${file.name}`), err => {
//             if (err) console.log(err);
//           })
//         })
//       } else {
//         console.log(err);
//       }
//     })
//   })
// }

// fs.stat(path.join(__dirname, 'project-dist'), err => {
//   if(!err) {
//     fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
//       if(err) throw err;
//       console.log('папка удалена');
//       copyFiles();
      
//     })  
//   } else {
//     copyFiles();
//   }  
// })










