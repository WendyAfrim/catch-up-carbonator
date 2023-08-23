import {Skills} from "src/firebase/Types";

export class Project {
  name: string;
  client: string;
  begin_at: Date;
  end_at: Date;
  description: string;
  skills: Skills;
  need: string;
  leadTech: string;
  constructor (name: string,
               client: string,
               begin_at: Date,
               end_at: Date,
               description: string,
               skills: Skills,
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
