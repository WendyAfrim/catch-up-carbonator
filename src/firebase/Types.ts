import {Consultant} from 'src/firebase/Consultant';
import {LeadTech} from 'src/firebase/LeadTech';
import {HR} from 'src/firebase/HR';
import {Project} from 'src/firebase/Project';

export enum Level {
  Junior = 'Junior',
  Confirmed = 'Confirmé',
  Senior = 'Sénior'
}

export type Credentials = {
  email: string,
  password: string
}

export enum ROLE {
  Consultant = 'Consultant',
  HR = 'RH',
  LeadTech = 'LeadTech'
}

export enum PROJECT_STATUS {
  New = 'new',
  In_Progress = 'in_progress',
  FeedBack = 'feedback'
}

export type HardSkill = {
  name: string,
  level: Level,
  nb_exp: number
}

export enum CustomErrorTypes {
  NO_SUCH_CONSULTANT,
  USER_HAS_NO_ROLE,
  USER_EMAIL_NOT_VALIDATED,
}

export type LogInResponse = {
  user?: Consultant | LeadTech | HR | null,
  status?: number | CustomErrorTypes
}
export enum TRAINING_STATUS {
  STARTED = 'Started',
  FINISHED = 'FINISHED'
}


export type ConsultantTraining = {
  name?: string,
  siStarted: TRAINING_STATUS
}

export type ConsultantProject = Pick<Project, 'name' | 'client' | 'start_at' | 'end_at'> //'name' | 'start_at' | 'end_at' | 'position' | 'client' | 'feedback' | 'leadTech'>;
export type LeadTechProject  = Pick<Project, 'name' | 'client' | 'start_at' | 'end_at' | 'team' > //'name' | 'start_at' | 'end_at' | 'position' | 'client' | 'feedback' | 'leadTech'>;

export type ProjectConsultant = Pick<Consultant, 'firstname' | 'lastname' | 'email'| 'position'>
export type LeadTechConsultant = Pick<Consultant, 'firstname' | 'lastname' | 'email'>

