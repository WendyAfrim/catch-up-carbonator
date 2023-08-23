import {Credentials, CustomErrorTypes, LogInResponse, ROLE} from 'src/firebase/Types';
import {sendEmailVerification, signInWithEmailAndPassword, signOut, AuthError} from 'firebase/auth';
import {auth, db} from 'src/firebase/index';
import {Consultant, getConsultant} from 'src/firebase/Consultant';
import {doc, getDoc} from 'firebase/firestore';
import {getHR, HR} from 'src/firebase/HR';
import {getLeadTech, LeadTech} from 'src/firebase/LeadTech';
import firebase from 'firebase/compat';
import FirestoreError = firebase.firestore.FirestoreError;
import {inject} from 'vue';
import {ref} from 'vue';
//
// const store = inject<{
//   userDetails: Consultant | HR | LeadTech | null,
//     userUid: string
// }>('store');
// const stat1 = inject('state1');
class ROLES {
  roles: ROLE;

  constructor(
    roles: ROLE,
  ) {
    this.roles = roles;
  }

  toString() {
    return this.roles;
  }

  getRoles() {
    return this.roles;
  }
}

const roleConverter = {
  toFirestore: (roles: ROLES) => {
    return {
      roles: roles.roles,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new ROLES(
      data.roles,
    );
  }
};
const getUserRoles = async (uid: string) => {
  const roleRef = doc(db, 'roles', uid).withConverter(roleConverter);
  const roleSnap = await getDoc(roleRef);
  if (roleSnap.exists()) {
    return roleSnap.data();
  } else {
    console.log(`User: ${uid} has no role`);
    return null;
    // return CustomErrorTypes.USER_HAS_NO_ROLE;
  }
}
const getUser = async (uid: string) => {
  const userRole = await getUserRoles(uid);
  if (userRole instanceof ROLES) {
    switch (userRole.getRoles()) {
      case ROLE.Consultant:
        return await getConsultant(uid);
      case ROLE.HR:
        return await getHR(uid)
      case ROLE.LeadTech:
        return await getLeadTech(uid)
    }
  }
  return null;
}
const userLogIn = async (credentials: Credentials) => {

  const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  if (true) { //userCredential.user.emailVerified) {
    return getUser(userCredential.user.uid);
  } else {
    await sendEmailVerification(userCredential.user);
    return CustomErrorTypes.USER_EMAIL_NOT_VALIDATED;
  }

}

export {
  userLogIn,
  getUser
}
