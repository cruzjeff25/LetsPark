import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../../../styles/admin/view.css'
import logo from '../../../img/logo.png'
import warning from '../../../img/attention.png'
import { firestore } from '../../../firebase';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import LoadingComponent from "../loading";

const spacesCollection = collection(firestore, 'parking-spaces');

const View = () => {
  const location = useLocation();
  const [space, setSpace] = useState();
  const [loading, setLoading] = useState(false);
  const docRef = doc(spacesCollection, location.state.id);

  const getUserProfile = async () => {
    setLoading(true);
    await getDoc(docRef).then((snap) => {
      if (snap.exists) {
        setSpace(snap.data());
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? <LoadingComponent /> : space == null ? <LoadingComponent /> :
        <div className='parkingSpace'>
          <h1>PARKING SPACES</h1>

          <div className='container'>
            <h1>VIEW PARKING SPACE-({space.id})</h1>

            <div className='con'>
              <div className='left-con'>
                <div className='img-con'>
                  <img src={logo} alt='logo' />
                </div>
                <label for="id">Parking Space ID</label>
                <br />
                <input id="id" type="text" value={space.id} readonly disabled />
                <br />
                <br />
                <label for="status">Status</label>
                <br />
                <input id="id" type="text" value={space.disabled ? "Disabled" : "Enabled"} readonly disabled />
                {!space.approved ? <div className='confirmation'>
                  <img src={warning} alt='warning' width='40px' height='40px' />
                  <p>This parking space is not yet confirmed</p>
                  <p>Confirm this parking space now?</p>
                  <button>Confirm</button>
                </div> : null}
              </div>
              <div className='right-con'>
                <div className='top'>
                  <div className='left'>
                    <label for="address">Address</label>
                    <br />
                    <input id="address" type="text" value={space.address} readonly disabled />
                    <br />
                    <br />
                    <label for="phone">Caretaker Phone Number</label>
                    <br />
                    <input id="phone" type="text" value={`0${space.caretakerPhoneNumber}`} readonly disabled />
                  </div>
                  <div className='right'>
                    <br />
                    <label for="capacity">Capacity</label>
                    <br />
                    <input id="capacity" type="text" value={space.capacity} readonly disabled />
                    <br />
                    <br />
                    <label for="basis">Basis</label>
                    <br />
                    <input id="basis" type="text" value={space.dailyOrMonthly} readonly disabled />
                    <br />
                    <br />
                  </div>
                </div>
                <div className='bottom'>
                  <label for="geo">Geoposition</label>
                  <br />
                  <input id="geo" type="text" value={`${space.geoposition[0]}, ${space.geoposition[1]}`} readonly disabled />
                  <br />
                  <label for="features">Features</label>
                  <br />
                  <input id="features" type="text" value={space.features} readonly disabled />
                  <br />
                  <label for="info">Parking Space Information</label>
                  <br />
                  <textarea id="info" type="text" value={space.info} rows="5" cols="80" readonly disabled />
                  <br />
                  <br />
                  <label for="rules">Rules</label>
                  <br />
                  <textarea id="rules" type="text" value={space.rules} rows="5" cols="80" readonly disabled />
                </div>
              </div>
            </div>
            <div className='views-nav'>
              {location.state.approved ? <Link className='link' to="ParkingSessions" state={{ id: space.id }}> View Parking Session</Link> : null}
              {location.state.approved ? <Link className='link' to="ParkingReviews" state={{ id: space.id }}> View Parking Reviews</Link> : null}
              <Link className='link' to="Documents" state={{ id: space.id, documents: [...space.certificates] }}> View Documents</Link>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default View