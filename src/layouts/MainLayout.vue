<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>

        <q-item>
          <q-item-section side>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Mary</q-item-label>
            <q-item-label caption>Developpeuse React</q-item-label>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-header>

    <!--    <q-drawer v-model="leftDrawerOpen" show-if-above :width="200" :breakpoint="400">-->
    <!--      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">-->
    <!--        <q-list padding>-->
    <!--          <q-item clickable v-ripple>-->
    <!--            <q-item-section avatar>-->
    <!--              <q-icon name="inbox"/>-->
    <!--            </q-item-section>-->

    <!--            <q-item-section>-->
    <!--              Inbox-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--          <q-item active clickable v-ripple>-->
    <!--            <q-item-section avatar>-->
    <!--              <q-icon name="star"/>-->
    <!--            </q-item-section>-->

    <!--            <q-item-section>-->
    <!--              Star-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--          <q-item clickable v-ripple>-->
    <!--            <q-item-section avatar>-->
    <!--              <q-icon name="send"/>-->
    <!--            </q-item-section>-->

    <!--            <q-item-section>-->
    <!--              Send-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->

    <!--          <q-item clickable v-ripple>-->
    <!--            <q-item-section avatar>-->
    <!--              <q-icon name="drafts"/>-->
    <!--            </q-item-section>-->

    <!--            <q-item-section>-->
    <!--              Drafts-->
    <!--            </q-item-section>-->
    <!--          </q-item>-->
    <!--        </q-list>-->
    <!--      </q-scroll-area>-->

    <!--      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">-->
    <!--        <div class="absolute-bottom bg-transparent">-->
    <!--          <q-avatar size="56px" class="q-mb-sm">-->
    <!--            <img src="https://cdn.quasar.dev/img/boy-avatar.png">-->
    <!--          </q-avatar>-->
    <!--          <div class="text-weight-bold">Razvan Stoenescu</div>-->
    <!--          <div>@rstoenescu</div>-->
    <!--        </div>-->
    <!--      </q-img>-->
    <!--    </q-drawer>-->

    <!--    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>-->
    <!--      <q-list>-->
    <!--        <q-item-label header>-->
    <!--          <q-img-->
    <!--            src="https://assets.chooseyourboss.com/companies/logos/000/000/792/square/Pre%CC%81sentation5.png?1606311872"-->
    <!--            :ratio="16 / 9"/>-->
    <!--        </q-item-label>-->

    <!--        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="home" to="/"/>
        </q-breadcrumbs>
        <!-- {{ metas }} -->
      </div>
      <!-- <router-link to="/challenge">Test</router-link> -->
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import EssentialLink, {EssentialLinkProps} from 'components/EssentialLink.vue';

let searchModel: string;

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Accueil',
    icon: 'school',
    link: '/'
  },
  {
    title: 'Mes compétences',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Mon parcours',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Mes challenges',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Mes contributions',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
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
