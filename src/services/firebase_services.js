import { firestore } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const adminCollection = collection(firestore, "admin");

class FirebaseServices {
  updateUserDetails = (uid, newName, newPhone) => {
    try {
      let docRef = doc(firestore, `user-data/${uid}`);
      return updateDoc(docRef, { name: newName, phoneNumber: newPhone });
    } catch (error) {
      console.log(error);
    }
  };

  deleteUser = (uid) => {
    try {
      let docRef = doc(firestore, `user-data/${uid}`);
      return deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  updateSpaceDetails = (uid, newDetails) => {
    try {
      let docRef = doc(firestore, `parking-spaces/${uid}`);
      return updateDoc(docRef, {
        disabled: newDetails.status,
        address: newDetails.address,
        caretakerPhoneNumber: newDetails.phone,
        capacity: newDetails.capacity,
        dailyOrMonthly: newDetails.basis,
        info: newDetails.info,
        rules: newDetails.rules,
      });
    } catch (error) {
      console.log(error);
    }
  };

  approveSpace = (uid) => {
    try {
      let docRef = doc(firestore, `parking-spaces/${uid}`);
      return updateDoc(docRef, {
        approved: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  deleteSpace = (uid) => {
    try {
      let docRef = doc(firestore, `parking-spaces/${uid}`);
      return deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  addAmin = (admin) => {
    try {
      return addDoc(adminCollection, admin);
    } catch (error) {
      console.log(error);
    }
  };

  deleteAdmin = (uid) => {
    try {
      let docRef = doc(firestore, `admin/${uid}`);
      return deleteDoc(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  disableAdmin = (uid) => {
    try {
      let docRef = doc(firestore, `admin/${uid}`);
      return updateDoc(docRef, {
        permission: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new FirebaseServices();
