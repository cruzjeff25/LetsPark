import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/admin/dashboard.css";
import { firestore } from '../../firebase';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

const spacesCollection = collection(firestore, 'parking-spaces');
const usersCollection = collection(firestore, 'user-data');

const Dashboard = () => {

	const navigate = useNavigate();
	const location = useLocation();
	const [registeredSpaces, setRegisteredSpaces] = useState([]);
	const [pendingSpaces, setPendingSpaces] = useState([]);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		onSnapshot(spacesCollection, (snapshot) => {
			let registered = [], pending = [];
			snapshot.docs.forEach((doc) => {
				if (doc.data()["approved"]) {
					registered.push({ ...doc.data(), id: doc.id });
				} else {
					pending.push({ ...doc.data(), id: doc.id });
				}
			});
			setRegisteredSpaces(registered);
			setPendingSpaces(pending);
		});

		onSnapshot(usersCollection, (snapshot) => {
			let data = [];
			snapshot.docs.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});
			setUsers(data);
		});
	};

	return (
		<>
			<div className='dashboard'>
				<h1>DASHBOARD</h1>
				<div class="flexcontainer">
					<div class="dashbox">
						<p>{users.length}<br /><span>Registered Accounts</span></p>
					</div>
					<div class="dashbox">
						<p>{registeredSpaces.length}<br /><span>Registered Spaces</span></p>
					</div>
					<div class="dashbox">
						<p>{pendingSpaces.length}<br /><span>Pending Spaces</span></p>

					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
