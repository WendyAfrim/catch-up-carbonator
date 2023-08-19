import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        { path: '', component: () => import('pages/IndexPage.vue'), meta: {
            breadcrumb: [
              {name: 'Accueil', link: '/'}
            ]
      }},
        { path: '/challenge', component: () => import('pages/ChallengePage.vue'), meta: {
            breadcrumb: [
            {name: 'Challenge du mois', link: '/challenge'}
            ]
      }}, 
        { path: '/skills', component: () => import('pages/SkillsForm.vue'), meta: {
          breadcrumb: [
            {name: 'Mes compétences', link: '/skills'}
          ]
      }},     
      { path: '/opportunities', component: () => import('pages/OpportunitiesPage.vue'), meta: {
        breadcrumb: [
          {name: 'Opportunités', link: '/opportunities'}
        ]
      }},                   
      { path: '/trainings', component: () => import('pages/TrainingsPage.vue'), meta: {
        breadcrumb: [
          {name: 'Formations', link: '/trainings'}
        ]
      }},   
      ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
