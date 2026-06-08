const { PDFParse } = require('pdf-parse');
const fs = require('fs');
const data = fs.readFileSync('ros_block1_uppgifter.pdf');
const parser = new PDFParse();
parser.parse(data).then(function(result) {
    console.log(result.text);
}).catch(err => console.error(err));
