import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from 'firebase/firestore'
import {db, auth} from "src/firebase/index";

enum Level {
  Junior = "junior",
  Confirmed = "confirmé",
  Senior = "senior"
}
type Name = {
  first: string,
  last: string
}
export type Credentials = {
  email: string,
  password: string
}
type SoftSkill = {
  name: string
}
type HardSkill = {
  name: string,
  level: Level,
  nb_exp: number
}

type Skills = {
  hard?: Array<HardSkill>,
  soft?: Array<SoftSkill>
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

export type Consultant = {
  name?: Name,
  email: string | null,
  hired_as?: Date,
  begin_at?: Date,
  state?: string,
  skills?: Skills ,
  currentProject?: Project,
  projects?: Array<Project>
  careers?: Array<Job>
  training?: Array<Training>
}


const createConsultantAccount = async (credentials: Credentials, consultant:Consultant) => {
  try {

    const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    consultant.email = userCredential.user.email
    const newConsultant = await setDoc(doc(db, "users", userCredential.user.uid), consultant);
    console.log('userCredential: ',userCredential.user)
  } catch (error) {
    console.log(error)
  }
}

const loginEmailPassword = async (credentials: Credentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    console.log(userCredential.user)
  } catch (error) {
    console.log(error)
  }
}

export {
  createConsultantAccount,
  loginEmailPassword,

}
