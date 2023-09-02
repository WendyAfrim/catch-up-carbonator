<template>
  <q-form @submit="submitConsultant()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-12 q-pt-md">
        <q-toggle
          label="Disponible"
          v-model="consultantForm.state"
          color="green"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-pr-md">
          <q-input standout="bg-green text-white" v-model="consultantForm.firstname" :dense="true"
                   label="Prénom"/>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="consultantForm.lastname" label="Nom"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="consultantForm.email" label="Email"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="consultantForm.hired_as" label="Poste"/>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md q-pl-md">
          <q-input filled v-model="consultantForm.begin_at" mask="date" :rules="['date']" :dense="true">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat/>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="text-right">
      <q-btn color="green" label="Enregistrer" class="q-my-md" type="submit"
             :icon="submit ? 'pending' : 'download' ">
      </q-btn>
    </div>
  </q-form>
  <div v-else>
    <Success></Success>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Consultant, createConsultantAccount} from '../../firebase/Consultant';
import Success from 'components/SuccessComponent.vue';

const consultantForm = reactive({
  firstname: '',
  lastname: '',
  email: '',
  hired_as: '',
  state: ref(false),
  begin_at: ref('2023/01/01'),
});


const date = ref('2019/02/01');
const emit = defineEmits(['submit']);

const submit = ref(false);
const success = ref(false);

function submitConsultant() {
  emit('submit');

  submit.value = !submit.value;

  const consultant: Consultant = {
    firstname: consultantForm.firstname,
    lastname: consultantForm.lastname,
    email: consultantForm.email,
    hired_as: consultantForm.hired_as,
    state: consultantForm.state,
    begin_at: new Date(consultantForm.begin_at)
  };

  console.log(consultant);

  createConsultantAccount(
    {
      email: consultantForm.email,
      password: window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36)
    },
    consultant
  ).then((response) => {
    success.value = true;
    console.log(response);
  });
}

</script>
<style></style>
