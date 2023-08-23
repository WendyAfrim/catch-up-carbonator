import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/Rh', component: () => import('pages/Dashboard/RhDashboard.vue'), meta: {
          breadcrumb: [
            {name: 'AccueilRh', link: '/Rh'}
          ]
        }
      },
      {
        path: '/Consultant', component: () => import('pages/Dashboard/ConsultantDashboard.vue'), meta: {
          breadcrumb: [
            {name: 'AccueilConsultant', link: '/Consultant'}
          ]
        }
      },
      {
        path: '/LeadTech', component: () => import('pages/Dashboard/LeadTechDashboard.vue'), meta: {
          breadcrumb: [
            {name: 'AccueilLeadTech', link: '/LeadTech'}
          ]
        }
      },
      {
        path: '/challenge', component: () => import('pages/ChallengePage.vue'), meta: {
          breadcrumb: [
            {name: 'Challenge du mois', link: '/challenge'}
          ]
        }
      },
      {
        path: '/skills', component: () => import('pages/SkillsForm.vue'), meta: {
          breadcrumb: [
            {name: 'Mes compétences', link: '/skills'}
          ]
        }
      },
      {
        path: '/opportunities', component: () => import('pages/OpportunitiesPage.vue'), meta: {
          breadcrumb: [
            {name: 'Opportunités', link: '/opportunities'}
          ]
        }
      },
      {
        path: '/trainings', component: () => import('pages/TrainingsPage.vue'), meta: {
          breadcrumb: [
            {name: 'Formations', link: '/trainings'}
          ]
        }
      },
      {
        path: '/career', component: () => import('pages/CareerPage.vue'), meta: {
          breadcrumb: [
            {name: 'Parcours', link: '/career'}
          ]
        }
      },
      // {
      //   path: '/login', component: () => import('pages/LoginPage.vue'), meta: {
      //     breadcrumb: [
      //       {name: 'Connexion', link: '/login'}
      //     ]
      //   }
      // },
      // {
      //   path: '/', component: () => import('pages/AuthPage.vue'), meta: {
      //     breadcrumb: [
      //       {name: 'Connexion', link: '/'}
      //     ]
      //   }
      // }
    ]
  },
  {
    path: '/', component: () => import('pages/AuthPage.vue'), meta: {
      breadcrumb: [
        {name: 'Connexion', link: '/login'}
      ]
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
