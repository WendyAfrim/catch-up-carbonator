import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from "src/firebase/index";
import {HardSkill, ROLE} from "src/firebase/Types";

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
export class Consultant {
    name: Name;
    roles?: ROLE.Consultant;
    email?: string;
    hired_as?: string;
    begin_at?: Date;
    state?: string;
    skills?: Array<HardSkill>;
    currentProject?: Project;
    projects?: Array<Project>;
    careers?: Array<Job>;
    training?: Array<Training>;
    position?: string;

    constructor(name: Name,
                email: string,
                hired_as?: string,
                begin_at?: Date,
                state?: string,
                skills?: Array<HardSkill>,
                currentProject?: Project,
                projects?: Array<Project>,
                careers?: Array<Job>,
                training?: Array<Training>,
                position?: string
    ) {
        this.name = name;
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
        return this.name.first + ', ' + this.name.last + ', ' + this.state + ', ' + this.email;
    }
}

const consultantConverter = {
    toFirestore: (consultant: Consultant) => {
        return {
            name: consultant.name,
            roles: consultant.roles,
            email: consultant.email,
            hired_as: consultant.hired_as,
            begin_at: consultant.begin_at,
            state: consultant.state,
            skills: consultant.skills,
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
            data.roles,
            data.email,
            data.hired_as,
            data.begin_at,
            data.state,
            data.skills,
            data.currentProject,
            data.projects,
            data.careers,
            data.training);
    }
};
const getConsultant = async (uid: string) => {
    const consultantRef = doc(db, 'consultants', uid).withConverter(consultantConverter);
    const consultantSnap = await getDoc(consultantRef);
    if (consultantSnap.exists()) {
        const consultant = consultantSnap.data();
        console.log(consultant.toString());
        return consultant;
    } else {
        console.log("No such consultant!");
        return null;
    }
}
const createConsultantAccount = async (credentials: Credentials, consultant: Consultant) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        await sendEmailVerification(userCredential.user);
        consultant.email = credentials.email;
        const usersRef = collection(db, 'consultants');
        const newConsultant = await setDoc(doc(usersRef, userCredential.user.uid), consultant);
    } catch (error) {
        console.log(error)
    }
}
const consultantLogin = async (credentials: Credentials) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        if(userCredential.user.emailVerified){
          return await getConsultant(userCredential.user.uid);
        } else {
          await sendEmailVerification(userCredential.user);
          return null;
        }
    }   catch (error) {
      await signOut(auth);
        console.log(error)
    }
}
const updateConsultant = async (uid: string, updatedData: any) => {
    const consultantRef = doc(db, 'consultants', uid);
    await updateDoc(consultantRef, updatedData)
}

const addSkills = async (newSkills: Array<HardSkill> ) => {
    const consultantUid = auth.currentUser?.uid;
    if(consultantUid) {
        const consultantRef = doc(db, 'consultants', consultantUid);
        await updateDoc(consultantRef, {
            skills: arrayUnion(...newSkills)
        });
    }
}
const removeSkills = async (newSkills: Array<HardSkill> ) => {
    const consultantUid = auth.currentUser?.uid;
    if(consultantUid) {
        const consultantRef = doc(db, 'consultants', consultantUid);
        await updateDoc(consultantRef, {
            skills: arrayRemove(...newSkills)
        });
    }
}

const getConsultants = async () => {
    const querySnapshot = await getDocs(collection(db, 'consultants').withConverter(consultantConverter));
    const allConsultants: Array<{
        uid: string,
        consultant: Consultant
    }> = [];
    querySnapshot.forEach((doc) => {
        allConsultants.push(
            {
                uid: doc.id,
                consultant: doc.data()
            }
        );
    });
    return allConsultants;
}
export {
    createConsultantAccount,
    consultantLogin, //return Consultant if OK, null if emails is not verified, in error case the value will be undefined
    getConsultant,
    updateConsultant,
    getConsultants, // return type: Array<{uid: string, consultant: Consultant}>
    addSkills,
    removeSkills
}
