const fileManager = require('../src/utils/fileManager');
const fs = require('fs');
const path = require('path');

describe('File Manager Tests', () => {
  const testFile = 'test-data.json';
  const testData = {
    recipes: ['recipe1', 'recipe2', 'recipe3'],
    users: ['user1', 'user2'],
  };

  beforeAll(async () => {
    await fileManager.ensureDirectories();
  });

  afterAll(async () => {
    try {
      await fileManager.deleteFile(testFile);
      await fileManager.deleteFile(`${testFile}.gz`);
    } catch (error) {
      // File might not exist
    }
  });

  describe('JSON File Operations', () => {
    it('should write JSON file', async () => {
      const result = await fileManager.writeJsonFile(testFile, testData);
      expect(result).toContain(testFile);
    });

    it('should read JSON file', async () => {
      const data = await fileManager.readJsonFile(testFile);
      expect(data).toEqual(testData);
    });
  });

  describe('Compression Operations', () => {
    it('should compress file', async () => {
      const inputPath = path.join(__dirname, `../data/${testFile}`);
      const outputPath = path.join(__dirname, `../data/${testFile}.gz`);

      if (fs.existsSync(inputPath)) {
        const result = await fileManager.compressFile(inputPath, outputPath);
        expect(result).toBe(outputPath);
        expect(fs.existsSync(outputPath)).toBe(true);
      }
    });

    it('should export data compressed', async () => {
      const result = await fileManager.exportDataCompressed('backup', testData);
      expect(result).toContain('.gz');
    });
  });

  describe('Append Operations', () => {
    it('should append to file', async () => {
      const appendFile = 'append-test.log';
      await fileManager.appendToFile(appendFile, 'Log entry 1');
      await fileManager.appendToFile(appendFile, 'Log entry 2');

      const filePath = path.join(__dirname, `../data/${appendFile}`);
      const content = fs.readFileSync(filePath, 'utf-8');
      expect(content).toContain('Log entry 1');
      expect(content).toContain('Log entry 2');

      // Cleanup
      await fileManager.deleteFile(appendFile);
    });
  });
});
