import React, { useRef, useState } from "react";
import "../../../styles/admin/parkingReviews.css";
import { firestore } from "../../../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";
import { useDownloadExcel } from "react-export-table-to-excel";

const ParkingReviews = () => {
  const location = useLocation();
  const reviewCollection = collection(
    firestore,
    `parking-spaces/${location.state.id}/parking-reviews`
  );
  const [reviews, setReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);
  const tableRef = useRef(null);

  onSnapshot(reviewCollection, (snapshot) => {
    if (snapshot.docs.length > 0) {
      setNoReviews(false);
      setReviews(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else {
      setNoReviews(true);
    }
  });

  const [value, setValue] = useState("");
  const [tableFilter, setTableFilter] = useState([]);

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filterTable = reviews.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setReviews([...reviews]);
    }
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `reviews-space-${location.state.id}`,
    sheet: "Reviews",
  });

  return (
    <div className="reviews">
      <h1>REGISTERED SPACES</h1>
      <div className="container">
        <h1>VIEW SPACE REVIEWS-({location.state.id})</h1>
        <br />
        {noReviews ? (
          <div style={{ textAlign: "center", fontSize: "14px", color: "gray" }}>
            <p>No reviews yet.</p>
          </div>
        ) : reviews.length == 0 ? (
          <div
            className="loadingContainer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ReactLoading
              type={"bars"}
              color={"#0096FF"}
              height={"20px"}
              width={"20px"}
            />
          </div>
        ) : (
          <>
            <div>
              <input
                onChange={filterData}
                type="text"
                placeholder="Search by id, name, phone number"
              ></input>
              {/* <button className="search">SEARCH</button> */}
              <button className="excel" onClick={onDownload}>
                EXPORT TO EXCEL
              </button>
            </div>
            <table ref={tableRef}>
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
                {value.length > 0
                  ? tableFilter.map((review) => (
                      <tr>
                        <td>{review.id}</td>
                        <td>{review.reviewer}</td>
                        <td>{review.rating}</td>
                        <td>{review.review}</td>
                      </tr>
                    ))
                  : reviews.map((review) => (
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
        )}
      </div>
    </div>
  );
};

export default ParkingReviews;
