import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from 'src/firebase/index';
import {LeadTechProject, ROLE} from 'src/firebase/Types';
import {Project, projectConverter} from 'src/firebase/Project';
import {consultantConverter} from 'src/firebase/Consultant';
import {Challenge, createChallenge} from 'src/firebase/Challenge';


export type Credentials = {
  email: string,
  password: string
}

export type LeadTechOutput = {
  uid: string
  fullname: string,
  email?: string,
  begin_at?: Date,
  state?: string
}


export class LeadTech {
  firstname: string;
  lastname: string;
  email?: string;
  begin_at?: Date;
  state?: string;
  project?: LeadTechProject;
  challenges?: Array<string>;


  constructor(
    firstname: string,
    lastname: string,
    email: string,
    begin_at?: Date,
    state?: string,
    project?: LeadTechProject,
    challenges?: Array<string>
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.begin_at = begin_at;
    this.state = state;
    this.project = project;
    this.challenges = challenges
  }

  toString() {
    return this.firstname + ', ' + this.lastname + ', ' + this.state + ', ' + this.email;
  }
}

const leadTechConverter = {
  toFirestore: (leadTech: LeadTech) => {
    return {
      firstname: leadTech.firstname,
      lastname: leadTech.lastname,
      email: leadTech.email,
      begin_at: leadTech.begin_at,
      state: leadTech.state,
      project: leadTech.project,
      challenges: leadTech.challenges
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new LeadTech(
      data.firstname,
      data.lastname,
      data.email,
      data.begin_at,
      data.state,
      data.project,
      data.challenges
    );
  }
};
const createLeadTechAccount = async (credentials: Credentials, leadTech: LeadTech) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

    await sendPasswordResetEmail(auth, credentials.email);
    await sendEmailVerification(userCredential.user);
    const usersRef = doc(db, 'leadTechs', userCredential.user.uid);
    const usersRoles = doc(db, 'roles', userCredential.user.uid);
    await setDoc(usersRoles, {roles: ROLE.Consultant});
    await setDoc(usersRef, {...leadTech});
  } catch (error) {
    console.log(error)
  }
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

const updateLeadTech = async (uid: string, updatedData: any) => {
  const leadTechRef = doc(db, 'leadTechs', uid);
  await updateDoc(leadTechRef, updatedData)
}

const setLeadTechProject = async (leadTechUid: string, projectUid: string) => {
  const leadTechRef = doc(db, 'leadTechs', leadTechUid).withConverter(leadTechConverter);
  const leadTechSnap = await getDoc(leadTechRef);
  if (!leadTechSnap.exists()) {
    console.error(`Consultant: ${leadTechUid} not exist`);
    return null;
  }
  const leadTech: LeadTech = leadTechSnap.data();
  const projectRef = doc(db, 'projects', projectUid).withConverter(projectConverter);
  const projectSnap = await getDoc(projectRef);
  if (!projectSnap.exists()) {
    console.error(`Project: ${projectUid} not exist`);
    return null;
  }

  if (!leadTech.project) {
    const project: Project = projectSnap.data();
    await updateDoc(leadTechRef, {
      project: {
        name: project.name,
        client: project.client,
        start_at: project.start_at,
        end_at: project.end_at,
        team: project.team
      }
    });
    await updateDoc(projectRef, {
      leadTech: {
        firstname: leadTech.firstname,
        lastname: leadTech.lastname,
        email: leadTech.email
      }
    });
  } else {
    throw new Error('Vous êtes déjà assigné à un projet');
  }
}


const getLeadTechs = async () => {
  const querySnapshot = await getDocs(collection(db, 'leadTechs').withConverter(leadTechConverter));
  const allLeadTechs: Array<{
    uid: string,
    leadTech: LeadTech
  }> = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allLeadTechs.push(
      {
        uid: doc.id,
        leadTech: doc.data()
      }
    );

  });
  return allLeadTechs;
}

const getLeadTechsOutput = async () => {
  const querySnapshot = await getDocs(collection(db, 'leadTechs').withConverter(leadTechConverter));
  const allConsultantsOutput: Array<LeadTechOutput> = [];
  querySnapshot.forEach((leadTech) => {
    allConsultantsOutput.push(
      {
        uid: leadTech.id,
        fullname: leadTech.data().firstname + ' ' + leadTech.data().lastname,
        email: leadTech.data().email,
        begin_at: leadTech.data().begin_at,
        // hired_as: consultant.data().hired_as?.toString(),

        state: !leadTech.data().state ? 'Occupé' : 'Disponible'
      }
    )
  })
  return allConsultantsOutput;
}


const getLeadTechsNames = async () => {
  const querySnapshot = await getDocs(collection(db, 'leadTechs').withConverter(leadTechConverter));
  const leadTechsNames: Array<string> = [];

  querySnapshot.forEach((leadTech) => {
    leadTechsNames.push(leadTech.data().firstname);
  })

  return leadTechsNames;
}

const addNewChallenge = async (leadTechUid: string, challenge: Challenge) => {
  const leadTechRef = doc(db, 'leadTechs', leadTechUid).withConverter(leadTechConverter);
  const leadTechSnap = await getDoc(leadTechRef);
  if (!leadTechSnap.exists()) {
    console.error(`Consultant: ${leadTechUid} not exist`);
    return null;
  }
  await createChallenge(challenge)
  await updateDoc(leadTechRef, {
    challenges: arrayUnion({
      name: challenge.name
    })
  });
}

export {
  createLeadTechAccount,
  updateLeadTech,
  getLeadTechs,
  getLeadTech,
  getLeadTechsNames,
  getLeadTechsOutput,
  setLeadTechProject,
  addNewChallenge
}
