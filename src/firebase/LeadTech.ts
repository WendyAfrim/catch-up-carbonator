import {createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword} from 'firebase/auth';
import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from 'src/firebase/index';
import {HardSkill, ROLE} from 'src/firebase/Types';
import LoginForm from 'components/Forms/LoginForm.vue';

export type Credentials = {
  email: string,
  password: string
}

export class LeadTech {
  name: string;
  email?: string;
  begin_at?: Date;
  state?: boolean;
  skills?: Array<HardSkill>;
  roles?: ROLE;

  constructor(
    name: string,
    email: string,
    begin_at?: Date,
    state?: boolean,
    skills?: Array<HardSkill>,
    roles?: ROLE
  ) {
    this.name = name;
    this.email = email;
    this.begin_at = begin_at;
    this.state = state;
    this.skills = skills;
    this.roles = roles;
  }

  toString() {
    return this.name + ', ' + this.state + ', ' + this.email;
  }
}

const leadTechConverter = {
  toFirestore: (leadTech: LeadTech) => {
    return {
      name: leadTech.name,
      email: leadTech.email,
      begin_at: leadTech.begin_at,
      state: leadTech.state,
      skills: leadTech.skills
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new LeadTech(
      data.name,
      data.email,
      data.begin_at,
      data.state,
      data.skills);
  }
};
const createLeadTechAccount = async (credentials: Credentials, leadTech: LeadTech) => {
  const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((response) => {
      console.log(response);
      return response;
    }).catch((error) => {
      throw error;
    });

  if (userCredential?.user?.email) {
    await sendEmailVerification(userCredential.user)
    leadTech.email = userCredential?.user?.email;
    const usersRef = collection(db, 'leadTechs');
    const newLeadTech = await setDoc(doc(usersRef, userCredential.user.uid), leadTech);
  }

  return userCredential;
}

const getLeadTech = async (uid: string) => {
  const leadTechRef = doc(db, 'leadTechs', uid).withConverter(leadTechConverter);
  const leadTechSnap = await getDoc(leadTechRef);
  if (leadTechSnap.exists()) {
    const leadTech = leadTechSnap.data();
    return leadTech;
  } else {
    console.log('No such leadTech!');
    return null;
  }
}
const leadTechLogin = async (credentials: Credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    return await getLeadTech(userCredential.user.uid);
  } catch (error) {
    console.log(error)
  }
}
const updateLeadTech = async (uid: string, updatedData: any) => {
  const leadTechRef = doc(db, 'leadTechs', uid);
  await updateDoc(leadTechRef, updatedData)
}

const addSkills = async (newSkills: Array<HardSkill>) => {
  const leadTechUid = auth.currentUser?.uid;
  if (leadTechUid) {
    const leadTechRef = doc(db, 'leadTechs', leadTechUid);
    await updateDoc(leadTechRef, {
      skills: arrayUnion(...newSkills)
    });
  }
}
const removeSkills = async (newSkills: Array<HardSkill>) => {
  const leadTechUid = auth.currentUser?.uid;
  if (leadTechUid) {
    const leadTechRef = doc(db, 'leadTechs', leadTechUid);
    await updateDoc(leadTechRef, {
      skills: arrayRemove(...newSkills)
    });
  }
}

const getLeadTechs = async () => {
  const querySnapshot = await getDocs(collection(db, 'leadTechs').withConverter(leadTechConverter));
  const allLeadTechs: Array<{
    id: string,
    leadTech: LeadTech
  }> = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allLeadTechs.push(
      {
        id: doc.id,
        leadTech: doc.data()
      }
    );

  });
  return allLeadTechs;
}

const getLeadTechsNames = async () => {
  const querySnapshot = await getDocs(collection(db, 'leadTechs').withConverter(leadTechConverter));
  const leadTechsNames: Array<string> = [];

  querySnapshot.forEach((leadTech) => {
    leadTechsNames.push(leadTech.data().name);
  })

  return leadTechsNames;
}

export {
  createLeadTechAccount,
  leadTechLogin,
  updateLeadTech,
  getLeadTechs,
  getLeadTech,
  getLeadTechsNames,
  addSkills,
  removeSkills
}
