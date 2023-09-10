import {createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut,} from 'firebase/auth';
import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore'
import {
  Credentials,
  HardSkill,
  PROJECT_STATUS,
  ROLE,
  ConsultantProject,
  ConsultantTraining, TRAINING_STATUS
} from 'src/firebase/Types';
import {Project, projectConverter} from 'src/firebase/Project'
import {Training, trainingConverter} from 'src/firebase/Training';
import {auth, db} from 'src/firebase/index';
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

export class Consultant {
  firstname: string;
  lastname: string;
  email: string;
  hired_as?: string;
  begin_at?: Date;
  state?: boolean;
  skills?: Array<HardSkill>;
  currentProject?: ConsultantProject;
  projects?: Array<ConsultantProject>;
  careers?: Array<Job>;
  trainings?: Array<ConsultantTraining>;
  position?: string;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    hired_as?: string,
    begin_at?: Date,
    state?: boolean,
    skills?: Array<HardSkill>,
    currentProject?: ConsultantProject,
    projects?: Array<ConsultantProject>,
    careers?: Array<Job>,
    trainings?: Array<ConsultantTraining>,
    position?: string,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.hired_as = hired_as;
    this.begin_at = begin_at;
    this.state = state;
    this.skills = skills;
    this.currentProject = currentProject;
    this.projects = projects;
    this.careers = careers;
    this.trainings = trainings;
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
      email: consultant.email,
      hired_as: consultant?.hired_as,
      begin_at: consultant?.begin_at,
      state: consultant?.state,
      skills: consultant?.skills,
      currentProject: consultant?.currentProject,
      projects: consultant?.projects,
      careers: consultant?.careers,
      trainings: consultant?.trainings,
      position: consultant?.position
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
      data.trainings,
      data.position,
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
    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, 'Test123');// credentials.password);
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
  const consultantRef = doc(db, 'consultants', uid).withConverter(consultantConverter);
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

const isInProjects = (projects: Array<ConsultantProject>, newProject: ConsultantProject) => {
  if (!projects.length) return false;
  const projectsNames = projects.map((project) => {
    return project.name
  })
  console.log('list names: ', projectsNames);
  return projectsNames.includes(newProject.name);
}

const setConsultantCurrentProject = async (consultantUid: string, projectUid: string) => {
  const consultantRef = doc(db, 'consultants', consultantUid).withConverter(consultantConverter);
  const consultantSnap = await getDoc(consultantRef);
  if (!consultantSnap.exists()) {
    console.error(`Consultant: ${consultantUid} not exist`);
    return null;
  }
  const consultant: Consultant = consultantSnap.data();
  const projectRef = doc(db, 'projects', projectUid).withConverter(projectConverter);
  const projectSnap = await getDoc(projectRef);
  if (!projectSnap.exists()) {
    console.error(`Project: ${projectUid} not exist`);
    return null;
  }
  const project: Project = projectSnap.data();
  if (!consultant.currentProject) {
    await updateDoc(consultantRef, {
      currentProject: {
        name: project.name,
        client: project.client,
        start_at: project.start_at,
        end_at: project.end_at,
      }
    });
  } else {
    const projectTemp = consultant.currentProject;
    if (consultant.currentProject.name !== project.name) {
      console.log('is not current project')
      await updateDoc(consultantRef, {
        projects: arrayUnion({
          name: projectTemp.name,
          client: projectTemp.client,
          start_at: projectTemp.start_at,
          end_at: projectTemp.end_at
        })
      });
    }
    await updateDoc(consultantRef, {
      currentProject: {
        name: project.name,
        client: project.client,
        start_at: project.start_at,
        end_at: project.end_at
      }
    })
  }
  await updateDoc(projectRef, {
    status: PROJECT_STATUS.In_Progress
  });
  await updateDoc(projectRef, {
    team: arrayUnion({
      firstname: consultant.firstname,
      lastname: consultant.lastname,
      email: consultant.email
      ,
      position: consultant.position
    })
  })
}

const getConsultantsBySkills = async (projectSkills: any) => {
  const querySnapshot = await getDocs(collection(db, 'consultants').withConverter(consultantConverter));
  const allConsultantsOutput: Array<CreateConsultantOutput> = [];

  const projectAllSkills: Array<string> = [];

  projectSkills.map((skill: HardSkill) => {
    projectAllSkills.push(skill.name);
  });

  querySnapshot.forEach(async (consultant) => {
    const consultantSkills: Array<string> = [];

    if (consultant.data().skills) {

      consultant.data().skills?.map((skill: HardSkill) => {
        consultantSkills.push(skill.name)
      });

      const intersection: Array<string> = projectAllSkills.filter(skill => consultantSkills.includes(skill));

      if (intersection.length > 0) {
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
      }
    }
  });

  return allConsultantsOutput;
}

const addTrainingToConsultant = async (trainingUid: string, consultantUid: string) => {
  const trainingRef = doc(db, 'trainings', trainingUid).withConverter(trainingConverter);
  const trainingSnap = await getDoc(trainingRef);
  if (!trainingSnap.exists()) {
    console.error(`Project: ${trainingUid} not exist`);
    return null;
  }
  const training: Training = trainingSnap.data();
  const consultantRef = doc(db, 'consultants', consultantUid).withConverter(consultantConverter);
  const consultantSnap = await getDoc(consultantRef);
  if (!consultantSnap.exists()) {
    console.error(`Consultant: ${consultantUid} not exist`);
    return null;
  }
  await updateDoc(consultantRef, {
    trainings: arrayUnion({
      name: training.name,
      isStarted: TRAINING_STATUS.STARTED
    })
  })

}

export {
  consultantConverter,
  createConsultantAccount,
  // consultantLogin, //return Consultant if OK, null if emails is not verified, in error case the value will be undefined
  getConsultant,
  updateConsultant,
  getConsultants, // return type: Array<{uid: string, consultant: Consultant}>
  addSkills,
  removeSkills,
  getConsultantsOutput,
  getConsultantsBySkills,
  setConsultantCurrentProject,
  addTrainingToConsultant,
}
