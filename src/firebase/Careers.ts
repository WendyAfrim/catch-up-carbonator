import {collection, doc, DocumentData, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore';
import {db} from 'src/firebase/index';

type Goal = {
  name: string
}

export class Career {
  position: string;
  location: string;
  description: string;
  prerequisite: string;
  goals: Array<Goal>;

  constructor(
    position: string,
    location: string,
    description: string,
    prerequisite: string,
    goals: Array<Goal>
  ) {
    this.position = position;
    this.location = location;
    this.description = description;
    this.prerequisite = prerequisite;
    this.goals = goals;

  }

  toString() {
    return this.position + ', ' + this.location + ', ' + this.description + ',' + this.prerequisite;
  }
}

const careerConverter = {
  toFirestore: (career: Career) => {
    return {
      position: career.position,
      location: career.location,
      description: career.description,
      goals: career.goals
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Career(
      data.position,
      data.location,
      data.description,
      data.prerequisite,
      data.goals
    );
  }
};
const createCareer = async (career: Career) => {
  const careersRef = collection(db, 'careers');
  await setDoc(doc(careersRef, career.position), career).then((response) => {
    return response;
  }).catch((error) => {
    throw error;
  });
}
const getCareer = async (uid: string) => {
  const careerRef = doc(db, 'careers', uid).withConverter(careerConverter);
  const careerSnap = await getDoc(careerRef);
  if (careerSnap.exists()) {
    return careerSnap.data();
  } else {
    console.log('No such career!');
  }
}
const updateCareer = async (uid: string, updatedData: any) => {
  const careerRef = doc(db, 'careers', uid);
  await updateDoc(careerRef, updatedData)
}
const getCareers = async () => {
  const querySnapshot = await getDocs(collection(db, 'careers'));
  const allCareers: Array<Career> = [];
  querySnapshot.forEach((doc) => {
    allCareers.push(<Career>doc.data());
  });
  return allCareers;
}

export {
  createCareer,
  getCareer,
  getCareers,
  updateCareer
}
