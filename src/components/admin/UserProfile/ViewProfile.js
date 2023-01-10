import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../../styles/admin/userprofile.css'
import { firestore } from '../../../firebase';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import LoadingComponent from "../loading";

const usersCollection = collection(firestore, 'user-data');
const spacesCollection = collection(firestore, 'parking-spaces');

const ViewProfile = () => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const docRef = doc(usersCollection, location.state.id);
  const [ownedSpaces, setOwnedSpaces] = useState(0);

  const getUserProfile = async () => {

    setLoading(true);
    await getDoc(docRef).then((snap) => {
      if (snap.exists) {
        setUser(snap.data());
      }
    });
    setLoading(false);
  };

  onSnapshot(spacesCollection, (snapshot) => {
    let owned = 0;
    snapshot.docs.forEach((doc) => {
      if (doc.data()["ownerId"] === location.state.id) {
        owned += 1;
      }
    });
    setOwnedSpaces(owned);
  });

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? <LoadingComponent /> : user == null ? <LoadingComponent /> : <div className='viewprofile'>
        <h1>USER ACCOUNTS</h1>
        <div className='container'>
          <h1>VIEW USER PROFILE - ({user.name})</h1>
          <div className='con'>
            <div className='right-con'>
              <div className='top'>
                <div className='left'>
                  <label for="id">ID</label>
                  <br />
                  <input id="id" type="text" value={user.id} readonly disabled />
                  <br />
                  <br />
                  <label for="email">Email</label>
                  <br />
                  <input id="email" type="text" value={user.email} readonly disabled />
                </div>
                <div className='right'>
                  <label for="name">Name</label>
                  <br />
                  <input id="name" type="text" value={user.name} readonly disabled />
                  <br />
                  <br />
                  <label for="phone">Phone Number</label>
                  <br />
                  <input id="phone" type="text" value={user.phoneNumber} readonly disabled />
                  <br />
                  <br />
                </div>
              </div>

              <div className='bottom'>
                <label for="owned">Spaces Owned</label>
                <br />
                <input id="owned" type="text" value={ownedSpaces} readonly disabled />
                <br />
              </div>
            </div>

            <div className='left-con'>
              <div className='img-con'>
                <img src={`${user.imageUrl}`} alt='logo' />
              </div>
            </div>
          </div>

          <div className='views-nav'>
            <Link className='link' to="/Admin/UserAccounts/ViewProfile/InProgress" state={{ name: user.name, id: location.state.id }} > View in Progress Parking</Link>
            <Link className='link' to="/Admin/UserAccounts/ViewProfile/Upcoming" state={{ name: user.name, id: location.state.id }} > View Upcoming Parking</Link>
            <Link className='link' to="/Admin/UserAccounts/ViewProfile/History" state={{ name: user.name, id: location.state.id }} > View Parking History</Link>
            <Link className='link' to="/Admin/UserAccounts/ViewProfile/OwnedSpaces" state={{ name: user.name, id: location.state.id }} > View Parking Spaces</Link>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default ViewProfile