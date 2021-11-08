const fs = require('fs');
const path = require('path')


const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

console.log('Hello, what you name?');

process.stdin.on('data', data => {
  const str = data.toString('utf8', 0, data.length - 2);
  if (str === 'exit') {
    console.log('bye bye');
    process.exit();
  } else {
    output.write(data);
  }
  })
process.on('SIGINT', () => {
  console.log('bye bye');
  process.exit();
})