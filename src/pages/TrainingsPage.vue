<template>
  <div class="q-px-xl">
    <h1>Nos formations</h1>
    <div class="row">
      <div class="col-12 col-md-4" v-for="(training) in trainings" :key="training.name">
        <div class="q-pa-xl">
          <Card>
            <template #img>
              <img
                src="https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.png">
            </template>
            <template #body>
              <q-card-section>
                <div class="text-h6">{{ training.name }}</div>
                <div class="text-right">
                  <q-btn color="green" label="M'inscrire" class="q-mt-xs"></q-btn>
                </div>
              </q-card-section>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from 'components/CardComponent.vue';
import {onMounted, ref} from 'vue';
import {getTrainings, Training} from 'src/firebase/Training';

const trainings = ref<Training[] | undefined>();
console.log(trainings);

onMounted(async () => {
  trainings.value = await getTrainings();

})
</script>
<style></style>
