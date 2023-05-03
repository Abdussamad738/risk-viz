import * as XLSX from 'xlsx';
import excelFile from './climateRisk.xlsx';
import React, { useState, useEffect } from "react";

export function Data() {
  const center = [37.0902, -95.7129];
  const zoom = 4;
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    console.log("start of useeffect in useExcelData");
    fetch(excelFile)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(JSON.stringify(XLSX.utils.sheet_to_json(worksheet)));
        setExcelData(jsonData);
      })
      .catch(error => console.error(error));
  }, []);

  const filteredData = excelData?.filter(
    (data) => data.Year === 2050
  ) ?? [];

  console.log("this is :"+filteredData);
  
  return excelData;
}
