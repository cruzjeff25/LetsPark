import { firestore } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

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
}

export default new FirebaseServices();
