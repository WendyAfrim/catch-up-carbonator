import {collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where} from 'firebase/firestore'
import {db} from 'src/firebase/index';

export class Challenge {
  name: string;
  description: string;
  start_at: string;
  delay: string;
  gifts: string;
  techLead: string; //LeadTech
  isActive: boolean;

  //participants: Array<Consultant>
  constructor(
    name: string,
    description: string,
    start_at: string,
    delay: string,
    gifts: string,
    techLead: string,
    isActive: boolean
  ) {
    this.name = name;
    this.description = description;
    this.start_at = start_at;
    this.delay = delay;
    this.gifts = gifts;
    this.techLead = techLead;
    this.isActive = isActive;
  }

  toString() {
    return this.name + ', ' + this.description + ', ' + this.gifts + ', ' + this.techLead;
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
      techLead: challenge.techLead,
      isActive: challenge.isActive
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
      data.techLead,
      data.isActive
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
export {
  createChallenge,
  getChallenge,
  getActiveChallenge,
  updateChallenge,
  getChallenges,
}
