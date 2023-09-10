<template>
  <q-form @submit="submitHr()" v-if="!success">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="q-py-md q-pr-md">
          <q-input standout="bg-green text-white" v-model="hrForm.firstname" :dense="true"
                   label="Prénom"/>
          <div v-if="errors?.firstname" class="text-red-9 text-weight-bold">
            <span>{{ errors?.firstname?._errors[0] }}</span>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="hrForm.lastname" label="Nom"/>
          <div v-if="errors?.lastname" class="text-red-9 text-weight-bold">
            <span>{{ errors?.lastname?._errors[0] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="q-py-md">
          <q-input standout="bg-green text-white" :dense="true" v-model="hrForm.email" label="Email"/>
          <div v-if="errors?.email" class="text-red-9 text-weight-bold">
            <span>{{ errors?.email?._errors[0] }}</span>
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
import {HR, createHRAccount} from 'src/firebase/HR';
import Success from 'components/SuccessComponent.vue';
import SubmitButton from 'components/Buttons/SubmitButton.vue';
import {z} from 'zod';
import {consultantSchema} from 'src/schema/consultant.schema';
import {hrSchema} from 'src/schema/hr.schema';

const hrForm = reactive({
  firstname: '',
  lastname: '',
  email: '',
});
const date = ref('2019/02/01');
const emit = defineEmits(['submit']);
const submit = ref(false);
const success = ref(false);

type hrFormSchemaType = z.infer<typeof hrSchema>
const errors = ref<z.ZodFormattedError<hrFormSchemaType> | null>(null);

function submitHr() {
  emit('submit');
  submit.value = !submit.value;

  const validSchema = hrSchema.safeParse(hrForm);

  if (!validSchema.success) {
    errors.value = validSchema.error.format();
  } else {

    errors.value = null;
    const hr: HR = {
      firstName: hrForm.firstName,
      lastName: hrForm.lastName,
      email: hrForm.email,

    };
    createHRAccount(
      {
        email: hrForm.email,
        password: 'Test123'//window.crypto.getRandomValues(new BigUint64Array(1))[0].toString(36)
      },
      hr
    ).then((response) => {
      success.value = true;
      console.log(response);
    });
  }
}
</script>
<style></style>
