const fs = require('fs');
const pdf = require('pdf-parse');

async function appendPdfToTextFile(pdfPath, txtPath) {
  try {
    // Read the PDF file
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);

    // Split PDF text content into lines (rows)
    const lines = data.text.split('\n').filter(line => line.trim() !== '');

    // Append each line to the text file
    const stream = fs.createWriteStream(txtPath, { flags: 'a' });

    lines.forEach(line => {
      stream.write(line + '\n');
    });

    stream.end();
    console.log(`Successfully appended ${lines.length} lines to ${txtPath}`);
  } catch (error) {
    console.error('Error processing PDF file:', error);
  }
}

// Usage
appendPdfToTextFile('UnreturnedItemsReport.pdf', 'UnreturnedItemsLog.txt');// Flex Reports Reader (pdf)
