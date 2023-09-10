<template>
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
  >
    <q-carousel-slide class="column no-wrap flex-center q-pa-md">
      <div class="q-pt-md text-center">
        <Card class="bg-green " color="white" padding-card-section="q-pa-xl">
          <template #body>
            <!--            <div>-->
            <!--              <q-avatar-->
            <!--                size="70px"-->
            <!--                class="overlapping"-->
            <!--              >-->
            <!--                <img :src="`https://cdn.quasar.dev/img/avatar${i + 1}.jpg`" class="text-center">-->
            <!--              </q-avatar>-->
            <!--              <h6 class="q-ma-xs">{{ consultant.fullname }}</h6>-->
            <!--              <div class="q-ma-md">-->
            <!--                <span>Poste : {{ consultant.hired_as }}</span> <br>-->
            <!--                <span>Email : {{ consultant.email }}</span> <br>-->
            <!--                <span>Compétences : </span>-->
            <!--                <ul>-->
            <!--                  <li v-for="(skill) in consultant.skills" :key="skill.name"-->
            <!--                      class="project project__consultant-skills">-->
            <!--                    {{ skill.name }} | {{ skill.level }}-->
            <!--                  </li>-->
            <!--                </ul>-->
            <!--                <div class="text-center q-pt-md">-->
            <!--&lt;!&ndash;                  <q-btn size="sm" color="white" text-color="black"&ndash;&gt;-->
            <!--&lt;!&ndash;                         @click="addConsultantToProject(project.name, consultant.uid)">Ajouter&ndash;&gt;-->
            <!--&lt;!&ndash;                  </q-btn>&ndash;&gt;-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </template>
        </Card>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script setup lang="ts">
import Card from 'components/CardComponent.vue';
import {ref} from 'vue';

const slide = ref(1);

const props = defineProps({
  object: {
    type: Object
  }
})

</script>
