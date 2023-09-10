import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from 'src/firebase/index';
import {HardSkill, ROLE, Credentials} from 'src/firebase/Types';
import firebase from 'firebase/compat';
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

export type CreateConsultantInput = {
  frstrame: string,
  lastrame: string,
  email: string,
  hired_as: string,
  begin_at: Date,
  skills: Array<HardSkill>,
  state: boolean,
}
export type CreateConsultantOutput = {
  uid: string
  fullname: string,
  email: string,
  hired_as?: string,
  begin_at?: string,
  skillsName?: string
  skills?: Array<HardSkill>,
  state?: string
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

export class Consultant {
  firstname: string;
  lastname: string;
  roles?: string;
  email: string;
  hired_as?: string;
  begin_at?: Date;
  state?: boolean;
  skills?: Array<HardSkill>;
  currentProject?: Project;
  projects?: Array<Project>;
  careers?: Array<Job>;
  training?: Array<Training>;
  position?: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    hired_as: string,
    begin_at: Date,
    state: boolean,
    skills: Array<HardSkill>,
    currentProject: Project,
    projects: Array<Project>,
    careers: Array<Job>,
    training: Array<Training>,
    position: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.roles = ROLE.Consultant;
    this.email = email;
    this.hired_as = hired_as;
    this.begin_at = begin_at;
    this.state = state;
    this.skills = skills;
    this.currentProject = currentProject;
    this.projects = projects;
    this.careers = careers;
    this.training = training;
    this.position = position;
  }

  toString() {
    return this.firstname + ', ' + this.lastname + ', ' + this.state + ', ' + this.email;
  }
}

const consultantConverter = {
  toFirestore: (consultant: Consultant) => {
    return {
      firstname: consultant.firstname,
      lastname: consultant.lastname,
      roles: ROLE.Consultant,
      email: consultant.email,
      state: consultant?.state,
      hired_as: consultant?.hired_as,
      begin_at: consultant?.begin_at,
      skills: consultant?.skills,
      currentProject: consultant?.currentProject,
      projects: consultant?.projects,
      careers: consultant?.careers,
      training: consultant?.training
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Consultant(
      data.firstname,
      data.lastname,
      data.email,
      data.hired_as,
      data.begin_at,
      data.state,
      data.skills,
      data.currentProject,
      data.projects,
      data.careers,
      data.training,
      data.position
    );
  }
};
const getConsultant = async (uid: string) => {
  const consultantRef = doc(db, 'consultants', uid).withConverter(consultantConverter);
  const consultantSnap = await getDoc(consultantRef);
  if (consultantSnap.exists()) {
    const consultant: Consultant = consultantSnap.data();
    return consultant;
  } else {
    console.log('No such consultant!');
    return null;
  }
}
const createConsultantAccount = async (credentials: Credentials, consultant: Consultant) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, 'Test123')// credentials.password);
    await sendEmailVerification(userCredential.user);

    consultant.roles = ROLE.Consultant;
    await sendPasswordResetEmail(auth, credentials.email);
    const usersRef = doc(db, 'consultants', userCredential.user.uid);
    const usersRoles = doc(db, 'roles', userCredential.user.uid);
    await setDoc(usersRoles, {roles: ROLE.Consultant});
    await setDoc(usersRef, {...consultant});
  } catch (error) {
    console.log(error)
  }
}
// const consultantLogin = async (credentials: Credentials) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
//     if (true) {
//       return await getConsultant(userCredential.user.uid);
//     } else {
//       await sendEmailVerification(userCredential.user);
//       return null;
//     }
//   } catch (error) {
//     await signOut(auth);
//     console.log(error);
//     return CustomErrorTypes.NO_SUCH_CONSULTANT;
//   }
// }
const updateConsultant = async (uid: string, updatedData: any) => {
  const consultantRef = doc(db, 'consultants', uid);
  await updateDoc(consultantRef, updatedData)
}

const addSkills = async (newSkills: Array<HardSkill>) => {
  const consultantUid = auth.currentUser?.uid;
  console.log(consultantUid);
  if (consultantUid) {
    const consultantRef = doc(db, 'consultants', consultantUid);
    await updateDoc(consultantRef, {
      skills: arrayUnion(...newSkills)
    });
  }
}
const removeSkills = async (newSkills: Array<HardSkill>) => {
  const consultantUid = auth.currentUser?.uid;
  if (consultantUid) {
    const consultantRef = doc(db, 'consultants', consultantUid);
    await updateDoc(consultantRef, {
      skills: arrayRemove(...newSkills)
    });
  }
}

const getConsultants = async () => {
  const querySnapshot = await getDocs(collection(db, 'consultants').withConverter(consultantConverter));
  const allConsultants: Array<Consultant> = [];
  querySnapshot.forEach((doc) => {
    allConsultants.push(doc.data());
  });
  return allConsultants;
}
const getConsultantsOutput = async () => {
  const querySnapshot = await getDocs(collection(db, 'consultants').withConverter(consultantConverter));
  const allConsultantsOutput: Array<CreateConsultantOutput> = [];
  querySnapshot.forEach((consultant) => {
    allConsultantsOutput.push(
      {
        uid: consultant.id,
        fullname: consultant.data().firstname + ' ' + consultant.data().lastname,
        email: consultant.data().email,
        hired_as: consultant.data().hired_as,
        begin_at: consultant.data().begin_at?.toString(),
        skills: consultant.data().skills,
        skillsName: consultant.data().skills?.map((skill) => {
          return skill.name;
        }).join(),
        state: !consultant.data().state ? 'Occupé' : 'Disponible'
      }
    )
  })
  return allConsultantsOutput;
}

const getConsultantsBySkills = async (projectSkills: any) => {
  const querySnapshot = await getDocs(collection(db, 'consultants').withConverter(consultantConverter));
  const allConsultantsOutput: Array<CreateConsultantOutput> = [];

  querySnapshot.forEach(async (consultant) => {
    const filteredConsultant: void | QueryDocumentSnapshot<Consultant> = await filterConsultantBySkills(projectSkills, consultant);

    if (filteredConsultant) {

      allConsultantsOutput.push(
        {
          uid: filteredConsultant.id,
          fullname: filteredConsultant.data().firstname + ' ' + filteredConsultant.data().lastname,
          email: filteredConsultant.data().email,
          hired_as: filteredConsultant.data().hired_as,
          begin_at: filteredConsultant.data().begin_at?.toString(),
          skills: consultant.data().skills,
          skillsName: filteredConsultant.data().skills?.map((skill) => {
            return skill.name;
          }).join(),
          state: !filteredConsultant.data().state ? 'Occupé' : 'Disponible'
        }
      )
    }
  });

  return allConsultantsOutput;
}

const filterConsultantBySkills = async (projectSkills: Array<HardSkill>, consultant: any): Promise<QueryDocumentSnapshot<Consultant> | void> => {
  const projectSkill: Array<string> = [];
  let hasConsultant = false;

  projectSkills.map((skill) => {
    projectSkill.push(skill.name);
  });

  if (consultant.data().skills) {
    consultant.data().skills.forEach((consultantSkill: any) => {
      if (projectSkill.includes(consultantSkill.name)) {
        hasConsultant = true;
        return hasConsultant;
      } else {
        hasConsultant = false;
        return hasConsultant;
      }
      ;
    });
  }
  return hasConsultant ? consultant : null;
  // console.log(consultantSkills)
}
// const getConsultantsWithIds = async () => {
//   const querySnapshot = await getDocs(collection(db, 'consultants').withConverter(consultantConverter));
//   const allConsultants: Array<{
//     uid: string,
//     consultant: Consultant
//   }> = [];
//   querySnapshot.forEach((doc) => {
//     allConsultants.push(
//       {
//         uid: doc.id,
//         consultant: doc.data()
//       }
//     );
//   });
//   return allConsultants;
// }
export {
  createConsultantAccount,
  // consultantLogin, //return Consultant if OK, null if emails is not verified, in error case the value will be undefined
  getConsultant,
  updateConsultant,
  getConsultants, // return type: Array<{uid: string, consultant: Consultant}>
  addSkills,
  removeSkills,
  getConsultantsOutput,
  getConsultantsBySkills
}
