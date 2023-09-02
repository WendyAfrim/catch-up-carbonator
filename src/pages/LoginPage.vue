<template>
    <q-card class="q-pa-lg q-ma-aut">
        log in
        <q-card-section>
            <q-form class="q-gutter-lg-md">
                <q-input filled label="Username" v-model="username"></q-input>
                <q-input filled label="Password" v-model="password"></q-input>
            </q-form>
            <q-btn class="q-mt-lg" label="Login" @click="loginForm"></q-btn>
        </q-card-section>
    </q-card>
    <q-card class="q-pa-lg q-ma-aut">
        sign in
        <q-card-section>
            <q-form class="q-gutter-lg-md">
                <q-input filled label="Username" v-model="username"></q-input>
                <q-input filled label="Password" v-model="password"></q-input>
            </q-form>
            <q-btn class="q-mt-lg" label="SignIn" @click="signInForm"></q-btn>
        </q-card-section>
    </q-card>
    <q-btn class="q-mt-lg" label="logout" @click="signOut"></q-btn>
    <q-btn class="q-mt-lg" label="update" @click="updateCurrentConsultant"></q-btn>
    <!--      <q-btn class="q-mt-lg" label="create project" @click="createNewProject"></q-btn>-->
    <!--      <q-btn class="q-mt-lg" label="get project" @click="getOneProject"></q-btn>-->
    <!--      <q-btn class="q-mt-lg" label="get projects" @click="getAllProjects"></q-btn>-->
    <!--      <q-btn class="q-mt-lg" label="get consultants" @click="getAllConsultants"></q-btn>-->
    <!--      <q-btn class="q-mt-lg" label="add skills" @click="addSkillsToConsultant"></q-btn>-->
    <!--      <q-btn class="q-mt-lg" label="remove skills" @click="removeSkillsToConsultant"></q-btn>-->
    <q-card>
        <q-btn class="q-mt-lg" label="create challenge" @click="createNewChallenge"></q-btn>
        <q-btn class="q-mt-lg" label="get challenges" @click="getAllChallenges"></q-btn>
        <q-btn class="q-mt-lg" label="get challenge" @click="getOneChallenge"></q-btn>
        <q-btn class="q-mt-lg" label="get Active challenges" @click="getAllActiveChallenges"></q-btn>
    </q-card>
    <q-card>
        <!--        <q-btn class="q-mt-lg" label="create training" @click="createNewTraining"></q-btn>-->
        <!--        <q-btn class="q-mt-lg" label="get project" @click="getOneTraining"></q-btn>-->
        <!--        <q-btn class="q-mt-lg" label="get projects" @click="getAllTrainings"></q-btn>-->
    </q-card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { auth, logout, monitorAuthState, } from '../firebase'
import {
    Consultant,
    consultantLogin,
    createConsultantAccount,
    Credentials,
    getConsultants,
    updateConsultant,
    addSkills,
    removeSkills
} from '../firebase/Consultant'
import { createProject, getProject, getProjects, Project } from '../firebase/Project'
import { Training, createTraining, getTraining, getTrainings } from '../firebase/Training'
import { Challenge, createChallenge, getActiveChallenge, getChallenge, getChallenges, updateChallenge } from '../firebase/Challenge'

import { HardSkill, Level, ROLE } from "src/firebase/Types";

const username = ref(null)
const password = ref(null)
async function loginForm() {
    if (!username.value || !password.value) {
        console.log('error')
    } else {
        const credential: Credentials = {
            email: username.value,
            password: password.value
        }
        console.log(`username: ${username.value}, password: ${password.value}`)
        const consultant = await consultantLogin(credential);
        if (consultant === null) {
            //TODO redirect to validate email page
            console.log('email is not verified');
        }
        if (consultant === undefined) {
            console.log('login error, wrong email or password ');
        }
        if (consultant) {
            console.log('from login component ', consultant.toString())
        }
    }
}
function signInForm() {
    if (!username.value || !password.value) {
        console.log('error')
    } else {
        const credential: Credentials = {
            email: username.value,
            password: password.value
        }
        const consultant: Consultant = {
            name: { first: 'Kinan', last: 'BSHARA' }
        }
        console.log(`credential: ${credential}`)
        createConsultantAccount(credential, consultant);
    }
}
function updateCurrentConsultant() {
    const currentUser = auth.currentUser;
    if (currentUser?.uid) {
        updateConsultant(
            currentUser?.uid,
            {
                "name.first": "Kinano",
                role: ROLE.Consultant,

                skills: [{ name: 'Python1', level: Level.Junior, nb_exp: 1 }]
                //.hard: [{name: 'Python', level: Level.Junior, nb_exp: 1}]
            }
        )

    }
}
async function getAllConsultants() {
    const consultants = await getConsultants();
    console.log('consultants: ', consultants);
}
function createNewProject() {
    const newProject: Project = {
        name: 'New Project',
        need: 'Needs of new project',
        leadTech: 'leadTech of new project',
        skills: [{ level: Level.Junior, name: 'Python', nb_exp: 1 }],
        description: 'description of New Project',
        end_at: new Date('December 17, 2023 03:24:00'),
        begin_at: new Date('December 17, 2022 03:24:00'),
        client: 'Client of new project'
    }

    createProject(newProject);
}

// start Challenge section
function createNewChallenge() {
    const newActiveChallenge: Challenge = {
        name: 'New Active Challenge',
        isActive: true,
        start_at: new Date('December 17, 2023 03:24:00'),
        delay: new Date('December 17, 2022 03:24:00'),
        description: 'description of Active Challenge',
        techLead: "LeadTech of Active Challenge",
        gifts: "gifts of Active Challenge"
    };
    const newNonActiveChallenge: Challenge = {
        name: 'New Non Active Challenge',
        isActive: false,
        start_at: new Date('December 17, 2023 03:24:00'),
        delay: new Date('December 17, 2022 03:24:00'),
        description: 'description of Non Active Challenge',
        techLead: "LeadTech of Non Active Challenge",
        gifts: "gifts of Non Active Challenge"
    }

    createChallenge(newActiveChallenge);
    createChallenge(newNonActiveChallenge);
}
async function getOneChallenge() {
    const challenge = await getChallenge("New Non Active Challenge");
    console.log('New Active Challenge: ', challenge)

}

async function getAllChallenges() {
    const challenges = await getChallenges();
    console.log('challenges: ', challenges);
}
async function getAllActiveChallenges() {
    const challenges = await getActiveChallenge();
    console.log('getAllActiveChallenges: ', challenges);
}

// end Challenge section


function addSkillsToConsultant() {
    const skill1: HardSkill = {
        name: 'Python',
        level: Level.Confirmed,
        nb_exp: 5
    }
    const skill2: HardSkill = {
        name: 'JS',
        level: Level.Confirmed,
        nb_exp: 5
    }
    addSkills([skill1, skill2]);
}
function removeSkillsToConsultant() {
    const skill1: HardSkill = {
        name: 'Python',
        level: Level.Confirmed,
        nb_exp: 5
    }
    const skill2: HardSkill = {
        name: 'JS',
        level: Level.Confirmed,
        nb_exp: 5
    }
    removeSkills([skill1, skill2]);
}
async function getAllProjects() {
    const projects = await getProjects();
    console.log('projects: ', projects);
}
async function getOneProject() {
    const project = await getProject("New Project");
}

monitorAuthState();
function signOut() {
    logout()
}
</script>
  
<style></style>