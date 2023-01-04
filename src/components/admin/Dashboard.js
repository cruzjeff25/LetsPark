import React from 'react'
import "../../styles/admin/dashboard.css"

const Dashboard = () => {
  return (
		<div className='dashboard'>
		<h1>DASHBOARD</h1>
      <div class="flexcontainer">
		<div class="box">
			<p>53<br/><span>Registered Accounts</span></p>
		</div>
		<div class="box">
			<p>32<br/><span>Registered Spaces</span></p>
		</div>
		<div class="box">
			<p>16<br/><span>Pending Spaces</span></p>
			
		</div>
    </div>
	</div>
	
  )
}

export default Dashboard
