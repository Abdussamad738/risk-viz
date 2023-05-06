import React, { useState,useEffect } from 'react';
import { Table, Tag, Space } from 'antd';
import {render} from 'react-dom';
export default function DataTable ({ data })  {

  const [filteredData, setFilteredData] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [filterColumn, setFilterColumn] = useState(null);
  const [filterValue, setFilterValue] = useState(null);
  console.log("start of DataTable")
  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilterValue(value);
  };
  useEffect(() => {
    if(data){
    const filteredData = data.filter((item) =>
      item['Asset Name'].toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filteredData);
    }
  }, [filterValue]);
    // Define the table columns
    const columns = [
      {
        title: 'Asset Name',
        dataIndex: 'Asset Name',
        key: 'Asset Name',
        sorter: (a, b) => a['Asset Name'].localeCompare(b['Asset Name']),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Latitude',
        dataIndex: 'Lat',
        key: 'Lat',
        sorter: (a, b) => a.Lat - b.Lat,
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Longitude',
        dataIndex: 'Long',
        key: 'Long',
        sorter: (a, b) => a.Long - b.Long,
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Business Category',
        dataIndex: 'Business Category',
        key: 'Business Category',
        sorter: (a, b) => a['Business Category'].localeCompare(b['Business Category']),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Risk Rating',
        dataIndex: 'Risk Rating',
        key: 'Risk Rating',
        sorter: (a, b) => a['Risk Rating'] - b['Risk Rating'],
        render: (text) => (
          <>
            {text <= 0.39 ? (
              <Tag color={'green'}>{text}</Tag>
            ) : text <= 0.6 ? (
              <Tag color={'yellow'}>{text}</Tag>
            ) : (
              <Tag color={'red'}>{text}</Tag>
            )}
          </>
        ),
      },
      {
        title: 'Risk Factors',
        dataIndex: 'Risk Factors',
        key: 'Risk Factors',
        sorter: (a, b) => a['Risk Factors'].localeCompare(b['Risk Factors']),
        filters: [
          { text: 'Extreme Heat', value: 'Extreme Heat' },
          { text: 'Sea Level Rise', value: 'Sea Level Rise' },
          { text: 'Drought', value: 'Drought' },
          { text: 'Air Pollution', value: 'Air Pollution' },
          { text: 'Wildfire', value: 'Wildfire' },
          { text: 'Hurricane', value: 'Hurricane' },
          { text: 'Earthquake', value: 'Earthquake' },
          { text: 'Tornado', value: 'Tornado' },
          { text: 'Flooding', value: 'Flooding' },
          { text: 'Extreme cold', value: 'Extreme cold' },
        ],
        onFilter: (value, record) => record['Risk Factors'].indexOf(value) === 0,
        filterMultiple: false,
        render: (text) => <Tag color={'volcano'}>{text}</Tag>,
      },
      {
        title: 'Year',
        dataIndex: 'Year',
        key: 'Year',
        sorter: (a, b) => a.Year - b.Year,
        filters: [
          { text: '2030', value: '2030' },
          { text: '2040', value: '2040' },
          { text: '2050', value: '2050' },
          { text: '2060', value: '2060' },
          { text: '2070', value: '2070' },
        ],
        onFilter: (value, record) => record.Year.indexOf(value) === 0,
        filterMultiple: false,
        render: (text) => <a>{text}</a>,
      },
    ];
    const handleSort = (column) => {
      // If sorting the same column, reverse the direction. Otherwise, sort by the new column in ascending order.
      const newSortDirection = column === sortColumn ? (sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
      setSortDirection(newSortDirection);
      setSortColumn(column);
      setData((prevData) => {
        const newData = [...prevData];
        newData.sort((a, b) => {
          if (column === 'Location') {
            return newSortDirection === 'asc' ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]);
          } else if (column === 'Risk Rating') {
            return newSortDirection === 'asc' ? a[column] - b[column] : b[column] - a[column];
          } else {
            return newSortDirection === 'asc' ? a[column].toString().localeCompare(b[column].toString()) : b[column].toString().localeCompare(a[column].toString());
          }
        });
        return newData;
      });
    };

  
    // Define the function to handle filtering
    const handleFilter = (filters) => {
      const { Year, 'Risk Factor': riskFactor } = filters;
      const newData = data.filter((item) => {
        let filteredData = true;
        if (Year && item.Year !== Year) {
          filteredData = false;
        }
        if (riskFactor && item['Risk Factors'] !== riskFactor) {
          filteredData = false;
        }
        return filteredData;
      });
      setFilteredData(newData);
    };
  
    return (
      <div>
      <table>
        <thead>
          <tr>
          <th onClick={() => handleSort('Year')}>Year {sortColumn === 'Year' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            
            <th onClick={() => handleSort('Risk Rating')}>Risk Rating {sortColumn === 'Risk Rating' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('Risk Factors')}>Risk Factor 1 {sortColumn === 'Risk Factors' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
           
            
          </tr>
          <tr>
            <th>Filter</th>
            <th></th>
            <th>
              <input type="text" value={filterColumn === 'Risk Factor' ? filterValue : ''} onChange={handleFilterChange} />
              <button onClick={() => handleFilter('Risk Factor')}>{filterColumn === 'Risk Factor' ? 'Clear' : 'Filter'}</button>
            </th>
            
            
            <th>
              <input type="text" value={filterColumn === 'Risk Rating' ? filterValue : ''} onChange={handleFilterChange} />
              <button onClick={() => handleFilter('Risk Rating')}>{filterColumn === 'Risk Rating' ? 'Clear' : 'Filter'}</button>
            </th>
            <th>
              <input type="text" value={filterColumn === 'Year' ? filterValue : ''} onChange={handleFilterChange} />
              <button onClick={() => handleFilter('Year')}>{filterColumn === 'Year' ? 'Clear' : 'Filter'}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {console.log(JSON.stringify(filteredData))}
          {filteredData && filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item['Asset Name']}</td>
              <td>{item.Lat}</td>
              <td>{item.Long}</td>
              <td>{item['Business Category']}</td>
              <td>{item['Risk Rating']}</td>
              <td>{item['Risk Factors']}</td>
              {/* <td>{item['Risk Factor 2']}</td> */}
              <td>{item.Year}</td>
              <td>{}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
}