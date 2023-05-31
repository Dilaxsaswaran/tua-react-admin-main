import React, { useState } from 'react'

import Table from '../components/table/Table'

const initialFunction = {
  id: '',
  name: '',
  brief_details: '',
  source_code: '',
  deployed: 'Yes',
}

const FunctionList = () => {
  const [functionList, setFunctionList] = useState([initialFunction])
  const [newFunction, setNewFunction] = useState(initialFunction)

  const functionTableHead = [
    'fn',
    'name',
    'brief_details',
    'source_code',
    'deployed',
  ]

  const renderHead = (item, index) => <th key={index}>{item}</th>

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.brief_details}</td>
      <td>{item.source_code}</td>
      <td>{item.deployed}</td>
    </tr>
  )

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    setNewFunction ((prev) => {
        return { ...prev, [name]: value }
    })
    // const updatedFunction = { ...newFunction, [name]: value }
    // console.log(updatedFunction)
    // setNewFunction(updatedFunction)
    console.log(newFunction)
  }

  const handleAddFunction = (e) => {
    e.preventDefault();
    setFunctionList([...functionList, newFunction])
    console.log(functionList)
    setNewFunction(initialFunction)
    console.log(newFunction)
  }

  return (
    <div>
      <h2 className="page-header">functions</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={functionTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={functionList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3>Add New Function</h3>
        <input
          type="text"
          name="id"
          value={newFunction.id}
          onChange={handleInputChange}
          placeholder="ID"
        />
        <input
          type="text"
          name="name"
          value={newFunction.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="brief_details"
          value={newFunction.brief_details}
          onChange={handleInputChange}
          placeholder="Brief Details"
        />
        <input
          type="text"
          name="source_code"
          value={newFunction.source_code}
          onChange={handleInputChange}
          placeholder="Source Code"
        />
        <button onClick={handleAddFunction}>Add Function</button>
      </div>
    </div>
  )
}

export default FunctionList
