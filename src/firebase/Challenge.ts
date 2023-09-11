import {collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, arrayUnion} from 'firebase/firestore'
import {db} from 'src/firebase/index';
import {ProjectConsultant} from 'src/firebase/Types';
import {Consultant, consultantConverter} from 'src/firebase/Consultant';

export class Challenge {
  name: string;
  description: string;
  start_at: Date;
  delay: Date;
  gifts: string;
  isActive: boolean;
  participants?: Array<ProjectConsultant>

  constructor(
    name: string,
    description: string,
    start_at: Date,
    delay: Date,
    gifts: string,
    isActive: boolean,
    participants?: Array<ProjectConsultant>
  ) {
    this.name = name;
    this.description = description;
    this.start_at = start_at;
    this.delay = delay;
    this.gifts = gifts;
    this.isActive = isActive;
    this.participants = participants;
  }

  toString() {
    return this.name + ', ' + this.description + ', ' + this.gifts + ', ';
  }
}

const challengeConverter = {
  toFirestore: (challenge: Challenge) => {
    return {
      name: challenge.name,
      description: challenge.description,
      start_at: challenge.start_at,
      delay: challenge.delay,
      gifts: challenge.gifts,
      isActive: challenge.isActive,
      participants: challenge.participants
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Challenge(
      data.name,
      data.description,
      data.start_at,
      data.delay,
      data.gifts,
      data.isActive,
      data.participants
    );
  }
};
const createChallenge = async (challenge: Challenge) => {
  const trainingsRef = collection(db, 'challenges').withConverter(challengeConverter);
  await setDoc(doc(trainingsRef, challenge.name), challenge);
}
const getChallenge = async (uid: string) => {
  const challengeRef = doc(db, 'challenges', uid).withConverter(challengeConverter);
  const challengeSnap = await getDoc(challengeRef);
  if (challengeSnap.exists()) {
    const challenge = challengeSnap.data();
    console.log(challenge.toString());
    return challenge;
  } else {
    console.log('No such challenge!');
  }
}
const updateChallenge = async (uid: string, updatedData: any) => {
  const challengeRef = doc(db, 'challenges', uid);
  await updateDoc(challengeRef, updatedData)
}

const getActiveChallenge = async () => {
  const q = query(collection(db, 'challenges'), where('isActive', '==', true));
  const querySnapshot = await getDocs(q.withConverter(challengeConverter));
  const allChallenges: Array<Challenge> = [];
  querySnapshot.forEach((doc) => {
    allChallenges.push(doc.data());
  });
  return allChallenges;
}
const getChallenges = async () => {
  const querySnapshot = await getDocs(collection(db, 'challenges').withConverter(challengeConverter));
  const allChallenges: Array<Challenge> = [];
  querySnapshot.forEach((doc) => {
    allChallenges.push(doc.data());
  });
  return allChallenges;
}

const participate = async (consultantUid: string, challengeUid: string) => {
  const consultantRef = doc(db, 'consultants', consultantUid).withConverter(consultantConverter);
  const consultantSnap = await getDoc(consultantRef);
  if (!consultantSnap.exists()) {
    console.error(`Consultant: ${consultantUid} not exist`);
    return null;
  }
  const consultant: Consultant = consultantSnap.data();
  const challengeRef = doc(db, 'challenges', challengeUid).withConverter(challengeConverter);
  const challengeSnap = await getDoc(challengeRef);
  if (!challengeSnap.exists()) {
    console.error(`Project: ${challengeUid} not exist`);
    return null;
  }
  console.log(challengeRef);
  return await updateDoc(challengeRef, {
    participants: arrayUnion({
      firstname: consultant.firstname,
      lastname: consultant.lastname,
      email: consultant.email,
      position: consultant.position
    })
  }).catch((error) => {
    throw error;
  });
}

export {
  createChallenge,
  getChallenge,
  getActiveChallenge,
  updateChallenge,
  getChallenges,
  participate
}
