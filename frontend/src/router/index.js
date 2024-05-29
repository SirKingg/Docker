import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/Login.vue'
import HomePage from '@/views/Home.vue'
import NotFoundPage from '@/views/NotFound.vue'
import RessourceView from '@/views/ViewRessource.vue'
import CreateRessource from '@/views/CreateRessource.vue'
import RegisterView from '@/views/Register.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import SuperAdminPage from '@/views/SuperAdminPage.vue'
import RegisterSuperAdmin from '@/views/RegisterSuperAdmin.vue'
import AdminUser from '@/views/AdminUser.vue'

const routes = [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      name: 'home',
      component: HomePage
     
    },
    {
      path: '/admin-user',
      name: 'admin-user',
      component: AdminUser
     
    },
    {
      path: '/super-admin',
      name: 'super-admin',
      component: SuperAdminPage
     
    },
    {
      path: '/register-admin/:role',
      name: 'register-admin',
      component: RegisterSuperAdmin
     
    },
    {
      path: '/ressource-view/:id',
      name: 'ressource-view',
      component: RessourceView
    },
    {
      path: '/create-ressource',
      name: 'create-ressource',
      component: CreateRessource
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profil-page',
      name: 'profil-page',
      component: ProfilePage
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage
    }
  ]
  
  const router = createRouter({
    mode:'history',
    history: createWebHistory(process.env.BASE_URL),
    routes,
  })

  export default router