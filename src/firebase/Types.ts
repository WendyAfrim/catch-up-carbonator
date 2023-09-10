import {Consultant} from 'src/firebase/Consultant';
import {LeadTech} from 'src/firebase/LeadTech';
import {HR} from 'src/firebase/HR';

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

// export type SoftSkill = {
//   name: string
// }
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

export enum PROJECT_STATE {
  New = 'new',
  In_progress = 'in_progress',
  Feedback = 'feedback'
}

