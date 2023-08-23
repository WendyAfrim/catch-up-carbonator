
export enum Level {
  Junior = "junior",
  Confirmed = "confirmé",
  Senior = "senior"
}

export enum ROLE {
  Consultant = 'Consultant',
  HR = 'RH',
  LeadTech = 'LeadTech'
}

export type SoftSkill = {
  name: string
}
export type HardSkill = {
  name: string,
  level: Level,
  nb_exp: number
}

export type Skills = {
  hard?: Array<HardSkill>,
  soft?: Array<SoftSkill>
}

