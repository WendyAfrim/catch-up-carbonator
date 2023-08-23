
export enum Level {
  Junior = "junior",
  Confirmed = "confirmé",
  Senior = "senior"
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
