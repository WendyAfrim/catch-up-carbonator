<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <!--        <q-btn flat dense round icon="settings" aria-label="Menu" @click="toggleLeftDrawer"/>-->
        <q-item>
          <q-item-section side>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section v-if="store.currentUser">
            <q-item-label>{{ store.currentUser.firstName }}</q-item-label>
            <q-item-label caption>{{ store.currentUser.roles }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-space></q-space>
        <Modal logo="settings" color="black" title="Ajouter un nouveau R H"
               subtitle="Veuillez renseigner toutes ses informations">
          <template #body>
            <AddHRForm></AddHRForm>
          </template>
        </Modal>
        <q-btn @click="store.logout" v-if="store.currentUser" label="logout" class="q-mx-xs"></q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el v-if="store.currentUser && store.currentUser.roles == 'RH'" icon="home" to="/Rh"/>
          <q-breadcrumbs-el v-else-if="store.currentUser && store.currentUser.roles == 'Consultant'" icon="home"
                            to="/Consultant"/>
          <q-breadcrumbs-el v-else icon="home" to="/LeadTech"/>
        </q-breadcrumbs>
      </div>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {currentUserStore} from 'src/stores/currrent_user';
import Modal from 'components/ModalComponent.vue';
import AddHRForm from 'components/Forms/AddHRForm.vue';

const store = currentUserStore();

onMounted(async () => {
  await store.monitorAuthState();
});

</script>

<style lang="scss">
.q-img {
  &__container {
    text-align: center;
  }

  &__image {
    width: 50%;
  }
}

.cta {
  font-size: 1.8em;
  cursor: pointer;
  //margin-left: 0.5em;

  &__white {
    color: white;
  }

  &__black {
    color: black;
  }
}

.card-icon {
  font-size: 2.5em;

  &__white {
    color: white;
  }

  &__black {
    color: black;
  }
}


.q-item {

  &__label {
    a {
      text-decoration: none;
      font-size: 1.2em;
      // text-transform: uppercase;
      letter-spacing: 0.1em;
      color: black;
      font-weight: 500;
    }
  }
}
</style>
