import React from 'react'
import '../../../styles/admin/registered.css'
import { RxBorderDotted } from 'react-icons/rx';
import { useNavigate } from "react-router-dom";

const Registered = () => {


  //navigate to parking space details
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `ViewSpace`; 
    navigate(path);
  }


  return (  
    <div className='registered'> 
        <h1>REGISTERED PARKING SPACES</h1>
        <div className='container'>
          <div>
            <input type="text" placeholder="Search by ID or Address"></input>
            <button className='search'>SEARCH</button>
            <button className='excel'>EXCEL</button>
            <button className='csv'>CSV</button>
          </div>
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th className='address'>Address</th>
              <th className='capacity'>Capacity</th>
              <th className='basis'>Basis</th>
              <th>Owner ID</th>
              <th>Owner Name</th>
              <th className='action'>Action</th>
            </tr>
            </thead>
            <hr></hr>
            <tbody>
              <tr onClick={routeChange}>
                <td>123</td>
                <td>Malinta 2138</td>
                <td>10</td>
                <td>Daily</td>
                <td>12345</td>
                <td>JEff</td>
                <td className='action-bttn'><RxBorderDotted/></td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Registered