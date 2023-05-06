import  { useState, useEffect } from "react";


// export function Data() {
//   console.log("start of useeffect in useExcelData");
//   const center = [37.0902, -95.7129];
//   const zoom = 4;
//   const [excelData, setExcelData] = useState(null);
//   const excelFile='.@/utils/climateRisk.xlsx'

//   useEffect(() => {
//     console.log("start of useeffect in useExcelData");
//     fetch(excelFile)
//       .then(response => response.arrayBuffer())
//       .then(arrayBuffer => {
//         const data = new Uint8Array(arrayBuffer);
//         const workbook = XLSX.read(data, { type: "array" });
//         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet);
//         console.log(JSON.stringify(XLSX.utils.sheet_to_json(worksheet)));
//         setExcelData(jsonData);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const filteredData = excelData?.filter(
//     (data) => data.Year === 2050
//   ) ?? [];

//   console.log("this is from data.js:"+filteredData);
  
//   return filteredData;
// }
// const xlsx = require('xlsx');
// const fs = require('fs');
// import * as xlsx from 'xlsx';
// import fs from 'fs';
// function parseXlsxFile(filename) {
//   const workbook = xlsx.readFile(filename);
//   const sheetName = workbook.SheetNames[0];
//   const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
//   return sheetData;
// }

// function getXlsxData() {
//   console.log("getXlsxData is called from Data.js ")
//   const xlsxFile = '@/utils/climateRisk.xlsx';
//   const xlsxData = parseXlsxFile(xlsxFile);
//   return xlsxData;
// }

// module.exports = getXlsxData;
import * as XLSX from 'xlsx';
import  {serverPath}  from '../../../next.config.cjs';
import fs from 'fs';
const url = path.join(process.cwd(), 'public', 'climateRisk.xlsx');

export default async function handler(req, res) {
  // console.log("Start of handler function in data.js");
  // console.log(encodeURI(url));
  const filePath = serverPath(encodeURI(url));
  const fileBuffer = await fs.promises.readFile(filePath);
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet);
  // console.log("JSON data: " + JSON.stringify(jsonData));
  
  // const filteredData = jsonData.filter((data) => data.Year === 2050);
  res.status(200).json(jsonData);
}
