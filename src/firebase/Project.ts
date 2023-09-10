import {HardSkill, LeadTechConsultant, PROJECT_STATUS, ProjectConsultant} from 'src/firebase/Types';
import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from 'firebase/firestore';
import {db} from 'src/firebase/index';


export type CreateProjectOutput = {
  name: string,
  client: string,
  description: string,
  start_at?: string,
  end_at?: string,
  leadTech?: LeadTechConsultant,
  position?: string,
  team?: Array<ProjectConsultant>,
  status?: PROJECT_STATUS
  // clientFeedBack?: string
  skillsName?: string,
  skills?: Array<HardSkill>
}

export class Project {
  name: string;
  client: string;
  start_at: Date;
  end_at: Date;
  description: string;
  skills?: Array<HardSkill>;
  leadTech?: LeadTechConsultant;
  position?: string;
  team?: Array<ProjectConsultant>
  clientFeedBack?: string
  status?: PROJECT_STATUS


  constructor(name: string,
              client: string,
              start_at: Date,
              end_at: Date,
              description: string,
              skills?: Array<HardSkill>,
              leadTech?: LeadTechConsultant,
              position?: string,
              team?: Array<ProjectConsultant>,
              clientFeedBack?: string,
              status?: PROJECT_STATUS
  ) {
    this.name = name;
    this.client = client;
    this.start_at = start_at;
    this.end_at = end_at;
    this.description = description;
    this.skills = skills;
    this.leadTech = leadTech;
    this.position = position;
    this.team = team;
    this.clientFeedBack = clientFeedBack;
    this.status = status

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
      start_at: project.start_at,
      end_at: project.end_at,
      description: project.description,
      skills: project.skills,
      leadTech: project.leadTech,
      position: project.position,
      team: project.team,
      clientFeedBack: project.clientFeedBack,
      status: project.status
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Project(
      data.name,
      data.client,
      data.start_at,
      data.end_at,
      data.description,
      data.skills,
      data.leadTech,
      data.position,
      data.team,
      data.clientFeedBack,
      data.status
    );
  }
};

const getProject = async (uid: string) => {
  const projectRef = doc(db, 'projects', uid).withConverter(projectConverter);
  const projectSnap = await getDoc(projectRef);
  if (projectSnap.exists()) {
    const project: Project = projectSnap.data();
    return project;
  } else {
    console.error('No such project!');
  }
}


const createProject = async (project: Project) => {
  const projectsRef = collection(db, 'projects');
  const projectRef = doc(projectsRef, project.name);
  const projectSnap = await getDoc(projectRef);
  if (projectSnap.exists()) {
    console.error('This project is already exist');
    return null;
  }
  project.status = PROJECT_STATUS.New;
  return await setDoc(doc(projectsRef, project.name), project);
}

const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, 'projects').withConverter(projectConverter));
  const allProject: Array<Project> = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allProject.push(doc.data());
  });
  return allProject;
}

const getProjectsOutput = async () => {
  const allProjects: Array<Project> = await getProjects();
  const allProjectsOutput: Array<CreateProjectOutput> = [];
  allProjects.map((project) => {
    allProjectsOutput.push(
      {
        name: project.name,
        client: project.client,
        description: project.description,
        start_at: project.start_at?.toString(),
        end_at: project.end_at?.toString(),
        position: project.position,
        leadTech: project.leadTech,
        skillsName: project.skills?.map((skill: HardSkill) => {
          return skill.name
        }).join(),
        skills: project.skills,
        team: project.team

      }
    )
  })
  console.log('in ', allProjectsOutput)
  return allProjectsOutput;
}

const addFeedBack = async (projectUid: string, clientFeedBack: string) => {
  const projectRef = doc(db, 'projects', projectUid).withConverter(projectConverter);
  const projectSnap = await getDoc(projectRef);
  if (!projectSnap.exists()) {
    console.error(`Project: ${projectUid} not exist`);
    return null;
  }
  const project: Project = projectSnap.data();
  await updateDoc(projectRef, {
    clientFeedBack: clientFeedBack,
    status: PROJECT_STATUS.FeedBack
  });
}

export {
  createProject,
  getProject,
  getProjects,
  getProjectsOutput,
  projectConverter
}
