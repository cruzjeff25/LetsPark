import React, { useState } from 'react'
import '../../../styles/admin/parkingReviews.css'
import { firestore } from '../../../firebase';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from 'react-loading';
import { useLocation } from 'react-router-dom';

const ParkingReviews = () => {

  const location = useLocation();
  const reviewCollection = collection(firestore, `parking-spaces/${location.state.id}/parking-reviews`);
  const [reviews, setReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);

  onSnapshot(reviewCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoReviews(false);
      setReviews(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      setNoReviews(true);
    }

  });

  return (
    <div className='reviews'>
      <h1>REGISTERED SPACES</h1>
      <div className='container'>
        <h1>VIEW SPACE REVIEWS-({location.state.id})</h1>
        <br />
        {noReviews ?
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>No reviews yet.</p>
          </div> : reviews.length == 0 ?
            <div className='loadingContainer' style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ReactLoading type={"bars"} color={"#0096FF"} height={"20px"} width={"20px"} />
            </div> :
            <>
              <div>
                <input type="text" placeholder="Search by name or rate"></input>
                <button className='search'>SEARCH</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Reviewer</th>
                    <th>Rate</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <hr></hr>
                <tbody>
                  {reviews.map((review) => (
                    <tr>
                      <td>{review.id}</td>
                      <td>{review.reviewer}</td>
                      <td>{review.rating}</td>
                      <td>{review.review}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
        }
      </div>
    </div>
  )
}

export default ParkingReviews