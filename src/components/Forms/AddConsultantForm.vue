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
          <div v-if="errors?.firstname" class="text-red-9 text-weight-bold">
            <span>{{ errors?.firstname?._errors[0] }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="consultantForm.lastname" label="Nom"/>
          <div v-if="errors?.lastname" class="text-red-9 text-weight-bold">
            <span>{{ errors?.lastname?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="consultantForm.email" label="Email"/>
          <div v-if="errors?.email" class="text-red-9 text-weight-bold">
            <span>{{ errors?.email?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="consultantForm.hired_as" label="Poste"/>
          <div v-if="errors?.hired_as" class="text-red-9 text-weight-bold">
            <span>{{ errors?.hired_as?._errors[0] }}</span>
          </div>
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
          <div v-if="errors?.begin_at" class="text-red-9 text-weight-bold">
            <span>{{ errors?.begin_at?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
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
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {consultantSchema} from 'src/schema/consultant.schema';
import {z} from 'zod';

const consultantForm = reactive({
  firstname: '',
  lastname: '',
  email: '',
  hired_as: '',
  state: ref(true),
  begin_at: ref('2023/01/01'),
});

const date = ref('2019/02/01');
const emit = defineEmits(['submit']);

const submit = ref(false);
const success = ref(false);

type consultantFormSchemaType = z.infer<typeof consultantSchema>
const errors = ref<z.ZodFormattedError<consultantFormSchemaType> | null>(null);

function submitConsultant() {
  emit('submit');
  submit.value = !submit.value;

  const validSchema = consultantSchema.safeParse(consultantForm);

  if (!validSchema.success) {
    errors.value = validSchema.error.format();
  } else {
    const consultant: Consultant = {
      firstname: consultantForm.firstname,
      lastname: consultantForm.lastname,
      email: consultantForm.email,
      hired_as: consultantForm.hired_as,
      state: consultantForm.state,
      begin_at: new Date(consultantForm.begin_at)
    };

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

    errors.value = null;
  }
}
</script>
<style></style>
