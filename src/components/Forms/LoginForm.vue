<template>
  <!--  <Card>-->
  <!--    <template #body>-->
  <!--      <q-form @submit="submitLogIn()">-->
  <!--        <h2 class="text-h6 text-center">Détails du parcours</h2>-->
  <!--        <div class="row">-->
  <!--          <div class="col-12 col-md-6">-->
  <!--            <div class="q-mx-xl q-mt-xl q-py-md">-->
  <!--              <q-input standout="bg-green text-white" :dense="true" v-model="loginForm.email"-->
  <!--                       label="Votre mail"/>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="col-12 col-md-6">-->
  <!--            <div class="q-mx-xl q-mt-xl q-py-md">-->
  <!--              <q-input standout="bg-green text-white" :dense="true" v-model="loginForm.password"-->
  <!--                       label="Vote mote de passe"/>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="text-center q-pt-ùd q-pb-md">-->
  <!--          <q-btn color="green" type="submit">login</q-btn>-->
  <!--        </div>-->
  <!--      </q-form>-->
  <!--    </template>-->
  <!--  </Card>-->
  <q-layout>
    <q-page-container>
      <q-page class="window-height window-width row justify-center items-center q-ma-md"
              style="background: linear-gradient(#383838, #656565, #959595, #c9c9c9, #ffffff);">
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:400px;height:440px;">
              <q-card-section class="bg-white">
                <img
                  src="data:image/png;base64,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"
                  alt="Carbon IT logo" style="width: 26em">
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl" @submit="submitLogIn()">
                  <q-input
                    ref="email"
                    square
                    clearable
                    v-model="loginForm.email"
                    type="email"
                    lazy-rules
                    :rules="[this.required,this.isEmail,this.short]"
                    label="Email">
                    <template v-slot:prepend>
                      <q-icon name="email"/>
                    </template>
                  </q-input>
                  <q-input
                    ref="password"
                    square
                    clearable
                    v-model="loginForm.password" type="password"
                    lazy-rules
                    :rules="[this.required,this.short]"
                    label="Mot de passe">

                    <template v-slot:prepend>
                      <q-icon name="lock"/>
                    </template>
                  </q-input>
                  <div class="text-center">
                    <p v-if="errorMessage" class="text-red-8">{{ errorMessage }}</p>
                    <q-btn
                      :icon="submit ? 'pending' : 'power' "
                      type="submit"
                      unelevated
                      size="md"
                      color="black"
                      class="text-white" label="Me connecter"/>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {Credentials} from 'src/firebase/Types';
import {userLogIn} from 'src/firebase/LogIn';
import {currentUserStore} from 'stores/currrent_user';

const submit = ref(false);
const store = currentUserStore();
const errorCode = ref('');
const errorMessage = ref('');

const loginForm = ref<Credentials>({
  email: '',
  password: ''
});
const submitLogIn = async () => {
  submit.value = !submit.value;
  const user = await userLogIn(loginForm.value).catch((error) => {
    errorCode.value = error.code;
    errorMessage.value = error.message;

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
onMounted(async () => {
  await store.monitorAuthState();
});

</script>

<style scoped>

</style>
