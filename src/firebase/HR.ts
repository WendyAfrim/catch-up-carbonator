import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from "firebase/auth";
import {collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from "src/firebase/index";
import {ROLE} from "src/firebase/Types";
import {getConsultant} from "src/firebase/Consultant";



export type Credentials = {
  email: string,
  password: string
}
export class HR {
  firstName:string;
  lastName:string;
  email: string;
  roles?: ROLE;
  constructor (
    firstName:string,
    lastName:string,
    email: string,
    roles: ROLE.HR
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.roles = ROLE.HR;

  }
  toString() {
    return this.firstName + ', ' + this.lastName + ', ' + this.email;
  }
}
const hrConverter = {
  toFirestore: (hr: HR) => {
    return {
      firstName: hr.firstName,
      email: hr.email,
      roles: hr.roles
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new HR(
      data.firstName,
      data.lastName,
      data.email,
      ROLE.HR
    );
  }
};
const getHR = async (uid:string) =>{
  const hrRef = doc(db, 'hrs', uid).withConverter(hrConverter);
  const hrSnap = await getDoc(hrRef);
  if(hrSnap.exists()){
    return hrSnap.data();
  } else {
    console.log("No such HR!");
    return null;
  }
}
const createHRAccount = async (credentials: Credentials, hr:HR) => {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    // await sendEmailVerification(userCredential.user);
    hr.roles = ROLE.HR;
    // await sendPasswordResetEmail(auth, credentials.email);
    const usersRef = doc(db, 'hrs', userCredential.user.uid);
    await setDoc(usersRef, {...hr});
    const usersRoles = doc(db, 'roles', userCredential.user.uid);
    await setDoc(usersRoles, {roles: ROLE.HR});

  } catch (error) {
    console.log(error)
  }
}

const updateHR = async (uid: string, updatedData: any) => {
  const hrRef = doc(db, "users", uid);

  await updateDoc(hrRef, updatedData)
}
export {
  createHRAccount,
  updateHR,
  getHR,
}
