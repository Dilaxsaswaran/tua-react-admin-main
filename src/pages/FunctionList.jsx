import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Table from '../components/table/Table';

const initialFunction = {
  id: '',
  name: '',
  brief_details: '',
  source_code: '',
  deployed: 'Yes',
};

const FunctionList = () => {
  const [functionList, setFunctionList] = useState([]);
  const [newFunction, setNewFunction] = useState(initialFunction);

  const functionTableHead = [
    'fn ID',
    'name',
    'brief_details',
    'source_code',
    'deployed',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFunction((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleAddFunction = (e) => {
    e.preventDefault();
    const updatedFunctionList = [...functionList, { ...newFunction }];
    setFunctionList(updatedFunctionList);
    setNewFunction(initialFunction);
  };

  useEffect(() => {
    const tableContainer = document.getElementById('table-container');

    // Render the table here
    const table = (
      <div>
        <h2 className="page-header">Functions</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                {functionList.length > 0 ? (
                  <Table
                    limit="10"
                    headData={functionTableHead}
                    renderHead={(item, index) => <th key={index}>{item}</th>}
                    bodyData={functionList}
                    renderBody={(item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.brief_details}</td>
                        <td>{item.source_code}</td>
                        <td>{item.deployed}</td>
                      </tr>
                    )}
                  />
                ) : (
                  <p>No functions found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Render the table component
    ReactDOM.render(table, tableContainer);

    // Clean up the rendered table component
    return () => {
      ReactDOM.unmountComponentAtNode(tableContainer);
    };
  }, [functionList]);

  return (
    <div>
      <div>
        <h3>Add New Function</h3>
        <input
          type="text"
          name="id"
          value={newFunction.id}
          onChange={handleInputChange}
          placeholder="ID"
          style={{
            marginRight: '10px',
            marginTop: '10px',
            backgroundColor: '#eee',
            border: '1px solid #000',
            padding: '5px',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          name="name"
          value={newFunction.name}
          onChange={handleInputChange}
          placeholder="Name"
          style={{
            marginRight: '10px',
            marginTop: '10px',
            backgroundColor: '#eee',
            border: '1px solid #000',
            padding: '5px',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          name="brief_details"
          value={newFunction.brief_details}
          onChange={handleInputChange}
          placeholder="Brief Details"
          style={{
            marginRight: '10px',
            marginTop: '10px',
            backgroundColor: '#eee',
            border: '1px solid #000',
            padding: '5px',
            borderRadius: '5px',
          }}
        />
        <input
          type="text"
          name="source_code"
          value={newFunction.source_code}
          onChange={handleInputChange}
          placeholder="Source Code"
          style={{
            marginRight: '10px',
            marginTop: '10px',
            backgroundColor: '#eee',
            border: '1px solid #000',
            padding: '5px',
            borderRadius: '5px',
          }}
        />
        <button
          onClick={handleAddFunction}
          style={{
            padding: '10px 15px',
            margin: '10px 0',
            backgroundColor: '#349eff',
            color: '#fff',
            borderRadius: '5px',
          }}
        >
          Add Function
        </button>
      </div>

      {/* Render the table here */}
      <div id="table-container"></div>
    </div>
  );
};

export default FunctionList;
