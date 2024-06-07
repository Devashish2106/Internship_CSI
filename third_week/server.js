const fs = require('fs').promises;

async function readFileAsync(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    throw new Error(`Error reading file: ${err.message}`);
  }
}

async function writeFileAsync(filePath, data) {
  try {
    await fs.writeFile(filePath, data);
  } catch (err) {
    throw new Error(`Error writing file: ${err.message}`);
  }
}

async function processFiles() {
  try {
    const data = await readFileAsync('source.txt');
    await writeFileAsync('destination.txt', data);
    console.log('File written successfully');
  } catch (err) {
    console.error(err.message);
  }
}

processFiles();
