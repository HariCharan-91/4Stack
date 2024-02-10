import React, { useState } from 'react';
import SelectionOption from './Selectioncolor';
import '../Styles/reportList.css';

function TableRow({ values }) {
    return (
        <div className="data-row">
            {values.map((value, index) => (
                <div key={index}>{value}</div>
            ))}
        </div>
    );
}

function ReportList() {
    const [rows, setRows] = useState([
        ["Prompt :", "John Doe\n123-456-7890", "Pending"],
        // ["Low", "Jane Smith\n987-654-3210", "Yes", "11:00 AM", "456 Elm St", "In Progress"],
        // Add more rows here if needed
    ]);

    // Function to add a new row
    const addRow = () => {
        const newRow = ["Prompt : ", "", "Pending"];
        setRows(prevRows => [...prevRows, newRow]);
    };

    return (
        <div className="listcontainer">
            <div className="data-container">
                <div className="data-header">
                    <div className="header-item ">TEXT</div>
                    <div className="header-item">CALLER</div>
                    <div className="header-item">STATUS</div>
                </div>
                {/* Render rows dynamically */}
                <div></div>
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
                                    dataIndex === rowData.length - 1 ? (
                                        <SelectionOption />
                                    ) : (
                                        dataItem
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Add button to add new rows */}
            <button className="add-button" onClick={addRow}>Add Row</button>
        </div>
    );
}

export default ReportList;
