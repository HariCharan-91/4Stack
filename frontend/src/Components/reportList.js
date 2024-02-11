// reportList.js
import React, { useState, useEffect } from 'react';
import '../Styles/reportList.css';
import SelectionOption from './Selectioncolor';


function ReportList({ data, activeButton }) {
  const [rows, setRows] = useState([]);
  const [item, setItems] = useState(data)
  console.log(data)


  useEffect(() => {

    console.log("Data in ReportList:", data);

    if (data && data.length > 0) {
      let filteredData;

      switch (activeButton) {
        case 1:
          filteredData = data.filter(val => val[6] === 0);
          break;
        case 2:
          filteredData = data.filter(val => val[6] === 1);
          break;
        case 3:
          filteredData = data.filter(val => val[6] === 2);
          break;
        default:
          filteredData = data;
      }

      console.log("Filtered Data in ReportList:", filteredData);


      const formattedData = filteredData.map(item => [
        item[4], // Prompt
        item[0], // Caller Name
        item[5], // Caller Phone Number
        item[1], // Place
        item[2], // Field
        item[3], // Priority
        item[6]
      ]);

      console.log("Formatted Data in ReportList:", formattedData);


      setRows(formattedData);
    } else {
        console.log("No data or empty array in ReportList");

      setRows([]);
    }
  }, [data, activeButton]);

  return (
    <div className="listcontainer">
      <div className="data-container">
        <div className="data-header">
          <div className="header-item ">TEXT</div>
          <div className="header-item">CALLER</div>
          <div className="header-item">Call.No</div>
          <div className="header-item">place</div>
          <div className="header-item">Field</div>
          <div className="header-item">Priority</div>
        </div>
        {rows.map((rowData, index) => (
          <div className="data-row" key={index}>
            {rowData.map((dataItem, dataIndex) => (
              <div className="data-item" key={dataIndex}>
                {dataIndex === 1 ? (
                  <div>
                    <i className="icon fas fa-phone green-icon"></i>
                    <br />
                    {dataItem.split('\n')[0]}<br />
                    <span className="tag">+91 {dataItem.split('\n')[1]}</span>
                  </div>
                ) : (
                  dataIndex === rowData.length-1 ? (
                    <SelectionOption selected={dataItem[6]}/>
                    // <></>
                  ) : (
                    dataItem
                  )
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportList;