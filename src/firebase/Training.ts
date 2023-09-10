import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';
import {db} from 'src/firebase/index';

export class Training {
  name: string;
  link: string;
  level: string;

  constructor(name: string,
              level: string,
              link: string,
  ) {
    this.name = name;
    this.level = level;
    this.link = link;
  }

  toString() {
    return this.name + ', ' + this.level + ', ' + this.link;
  }
}

const trainingConverter = {
  toFirestore: (training: Training) => {
    return {
      name: training.name,
      level: training.level,
      link: training.link
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Training(
      data.name,
      data.level,
      data.link);
  }
};
const createTraining = async (training: Training) => {
  const trainingsRef = collection(db, 'trainings').withConverter(trainingConverter);
  await setDoc(doc(trainingsRef, training.name), training);
}
const getTraining = async (uid: string) => {
  const trainingRef = doc(db, 'trainings', uid).withConverter(trainingConverter);
  const trainingSnap = await getDoc(trainingRef);
  if (trainingSnap.exists()) {
    const training = trainingSnap.data();
    console.log(trainingSnap.toString());
    return trainingSnap;
  } else {
    console.log('No such training!');
  }
}
const getTrainings = async () => {
  const querySnapshot = await getDocs(collection(db, 'trainings').withConverter(trainingConverter));
  const allTraining: Array<Training> = [];
  querySnapshot.forEach((doc) => {
    allTraining.push(doc.data());
  });
  return allTraining;
}

export {
  createTraining,
  getTraining,
  getTrainings,
  trainingConverter
}
