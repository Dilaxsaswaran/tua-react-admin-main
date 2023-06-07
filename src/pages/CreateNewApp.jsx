import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory, link } from 'react-router-dom';
import Table from '../components/table/Table';

const CreateApp = () => {
  const history = useHistory(); // Move the useHistory hook here

  const initialFunction = {
    id: '',
    name: '',
    shortName: '',
    brief_details: '',
    source_code: '',
    deployed: 'Yes',
  };

  const [functionList, setFunctionList] = useState([]);
  const [newFunction, setNewFunction] = useState(initialFunction);
  const [showFunctions, setShowFunctions] = useState(false);

  const functionTableHead = [
    'fn ID',
    'Name',
    'Short Name',
    'Brief Details',
    'Source Code',
    'Deployed',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFunction((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFunction = (e) => {
    e.preventDefault();
    const updatedFunctionList = [...functionList, { ...newFunction }];
    setFunctionList(updatedFunctionList);
    setNewFunction(initialFunction);
  };

  const handleAddApplication = () => {
    setShowFunctions(true);
  };

  useEffect(() => {
    if (showFunctions) {
      const tableContainer = document.getElementById('table-container');

      // Render the table component
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
                          <td>{item.shortName}</td>
                          <td>{item.brief_details}</td>
                          <td>{item.source_code}</td>
                          <td>{item.deployed}</td>
                        </tr>
                      )}
                    />
                  ) : (
                    <p>Add functions for the application.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      ReactDOM.render(table, tableContainer);

      // Clean up the rendered table component
      return () => {
        ReactDOM.unmountComponentAtNode(tableContainer);
      };
    }
  }, [showFunctions, functionList, history]);

  return (
    <div>
      <div>
        {!showFunctions && (
          <div>
            <h3 style={headerStyle}>Welcome</h3>
            <p style={textStyle}>Create and manage your functions here.</p>
            <div style={ctaContainerStyle}>
              <button onClick={handleAddApplication} style={buttonStyle}>
                <i className="bx bx-folder-plus" style={buttonIconStyle}></i>
                <span style={buttonTextStyle}>Create New Application</span>
              </button>
            </div>
          </div>
        )}

        {showFunctions && (
          <div>
            <h3>Add New Function</h3>
            <input
              type="text"
              name="id"
              value={newFunction.id}
              onChange={handleInputChange}
              placeholder="ID"
              style={inputStyle}
            />
            <input
              type="text"
              name="name"
              value={newFunction.name}
              onChange={handleInputChange}
              placeholder="Name"
              style={inputStyle}
            />
            <input
              type="text"
              name="shortName"
              value={newFunction.shortName}
              onChange={handleInputChange}
              placeholder="Short Name"
              style={inputStyle}
            />
            <input
              type="text"
              name="brief_details"
              value={newFunction.brief_details}
              onChange={handleInputChange}
              placeholder="Brief Details"
              style={inputStyle}
            />
            <input
              type="text"
              name="source_code"
              value={newFunction.source_code}
              onChange={handleInputChange}
              placeholder="Source Code"
              style={inputStyle}
            />
            <button onClick={handleAddFunction} style={buttonStyle}>
              Add Function
            </button>
          </div>
        )}
      </div>

      {/* Render the table container here */}
      {showFunctions && <div id="table-container"></div>}

      {functionList.length > 0 ? (
        <button onClick={() => history.push('/edit_graph', { functionList })} style={createAppButtonStyle}>
          Create App
        </button>
      ) : (
        null
      )}
    </div>
  );
};


const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const textStyle = {
  fontSize: '16px',
  marginBottom: '20px',
};

const ctaContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const createAppButtonStyle = {
  padding: '10px 15px',
  margin: '10px 0',
  backgroundColor: '#349eff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 15px',
  margin: '10px 0',
  backgroundColor: '#349eff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const buttonTextStyle = {
  marginRight: '5px',
};

const buttonIconStyle = {
  marginRight: '5px',
};

const inputStyle = {
  marginRight: '10px',
  marginTop: '10px',
  backgroundColor: '#eee',
  border: '1px solid #000',
  padding: '5px',
  borderRadius: '5px',
};

export default CreateApp;
