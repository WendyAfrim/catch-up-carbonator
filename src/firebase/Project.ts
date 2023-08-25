import {HardSkill} from "src/firebase/Types";
import {collection, doc, DocumentData, getDoc, getDocs, setDoc} from "firebase/firestore";
import {db} from "src/firebase/index";

export class Project {
  name: string;
  client: string;
  begin_at: Date;
  end_at: Date;
  description: string;
  skills: Array<HardSkill>;
  need: string;
  leadTech: string;
  constructor (name: string,
               client: string,
               begin_at: Date,
               end_at: Date,
               description: string,
               skills: Array<HardSkill>,
               need: string,
               leadTech: string,
               ) {
    this.name = name;
    this.client = client;
    this.begin_at = begin_at;
    this.end_at = end_at;
    this.description = description;
    this.skills = skills;
    this.need = need;
    this.leadTech = leadTech;
  }
  toString() {
    return this.name + ', ' + this.description + ', ' + this.client;
  }
}

const projectConverter = {
  toFirestore: (project: Project) => {
    return {
      name: project.name,
      client: project.client,
      begin_at: project.begin_at,
      end_at: project.end_at,
      description: project.description,
      skills: project.skills,
      need: project.need,
      leadTech: project.leadTech
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Project(
      data.name,
      data.client,
      data.begin_at,
      data.end_at,
      data.description,
      data.skills ,
      data.need,
      data.leadTech);
  }
};

const getProject = async (uid:string) => {
  const projectRef = doc(db, 'projects', uid).withConverter(projectConverter);
  const projectSnap = await getDoc(projectRef);
  if(projectSnap.exists()){
    const project = projectSnap.data();
    console.log(projectSnap.toString());
    return project;
  } else {
    console.log("No such project!");
  }
}

const createProject = async (project:Project) => {
    const projectsRef = collection(db, 'projects');
    await setDoc(doc(projectsRef, project.name), project);
}

const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, 'projects'));
  const allProject: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allProject.push(doc.data());
  });
  return allProject;
}

export {
  createProject,
  getProject,
  getProjects
}
