import { defineStore } from 'pinia';
import {Consultant} from 'src/firebase/Consultant';
import {LeadTech} from 'src/firebase/LeadTech';
import {Roles, getRoles} from 'src/firebase/Roles';
import {HR} from 'src/firebase/HR';
import {ref} from 'vue';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from 'src/firebase';
import {getUser} from 'src/firebase/LogIn';
import {useRouter} from "vue-router";
import {ROLE} from "src/firebase/Types";
export const currentUserStore = defineStore('currentUser', ()=>{
  const currentUser = ref<Consultant | HR | LeadTech | null>(null);
  const uid= ref<string | null>(null);
  const roles = ref<Roles | null>(null);
  const router = useRouter();
  const logout = async () => {
    await signOut(auth);
    uid.value = null;
    currentUser.value = null;
    roles.value = null;
    return router.push({path: '/'});
  };
  const monitorAuthState = async () => {
    return onAuthStateChanged(auth, async user => {
      if (user) {
        uid.value = user.uid;
        currentUser.value = await getUser(user.uid);
        roles.value = await getRoles(user.uid);
        await redirectRoles();
      } else {
        await logout();
      }
    })
  };
  const redirectRoles = async () => {
    switch (roles.value?.roles) {
      case ROLE.HR:
        return router.push({path: '/Rh'});
      case ROLE.Consultant:
        return router.push({path: '/Consultant'});
      case ROLE.LeadTech:
        return router.push({path: '/LeadTech'});
      default:
        return router.push({path: '/'});
    }
  };
  return {
    currentUser,
    uid,
    roles,
    monitorAuthState,
    redirectRoles,
    logout
  }
});
