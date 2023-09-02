<template>
  <q-layout>
    <q-page-container>
      <q-page class="window-height window-width row justify-center items-center q-ma-md"
              style="background: linear-gradient(#383838, #656565, #959595, #c9c9c9, #ffffff);">
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24" style="width:400px;height:540px;">
              <q-card-section class="bg-white">
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl">
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
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="black"
                  class="full-width text-white" label="Me connecter"/>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>

</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from 'src/firebase/index';


const loginForm = reactive({
  email: '',
  password: '',
})

const errorCode = ref('');
const errorMessage = ref('');

signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
  .then((userCredential) => {
    console.log(userCredential);
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    errorCode.value = error.code;
    errorMessage.value = error.message;

    console.log(errorCode);
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
</script>
<style></style>
