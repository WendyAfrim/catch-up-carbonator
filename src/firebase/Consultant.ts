import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {collection, doc, getDoc, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from "src/firebase/index";
import {Skills} from "src/firebase/Types";


type Name = {
  first: string,
  last: string
}
export type Credentials = {
  email: string,
  password: string
}
type Project = {
  name: string,
  start_at: string,
  end_at: string,
  position: string,
  client: string,
  feedback?: string
}
type Goal = {
  name: string,
  achieved: boolean
}
type Job = {
  profession: string,
  start_at: Date,
  end_at: Date,
  goals?: Array<Goal>
}
type Training = {
  name: string,
  link: string,
  achieved: boolean
}

// export type Consultant = {
//   name?: Name,
//   email: string | null,
//   hired_as?: Date,
//   begin_at?: Date,
//   state?: string,
//   skills?: Skills ,
//   currentProject?: Project,
//   projects?: Array<Project>,
//   careers?: Array<Job>,
//   training?: Array<Training>
// } // remove unnecessary undefined from Consultant type

export class Consultant {
  name: Name ;
  email?: string ;
  hired_as?: Date ;
  begin_at?: Date ;
  state?: string ;
  skills?: Skills  ;
  currentProject?: Project ;
  projects?: Array<Project> ;
  careers?: Array<Job> ;
  training?: Array<Training> ;
  constructor (name: Name,
               email: string,
               hired_as?: Date,
               begin_at?: Date,
               state?: string,
               skills?: Skills ,
               currentProject?: Project,
               projects?: Array<Project>,
               careers?: Array<Job>,
               training?: Array<Training>) {
    this.name = name;
    this.email = email;
    this.hired_as = hired_as;
    this.begin_at = begin_at;
    this.state = state;
    this.skills = skills ;
    this.currentProject = currentProject;
    this.projects = projects;
    this.careers = careers;
    this.training = training;
  }
  toString() {
    return this.name.first + ', ' + this.name.last + ', ' + this.state + ', ' + this.email;
  }
}

// Firestore data converter
const consultantConverter = {
  toFirestore: (consultant: Consultant) => {
    return {
      name: consultant.name,
      email: consultant.email,
      hired_as: consultant.hired_as,
      begin_at: consultant.begin_at,
      state: consultant.state,
      skills: consultant.skills ,
      currentProject: consultant.currentProject,
      projects: consultant.projects,
      careers: consultant.careers,
      training: consultant.training
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Consultant(
      data.name,
      data.email,
      data.hired_as,
      data.begin_at,
      data.state,
      data.skills ,
      data.currentProject,
      data.projects,
      data.careers,
      data.training);
  }
};
const getConsultant = async (uid:string) =>{
  const consultantRef = doc(db, 'users', uid).withConverter(consultantConverter);
  const consultantSnap = await getDoc(consultantRef);
  if(consultantSnap.exists()){
    const consultant = consultantSnap.data();
    console.log(consultant.toString());
    return consultant;
  } else {
    console.log("No such consultant!");
  }
}
const createConsultantAccount = async (credentials: Credentials, consultant:Consultant) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
    if(userCredential?.user?.email){
      consultant.email = userCredential?.user?.email;
      const usersRef = collection(db, 'users');
      const newConsultant = await setDoc(doc(usersRef, userCredential.user.uid), consultant);
      console.log('userCredential: ',userCredential.user);
      console.log('newConsultant: ',newConsultant);
    }
  } catch (error) {
    console.log(error)
  }
}
const consultantLogin = async (credentials: Credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    console.log('uid: ', userCredential.user.uid, 'providerId', userCredential.providerId);
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
  createConsultantAccount,
  consultantLogin,
  getConsultant,
  updateConsultant
}
