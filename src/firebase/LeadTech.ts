import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import {collection, doc, DocumentData, getDoc, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {auth, db} from "src/firebase/index";
import {ROLE, HardSkill} from "src/firebase/Types";


type Name = {
    first: string,
    last: string
}
export type Credentials = {
    email: string,
    password: string
}
export class LeadTech {
    name: Name;
    email?: string;
    begin_at?: Date;
    state?: string;
    skills?: Array<HardSkill>;
    roles?: ROLE;

    constructor(
        name: Name,
        email: string,
        begin_at?: Date,
        state?: string,
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
        return this.name.first + ', ' + this.name.last + ', ' + this.state + ', ' + this.email;
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
const getLeadTech = async (uid: string) => {
    const leadTechRef = doc(db, 'leadTechs', uid).withConverter(leadTechConverter);
    const leadTechSnap = await getDoc(leadTechRef);
    if (leadTechSnap.exists()) {
        const leadTech = leadTechSnap.data();
        return leadTech;
    } else {
        console.log("No such leadTech!");
    }
}
const createLeadTechAccount = async (credentials: Credentials, leadTech: LeadTech) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        if (userCredential?.user?.email) {
            await sendEmailVerification(userCredential.user)
            leadTech.email = userCredential?.user?.email;
            const usersRef = collection(db, 'leadTechs');
            const newLeadTech = await setDoc(doc(usersRef, userCredential.user.uid), leadTech);
        }
    } catch (error) {
        console.log(error)
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

const addSkills = async (newSkills: Array<HardSkill> ) => {
    const leadTechUid = auth.currentUser?.uid;
    if(leadTechUid) {
        const leadTechRef = doc(db, 'leadTechs', leadTechUid);
        await updateDoc(leadTechRef, {
            skills: arrayUnion(...newSkills)
        });
    }
}
const removeSkills = async (newSkills: Array<HardSkill> ) => {
    const leadTechUid = auth.currentUser?.uid;
    if(leadTechUid) {
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
export {
    createLeadTechAccount,
    leadTechLogin,
    getLeadTech,
    updateLeadTech,
    getLeadTechs,
    addSkills,
    removeSkills
}
