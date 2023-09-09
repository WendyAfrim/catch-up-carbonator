import {HardSkill, PROJECT_STATE} from 'src/firebase/Types';
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';
import {db} from 'src/firebase/index';

export type CreateProjectOutput = {
  name: string,
  client: string,
  description: string,
  start_at?: string,
  end_at?: string,
  skillsName?: string,
  state?: PROJECT_STATE,
  position: string,
  skills: Array<HardSkill>
}

export class Project {
  name: string;
  client: string;
  start_at: Date;
  end_at: Date;
  description: string;
  skills: Array<HardSkill>;
  position: string;
  state: PROJECT_STATE;

  constructor(name: string,
              client: string,
              start_at: Date,
              end_at: Date,
              description: string,
              skills: Array<HardSkill>,
              position: string,
              state: PROJECT_STATE,
  ) {
    this.name = name;
    this.client = client;
    this.start_at = start_at;
    this.end_at = end_at;
    this.description = description;
    this.skills = skills;
    this.position = position;
    this.state = state;
  }

  toString() {
    return this.name + ', ' + this.description + ', ' + this.client;
  }

  public skillsName(): string {
    if (this.skills) {
      return this.skills?.map((skill) => {
        return skill.name
      }).join()
    } else {
      return ''
    }
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
      position: project.position,
      state: project.state
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
      data.position,
      data.state);
  }
};

const getProject = async (uid: string) => {
  const projectRef = doc(db, 'projects', uid).withConverter(projectConverter);
  const projectSnap = await getDoc(projectRef);
  if (projectSnap.exists()) {
    const project: Project = projectSnap.data();
    return project;
  } else {
    console.log('No such project!');
  }
}


const createProject = async (project: Project) => {
  const projectsRef = collection(db, 'projects').withConverter(projectConverter);
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
        state: project.state,
        position: project.position,
        skillsName: project.skills?.map((skill) => {
          return skill.name
        }).join(),
        skills: project.skills
      }
    )
  })
  console.log('in ', allProjectsOutput)
  return allProjectsOutput;
}

export {
  createProject,
  getProject,
  getProjects,
  getProjectsOutput
}
