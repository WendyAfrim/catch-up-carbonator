<template>
  <q-layout>
    <q-page-container>
      <q-page class="q-ma-md">
        <h1 class="text-center">{{ project?.name }} | {{ project?.client }}</h1>
        <div class="q-ma-xl">
          <div class="row">
            <div class="col-12 col-md-4">
              <h3>Compétences requises</h3>
              <ul>
                <li v-for="(skill) in project?.skills" :key="skill.name">
                  {{ skill.name }} -
                  {{ skill.level }} -
                  {{ skill.nb_exp }} ans
                  d'expérience
                </li>
              </ul>
              <q-separator spaced="xl"/>
              <h3 class="q-ma-md">Description</h3>
              <p>{{ project?.description }}</p>
            </div>
            <q-separator vertical="vertical" inset="item-thumbnail" spaced="xl"/>
            <div class="col-12 col-md-7 column">
              <h3 class="text-center">Propositions</h3>
              <Card v-if="consultants?.length === 0">
                <template #body>
                  <div class="q-pa-xl text-center">
                    <span>Aucun consultant n'a été trouvé.</span>
                  </div>
                </template>
              </Card>
              <q-carousel
                v-model="slide"
                transition-prev="scale"
                transition-next="scale"
                swipeable
                animated
                control-color="green"
                navigation
                padding
                arrows
                height="550px"
                class="bg-white text-white shadow-1 rounded-borders"
                v-else
              >
                <q-carousel-slide :name="i + 1" class="column no-wrap flex-center q-pa-md"
                                  v-for="(consultant, i) in consultants"
                                  :key="consultant.firstname">
                  <div class="q-pt-md text-center">
                    <Card class="bg-green " color="white" padding-card-section="q-pa-xl">
                      <template #body>
                        <div>
                          <q-avatar
                            size="70px"
                            class="overlapping"
                          >
                            <img :src="`https://cdn.quasar.dev/img/avatar${i + 1}.jpg`" class="text-center">
                          </q-avatar>
                          <h6 class="q-ma-xs">{{ consultant.fullname }}</h6>
                          <div class="q-ma-md">
                            <span>Poste : {{ consultant.hired_as }}</span> <br>
                            <span>Email : {{ consultant.email }}</span> <br>
                            <span>Compétences : </span>
                            <ul>
                              <li v-for="(skill) in consultant.skills" :key="skill.name"
                                  class="project project__consultant-skills">
                                {{ skill.name }} | {{ skill.level }}
                              </li>
                            </ul>
                            <div class="text-center q-pt-md">
                              <q-btn size="sm" color="white" text-color="black"
                                     @click="addConsultantToProject(project.name, consultant.uid)">Ajouter
                              </q-btn>
                            </div>
                          </div>
                        </div>
                      </template>
                    </Card>
                  </div>
                </q-carousel-slide>
              </q-carousel>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">

import {useRoute} from 'vue-router';
import {getProject, Project} from 'src/firebase/Project';
import {onMounted, ref} from 'vue';
import {Consultant, getConsultantsBySkills} from 'src/firebase/Consultant';
import Card from 'components/CardComponent.vue';

const route = useRoute();
const uid: string = route.params.uid;

const slide = ref(1);

const project = ref<Project>();
let consultants = ref<Consultant[] | undefined>();
console.log(consultants)

async function addConsultantToProject(projectName: string, consultantUid: string) {
  console.log(projectName, consultantUid);
  // Todo : When we add a consultant to a project, the new state attributed is in_progress
}


onMounted(async () => {
  project.value = await getProject(uid);
  consultants.value = await getConsultantsBySkills(project.value?.skills);
});

</script>
<style lang="scss">
.project {

  &__consultant-skills {
    font-size: 0.8em;
    text-align: left;
  }
}

</style>
