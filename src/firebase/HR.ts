import {createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword} from "firebase/auth";
import {collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from "src/firebase/index";
import {ROLE} from "src/firebase/Types";
import {getConsultant} from "src/firebase/Consultant";


type Name = {
  first: string,
  last: string
}
export type Credentials = {
  email: string,
  password: string
}
export class HR {
  name: Name;
  email?: string;
  roles: ROLE;
  constructor (name: Name,
               email: string,
               roles: ROLE) {
    this.name = name;
    this.email = email;
    this.roles = ROLE.HR;

  }
  toString() {
    return this.name.first + ', ' + this.name.last + ', ' + this.email;
  }
}
const consultantConverter = {
  toFirestore: (hr: HR) => {
    return {
      name: hr.name,
      email: hr.email,
      roles: hr.roles
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new HR(
      data.name,
      data.email, data.roles);
  }
};
const getHR = async (uid:string) =>{
  const hrRef = doc(db, 'users', uid).withConverter(consultantConverter);
  const hrSnap = await getDoc(hrRef);
  if(hrSnap.exists()){
    return hrSnap.data();
  } else {
    console.log("No such consultant!");
    return null;
  }
}
const createHrAccount = async (credentials: Credentials, hr:HR) => {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    if(userCredential?.user?.email){
      await sendEmailVerification(userCredential.user)
      hr.email = userCredential?.user?.email;
      const usersRef = collection(db, 'hrs');
      await setDoc(doc(usersRef, userCredential.user.uid), hr);
    }
  } catch (error) {
    console.log(error)
  }
}
const consultantLogin = async (credentials: Credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    console.log('uid: ', userCredential.user.uid, 'providerId', 'emailVerified',userCredential.user.emailVerified);

    return await getConsultant(userCredential.user.uid);
  } catch (error) {
    console.log(error)
  }
}
const updateConsultant = async (uid: string, updatedData: any) => {
  const consultantRef = doc(db, "users", uid);

  await updateDoc(consultantRef, updatedData)
}
export {

}

export {
  //return Consultant if OK, null if emails is not verified, in error case the value will be undefined
}
