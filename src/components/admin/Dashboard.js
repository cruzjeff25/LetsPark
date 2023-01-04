import React from 'react'
import "../../styles/admin/dashboard.css"

const Dashboard = () => {
  return (
    <div className='dashboard'>
      Dashboard
      <div class="col-div-3">
		<div class="box">
			<p>53<br/><span>Registered Accounts</span></p>
			<i class="fa fa-users box-icon"></i>
		</div>
	</div>
  <div class="col-div-4">
		<div class="box">
			<p>32<br/><span>Registered Spaces</span></p>
			<i class="fa fa-users box-icon"></i>
		</div>
	</div>
  <div class="col-div-5">
		<div class="box">
			<p>16<br/><span>Pending Spaces</span></p>
			<i class="fa fa-users box-icon"></i>
		</div>
	</div>  
    </div>
  )
}

export default Dashboard
