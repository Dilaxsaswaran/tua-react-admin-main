import React from 'react';
import { useHistory } from 'react-router-dom';
import Table from '../components/table/Table';

import applicationList from '../assets/JsonData/applications-list.json';

const applicationTableHead = [
  'ID',
  'name',
  'No of Functions',
  'phone',
  'total orders',
  'total spend',
  'location'
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index, navigateToDetails) => (
  <tr key={index} onClick={() => navigateToDetails(item.id)}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.No_of_Fn}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td>
  </tr>
);

const Applications = () => {
  const history = useHistory();

  const navigateToDetails = (id) => {
    // Redirect to the details page of the selected application with the applicationId parameter
    history.push(`/application/${id}`);
  };

  return (
    <div>
      <h2 className="page-header">Applications</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={applicationTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={applicationList}
                renderBody={(item, index) => renderBody(item, index, navigateToDetails)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
