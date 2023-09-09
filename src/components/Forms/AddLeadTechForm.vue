<template>
  <q-form @submit="submitLeadTech()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-12 q-pt-md">
        <q-toggle
          label="Disponible"
          v-model="leadTechForm.state"
          color="green"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 q-pa-md">
        <q-input standout="bg-green text-white" v-model="leadTechForm.fullname" :dense="true"
                 label="Prénom"/>
        <div v-if="errors?.fullname" class="text-red-9 text-weight-bold">
          <span>{{ errors?.fullname?._errors[0] }}</span>
        </div>
      </div>
      <div class="col-12 col-md-6 q-pa-md">
        <q-input standout="bg-green text-white" :dense="true" v-model="leadTechForm.email" label="Email"/>
        <div v-if="errors?.email" class="text-red-9 text-weight-bold">
          <span>{{ errors?.email?._errors[0] }}</span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12 q-pa-md">
        <q-input filled v-model="leadTechForm.begin_at" mask="date" :rules="['date']" label="Date de début"
                 :dense="true">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="leadTechForm.begin_at">
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
    <p v-if="errorMessage" class="text-red-8 text-center">{{ errorMessage }}</p>
    <div class="text-right">
      <SubmitButton label="Enregistrer" :submit="submit"></SubmitButton>
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
import {createLeadTechAccount, LeadTech} from 'src/firebase/LeadTech';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {z} from 'zod';
import {leadtechSchema} from 'src/schema/leadtech.schema';
import {consultantSchema} from 'src/schema/consultant.schema';

const errorCode = ref('');
const errorMessage = ref('');

const leadTechForm = reactive({
  fullname: '',
  email: '',
  begin_at: new Date('2023/01/01'),
  state: ref(false),
});

const submit = ref(false);
const success = ref(false);

type leadtechFormSchemaType = z.infer<typeof leadtechSchema>
const errors = ref<z.ZodFormattedError<leadtechFormSchemaType> | null>(null);

function submitLeadTech() {

  submit.value = !submit.value;
  const validSchema = leadtechSchema.safeParse(leadTechForm);
  console.log(validSchema);

  if (!validSchema.success) {
    errors.value = validSchema.error.format();
  } else {
    const leadTech: LeadTech = {
      name: leadTechForm.fullname,
      email: leadTechForm.email,
      begin_at: new Date(leadTechForm.begin_at),
      state: leadTechForm.state,
    };


    createLeadTechAccount(
      {
        email: leadTechForm.email,
        password: window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36)
      },
      leadTech
    ).then((response) => {
      success.value = true;
      console.log(response);
    }).catch((error) => {
      errorCode.value = error.code;
      errorMessage.value = error.message;
      console.log(error);

      switch (errorCode.value) {
        case 'auth/user-not-found':
          errorMessage.value = 'Utilisateur introuvable';
          break;

        case 'auth/wrong-password':
          errorMessage.value = 'Mot de passe incorrect';
          break;

        case 'auth/invalid-email':
          errorMessage.value = 'Email invalide';
          break;
      }
    });
  }
}

</script>
<style></style>
