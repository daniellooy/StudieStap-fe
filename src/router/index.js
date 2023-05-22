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
        component: import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
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
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
