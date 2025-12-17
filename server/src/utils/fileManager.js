const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');

// Promisify zlib functions
const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);

const uploadsDir = path.join(__dirname, '../../uploads');
const dataDir = path.join(__dirname, '../../data');

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Write JSON file
async function writeJsonFile(filename, data) {
  try {
    await ensureDirectories();
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`File written: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
}

// Read JSON file
async function readJsonFile(filename) {
  try {
    const filePath = path.join(dataDir, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

// Compress file
async function compressFile(inputPath, outputPath) {
  try {
    const input = fsSync.createReadStream(inputPath);
    const output = fsSync.createWriteStream(outputPath);
    const gzipStream = zlib.createGzip();

    return new Promise((resolve, reject) => {
      input
        .pipe(gzipStream)
        .pipe(output)
        .on('finish', () => {
          console.log(`File compressed: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', reject);
    });
  } catch (error) {
    console.error('Error compressing file:', error);
    throw error;
  }
}

// Decompress file
async function decompressFile(inputPath, outputPath) {
  try {
    const input = fsSync.createReadStream(inputPath);
    const output = fsSync.createWriteStream(outputPath);
    const gunzipStream = zlib.createGunzip();

    return new Promise((resolve, reject) => {
      input
        .pipe(gunzipStream)
        .pipe(output)
        .on('finish', () => {
          console.log(`File decompressed: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', reject);
    });
  } catch (error) {
    console.error('Error decompressing file:', error);
    throw error;
  }
}

// Export data with compression
async function exportDataCompressed(filename, data) {
  try {
    const jsonPath = path.join(dataDir, `${filename}.json`);
    await writeJsonFile(`${filename}.json`, data);

    const compressedPath = path.join(dataDir, `${filename}.json.gz`);
    await compressFile(jsonPath, compressedPath);

    return compressedPath;
  } catch (error) {
    console.error('Error exporting compressed data:', error);
    throw error;
  }
}

// Import compressed data
async function importDataCompressed(filename) {
  try {
    const compressedPath = path.join(dataDir, `${filename}.json.gz`);
    const decompressedPath = path.join(dataDir, `${filename}-decompressed.json`);

    await decompressFile(compressedPath, decompressedPath);
    const data = await readJsonFile(`${filename}-decompressed.json`);

    // Clean up temporary file
    await fs.unlink(decompressedPath);

    return data;
  } catch (error) {
    console.error('Error importing compressed data:', error);
    throw error;
  }
}

// Stream file data
function streamFileData(filePath) {
  return fsSync.createReadStream(filePath, { encoding: 'utf-8' });
}

// Append to file
async function appendToFile(filename, data) {
  try {
    await ensureDirectories();
    const filePath = path.join(dataDir, filename);
    await fs.appendFile(filePath, data + '\n', 'utf-8');
    console.log(`Data appended to file: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error('Error appending to file:', error);
    throw error;
  }
}

// Delete file
async function deleteFile(filename) {
  try {
    const filePath = path.join(dataDir, filename);
    await fs.unlink(filePath);
    console.log(`File deleted: ${filePath}`);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

module.exports = {
  writeJsonFile,
  readJsonFile,
  compressFile,
  decompressFile,
  exportDataCompressed,
  importDataCompressed,
  streamFileData,
  appendToFile,
  deleteFile,
  ensureDirectories,
};
