import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function loadYamlData(filePath: string) {
  try {
    const fullPath = path.resolve(process.cwd(), filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return yaml.load(fileContents) as any;
  } catch (e) {
    console.error(`Error loading YAML file at ${filePath}:`, e);
    return null;
  }
}

// โหลดข้อมูลเตรียมไว้สำหรับ Export ไปใช้
const testDataPath = 'E:\\Workspaces\\playwright\\develop\\constants\\commondata.yml';
export const TestData = loadYamlData(testDataPath);

const commonWordingPath = 'constants\\commonwording.yml'
export const CommonWording = loadYamlData(commonWordingPath)