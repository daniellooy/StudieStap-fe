// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {useAppStore} from "@/store/store";
import LoginLayout from "@/layouts/default/Login.vue";



const routes = [
  {
    path: '/login',
    component: () => import('@/layouts/default/Login.vue'),
    children: [
      {
        path: '',
        component: () =>  import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
      },
      {
        path: 'community',
        name: 'Community',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Community.vue'),
      },
      {
        path: 'voortgang',
        name: 'Voortgang',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Voortgang.vue'),

      },
      {
        path: 'achievements',
        name: 'Achievements',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Achievements.vue'),
      },
      {
        path: 'shop',
        name: 'Shop',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Shop.vue'),
      },
      {
        path: '/zelfstudie/',
        name: 'Zelfstudie',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Zelfstudie/index.vue'),
        children: [
          {
            path: '',
            name: 'Overzicht',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Zelfstudie/overview.vue'),
          },
          {
            path: 'module/:module_id',
            name: 'Module overzicht',
            component: () => import(/* webpackChunkName: "home" */ '@/views/Zelfstudie/module_overview.vue'),
          },
          {
            path: 'video/:video_id',
            name: 'Video',
            params: true,
            component: () => import(/* webpackChunkName: "home" */ '@/views/Zelfstudie/detail.vue'),
          },
          {
            path: 'question/:question_id',
            name: 'Vraag',
            params: true,
            component: () => import('@/views/Zelfstudie/question.vue')
          }
        ]
      },
      {
        path: 'profiel',
        name: 'Mijn profiel',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Profiel.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/default/Admin.vue'),
    children: [
      {
        path: '',
        name: 'Admin overzicht',
        component: () => import('@/views/admin/overview.vue')
      },
      {
        path:  '/funfact',
        name: 'Funfact',
        component: () => import('@/views/admin/editfunfact.vue')
      },
      {
        path:  '/featuredmodule',
        name: 'Uitgelichte Module',
        component: () => import('@/views/admin/editfeaturedmodule.vue')
      },
      {
        path: 'modules/',
        name: 'Admin Modules',
        component: () => import('@/views/admin/Modules.vue'),
        children: [
          {
            path: '',
            name: 'Admin Modules Overzicht',
            component: () => import('@/views/admin/admin_modules_overview.vue'),
          },
          {
            path: 'add',
            name: 'Module toevoegen',
            component: () => import('@/views/admin/add_edit_module.vue'),
          },
          {
            name: 'Module bewerken',
            path: 'edit/:module_id',
            params: true,
            component: () => import('@/views/admin/add_edit_module.vue'),
          },
        ]
      },
      {
        path: 'videos/',
        name: 'Admin Videos',
        component: () => import('@/views/admin/Videos.vue'),
        children: [
          {
            path: '',
            name: 'Admin Videos Overzicht',
            component: () => import('@/views/admin/admin_videos_overview.vue'),
          },
          {
            path: 'add',
            name: 'Video toevoegen',
            component: () => import('@/views/admin/add_edit_video.vue'),
          },
          {
            name: 'Video bewerken',
            path: 'edit/:video_id',
            params: true,
            component: () => import('@/views/admin/add_edit_video.vue'),
          },
        ]
      },
      {
        path: 'categorie/',
        name: 'Admin Categorieën',
        component: () => import('@/views/admin/Videos.vue'),
        children: [
          {
            path: '',
            name: 'Admin Categorieën Overzicht',
            component: () => import('@/views/admin/admin_category_overview.vue'),
          },
          {
            path: 'add',
            name: 'Categorie toevoegen',
            component: () => import('@/views/admin/add_edit_category.vue'),
          },
          {
            name: 'Categorie bewerken',
            path: 'edit/:category_id',
            params: true,
            component: () => import('@/views/admin/add_edit_category.vue'),
          },
        ]
      },
      {
        path: 'vraag/',
        name: 'Admin Vragen',
        component: () => import('@/views/admin/Videos.vue'),
        children: [
          {
            path: '',
            name: 'Admin Vragen Overzicht',
            component: () => import('@/views/admin/admin_question_overview.vue'),
          },
          {
            path: 'add',
            name: 'Vraag toevoegen',
            component: () => import('@/views/admin/add_edit_question.vue'),
          },
          {
            name: 'Vraag bewerken',
            path: 'edit/:question_id',
            params: true,
            component: () => import('@/views/admin/add_edit_question.vue'),
          },
        ]
      },
      {
        path: 'evaluationrubrics/',
        name: 'Admin Evaluatie Rubrics',
        component: () => import('@/views/admin/Videos.vue'),
        children: [
          {
            path: '',
            name: 'Admin Rubrics Overzicht',
            component: () => import('@/views/admin/admin_rubrics_overview.vue'),
          },
          {
            path: 'add',
            name: 'Rubric toevoegen',
            component: () => import('@/views/admin/add_edit_rubric.vue'),
          },
          {
            name: 'Rubric bewerken',
            path: 'edit/:rubric_id',
            params: true,
            component: () => import('@/views/admin/add_edit_rubric.vue'),
          },
        ]
      },
      {
        path: 'evaluations/',
        name: 'Admin Evaluaties',
        component: () => import('@/views/admin/Videos.vue'),
        children: [
          {
            path: '',
            name: 'Admin Evaluatie Overzicht',
            component: () => import('@/views/admin/admin_evaluation_overview.vue'),
          },
          {
            path: 'add',
            name: 'Evaluatie toevoegen',
            component: () => import('@/views/admin/add_edit_evaluation.vue'),
          },
          {
            name: 'Evaluatie bewerken',
            path: 'edit/:evaluation_id',
            params: true,
            component: () => import('@/views/admin/add_edit_evaluation.vue'),
          },
        ]
        },
        {
        path: 'channels/',
        name: 'StudieStap Channels',
        component: () => import('@/views/admin/Channels.vue'),
        children: [
          {
            path: '',
            name: "Channel Overzicht",
            component: () => import('@/views/admin/admin_channels_overview.vue'),
          },
          {
            path: 'add',
            name: 'Channel toevoegen',
            component: () => import('@/views/admin/add_edit_channel.vue'),
          },
          {
            path: 'edit/:channel_id',
            name: 'Channel bewerken',
            component: () => import('@/views/admin/add_edit_channel.vue'),
          }
        ]
      },
      {
        path: 'achievements/',
        name: 'Requests',
        component: () => import('@/views/admin/Requests.vue'),
      },
      {
        path: 'addshopitem',
        name: 'add shopitems',
        component: () => import('@/views/admin/AddShopItems.vue'),
      },
      {
        path: 'addachievement',
        name: 'add achievement',
        component: () => import('@/views/admin/AddAchievements.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
