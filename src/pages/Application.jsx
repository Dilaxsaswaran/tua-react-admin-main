import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../components/table/Table';
import DefinedGraph from '../pages/DefinedGraph'; // Import the DefinedGraph component

import allFunctionsList from '../assets/JsonData/functions-list.json';

const AppPage = () => {
  const { applicationId } = useParams();
  const [showGraph, setShowGraph] = useState(false)
  const functionsList = allFunctionsList.filter(
    (fn) => fn.appId === parseInt(applicationId)
  );

  useEffect(() => {
    console.log('App ID:', applicationId);
    console.log('Functions List:', functionsList);
  }, [applicationId]);

  const functionTableHead = [
    'fn ID',
    'name',
    'brief_details',
    'total',
    'deployed',
  ];

  const allNodes = [
    { id: 'A', x: 100, y: 100 },
    { id: 'B', x: 200, y: 200 },
    { id: 'C', x: 300, y: 300 },
  ];

  const allLinks = [
    { source: 'A', target: 'B', weight: 1 },
    { source: 'B', target: 'C', weight: 0.7 },
    { source: 'C', target: 'C', weight: 0.2 },
  ];

  const handleShowGraphClick = () => {
    setShowGraph(!showGraph);
  };

  return (
    <div>
      <h2 className="page-header">Functions</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              {functionsList.length > 0 ? (
                <Table
                  limit="10"
                  headData={functionTableHead}
                  renderHead={(item, index) => <th key={index}>{item}</th>}
                  bodyData={functionsList}
                  renderBody={(item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.brief}</td>
                      <td>{item.total_}</td>
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

      <div style={{ textAlign: 'right' }}>
      <button
          style={{
            backgroundColor: '#349eff',
            color: '#ffffff',
            marginRight: '10px',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          onClick={handleShowGraphClick}
        >
          {showGraph ? 'Hide Workflow' : 'View Workflow'}
        </button>
      </div>
      {showGraph && (
        <DefinedGraph nodes={allNodes} links={allLinks} pageFrom={'appPage'} />
      )}
    </div>
  );
};

export default AppPage;