import React, { useState,useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import {render} from 'react-dom';
export default function DataTable ({ tabledata })  {

  console.log("start of DataTable")

    

  // Define the state for sort column and direction
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Define the state for filter column and value
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterValue, setFilterValue] = useState('');

  // Define the state for filtered data
  const [filteredData, setFilteredData] = useState(null);

  // Sort the data
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Filter the data
  const handleFilter = (columnKey) => {
    if (filterColumn === columnKey) {
      setFilterColumn(null);
      setFilterValue('');
    } else {
      setFilterColumn(columnKey);
    }
  };

  // Handle filter input change
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  useEffect(() => {
    setFilteredData(tabledata);
  }, []);

  useEffect(() => {
    if (filterColumn && filterValue) {
      const newFilteredData = tabledata.filter((item) =>
        item[filterColumn].toString().toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredData(newFilteredData);
    } else {
      setFilteredData(tabledata);
    }
  }, [filterColumn, filterValue, tabledata]);

  useEffect(() => {
    if (sortColumn) {
      const newFilteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue < bValue) {
          return sortDirection === 'asc' ? -1 : 1;
        } else if (aValue > bValue) {
          return sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });

      setFilteredData(newFilteredData);
    }
  }, [sortColumn, sortDirection, filteredData]);

  // Define the table columns
  const columns = [
    {
      title: 'Asset Name',
      dataIndex: 'Asset Name',
      key: 'Asset Name',
    },
    {
      title: 'Latitude',
      dataIndex: 'Lat',
      key: 'Lat',
    },
    {
      title: 'Longitude',
      dataIndex: 'Long',
      key: 'Long',
    },
    {
      title: 'Business Category',
      dataIndex: 'Business Category',
      key: 'Business Category',
    },
    {
      title: 'Risk Rating',
      dataIndex: 'Risk Rating',
      key: 'Risk Rating',
      sorter: (a, b) => a['Risk Rating'] - b['Risk Rating'],
      sortOrder: sortColumn === 'Risk Rating' && sortDirection,
    },
    {
      title: 'Risk Factor 1',
      dataIndex: 'Risk Factors',
      key: 'Risk Factors',
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      key: 'Year',
      sorter: (a, b) => a['Year'] - b['Year'],
      sortOrder: sortColumn === 'Year' && sortDirection,
    },
  ];
  // Render the table
return (

  <div style={{ height: "500px", overflow: "auto" }}>
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>
              {column.title}{' '}
              {column.sorter && (
                <span onClick={() => handleSort(column.dataIndex)}>
                  {sortColumn === column.dataIndex && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
              )}
            </th>
          ))}
        </tr>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>
              {column.dataIndex === 'Year' ||
              column.dataIndex === 'Risk Rating' ||
              column.dataIndex === 'Risk Factors' ? (
                <>
                  <input
                    type="text"
                    value={
                      filterColumn === column.dataIndex ? filterValue : ''
                    }
                    onChange={handleFilterChange}
                  />
                  <button onClick={() => handleFilter(column.dataIndex)}>
                    {filterColumn === column.dataIndex ? 'Clear' : 'Filter'}
                  </button>
                </>
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {console.log(JSON.stringify(filteredData))}
        {filteredData &&
          filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item['Asset Name']}</td>
              <td>{item.Lat}</td>
              <td>{item.Long}</td>
              <td>{item['Business Category']}</td>
              <td>{item['Risk Rating']}</td>
              <td>{item['Risk Factors']}</td>
              <td>{item.Year}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)};