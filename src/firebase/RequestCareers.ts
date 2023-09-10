import {collection, doc, DocumentData, getDoc, getDocs, addDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase/index";



export class RequestCareer {
  careerUid: string;
  consultantUid: string;
  isAccepted: boolean;
  constructor (
      careerUid: string,
      consultantUid: string,
      isAccepted: boolean,
  ) {
    this.careerUid = careerUid;
    this.consultantUid = consultantUid;
    this.isAccepted = isAccepted;

  }
  toString() {
    return this.careerUid + ', ' + this.consultantUid + ', ' + this.isAccepted;
  }
}

const requestCareerConverter = {
  toFirestore: (requestCareer: RequestCareer) => {
    return {
      careerUid: requestCareer.careerUid,
      consultantUid: requestCareer.consultantUid,
      isAccepted: requestCareer.isAccepted,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new RequestCareer(
        data.careerUid,
        data.consultantUid,
        data.isAccepted,
    );
  }
};
const createRequestCareer = async (requestCareer:RequestCareer) => {
    const requestCareersRef = collection(db, 'requestCareers');
    await addDoc(requestCareersRef, requestCareer);
}
const getRequestCareer = async (uid:string) => {
  const requestCareerRef = doc(db, 'requestCareers', uid).withConverter(requestCareerConverter);
  const requestCareerSnap = await getDoc(requestCareerRef);
  if(requestCareerSnap.exists()){
    return requestCareerSnap.data();
  } else {
    console.log("No such requestCareer!");
  }
}
const updateRequestCareer = async (uid: string, updatedData: any) => {
  const requestCareerRef = doc(db, 'requestCareers', uid);
  await updateDoc(requestCareerRef, updatedData)
}

const acceptConsultantCareer = async (requestCareerUid: string) => {
  const requestCareerRef = doc(db, 'requestCareers', requestCareerUid).withConverter(requestCareerConverter);
  const requestCareerSnap = await getDoc(requestCareerRef);
  if (!requestCareerSnap.exists()) {
    console.error(`Project: ${requestCareerUid} not exist`);
    return null;
  }
  await updateDoc(requestCareerRef, {
    isAccepted: true
  });
}

const getRequestCareers = async () => {
  const querySnapshot = await getDocs(collection(db, 'requestCareers'));
  const allRequestCareer: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    allRequestCareer.push(doc.data());
  });
  return allRequestCareer;
}

export {
  createRequestCareer,
  getRequestCareer,
  getRequestCareers,
  updateRequestCareer,
  acceptConsultantCareer
}
