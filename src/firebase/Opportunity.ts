import {collection, doc, DocumentData, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase/index";

type Skill = {
  name : string
}

export class Opportunity {
  post: string;
  client: string;
  description: string;
  start_at: Date;
  leadTech: string;
  skills: Array<Skill>
  actions: string;
  constructor (
      post: string,
      client: string,
      description: string,
      start_at: Date,
      leadTech: string,
      skills: Array<Skill>,
      actions: string,
  ) {
    this.post = post;
    this.client = client;
    this.description = description;
    this.skills = skills;
    this.leadTech = leadTech;
    this.start_at = start_at;
    this.actions = actions;

  }
  toString() {
    return this.post + ', ' + this.client + ', ' + this.description;
  }
}

const opportunityConverter = {
  toFirestore: (opportunity: Opportunity) => {
    return {
      post: opportunity.post,
      client: opportunity.client,
      description: opportunity.description,
      skills: opportunity.skills,
      leadTech: opportunity.leadTech,
      start_at: opportunity.start_at,
      actions: opportunity.actions
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Opportunity(
        data.post,
        data.client,
        data.description,
        data.skills,
        data.leadTech,
        data.start_at,
        data.actions,

    );
  }
};
const createOpportunity = async (opportunity:Opportunity) => {
    const opportunitiesRef = collection(db, 'opportunities');
    await setDoc(doc(opportunitiesRef, opportunity.post), opportunity);
}
const getOpportunity = async (uid:string) => {
  const opportunityRef = doc(db, 'opportunities', uid).withConverter(opportunityConverter);
  const opportunitySnap = await getDoc(opportunityRef);
  if(opportunitySnap.exists()){
    return opportunitySnap.data();
  } else {
    console.log("No such opportunity!");
  }
}
const updateOpportunity = async (uid: string, updatedData: any) => {
  const opportunityRef = doc(db, 'opportunities', uid);
  await updateDoc(opportunityRef, updatedData)
}
const getOpportunities = async () => {
  const querySnapshot = await getDocs(collection(db, 'opportunities'));
  const allOpportunity: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    allOpportunity.push(doc.data());
  });
  return allOpportunity;
}

export {
  createOpportunity,
  getOpportunity,
  getOpportunities,
  updateOpportunity
}
