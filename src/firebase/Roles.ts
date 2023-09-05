import {doc, getDoc} from "firebase/firestore";
import {db} from "src/firebase/index";
import {ROLE} from "src/firebase/Types";
import {Consultant} from "src/firebase/Consultant";

export class Roles {
  roles: ROLE;
  constructor (
    roles: ROLE
  ) {
    this.roles = roles;
  }
  toString() {
    return this.roles;
  }
}
const roleConverter = {
  toFirestore: (roles: Roles) => {
    return {
      roles: roles.roles
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new Roles(
      data.roles
    );
  }
};
const getRoles = async (uid:string) =>{
  const roleRef = doc(db, 'roles', uid).withConverter(roleConverter);
  const roleSnap = await getDoc(roleRef);
  if(roleSnap.exists()){
    const roles: Roles = roleSnap.data();
    return roles;
  } else {
    console.log("No such Roles!");
    return null;
  }
}

export {
  getRoles
}
