<template>
  <div class="q-px-xl">
    <h1>Nos formations</h1>
    <div class="grid" v-if="trainings">
      <div class="col-12 col-md-4 box" v-for="(training,i) in trainings" :key="i">
        <Card>
          <template #img>
            <img
              src="https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.png">
          </template>
          <template #body>
            <q-card-section>
              <div class="text-h6">{{ training.name }}</div>
              <div class="text-right">
                <SubmitButton label="M'inscrire" @click="subscribeToTraining(training.name)" :submit="click"/>
              </div>
            </q-card-section>
          </template>
        </Card>
      </div>
      <!--      </div>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from 'components/CardComponent.vue';
import {onMounted, ref} from 'vue';
import {getTrainings, Training} from 'src/firebase/Training';
import SubmitButton from 'components/Buttons/SubmitButton.vue';

const click = ref(false)
const trainings = ref<Training[] | undefined>();
console.log(trainings);

async function subscribeToTraining(trainingName: string) {
  click.value = true;
//   Todo : Subscribe to a training
}

onMounted(async () => {
  trainings.value = await getTrainings();

})
</script>
<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(3, 26em);
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 5em;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 17em);
  }
}

.full-height-box {
  grid-row: 1 / span 2;
}
</style>
