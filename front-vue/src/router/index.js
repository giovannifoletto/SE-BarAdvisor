import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/middleware/authentication'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegistrazioneView from '../views/auth/RegistrazioneView.vue'
import RegistrazioneClienteView from '@/views/auth/RegistrazioneClienteView.vue'
import RegistrazioneGestoreLocaleView from '@/views/auth/RegistrazioneGestoreLocaleView.vue'
import EventoView from '@/views/evento/EventoView.vue'
import PasswordDimenticata from '@/views/auth/PasswordDimenticataView.vue'
import ResetPassword from '@/views/auth/ResetPasswordView.vue'
import LocaleView from '@/views/locale/LocaleView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registrazione',
    name: 'registrazione',
    component: RegistrazioneView
  },
  {
    path: '/registrazione/cliente', 
    name: 'registrazioneCliente',
    component: RegistrazioneClienteView
  },
  {
    path: '/registrazione/gestorelocale', 
    name: 'registrazioneGestoreLocale',
    component: RegistrazioneGestoreLocaleView
  },
  {
    path: '/passworddimenticata',
    name: 'passwordDimenticata',
    component: PasswordDimenticata,
  },
  {
    path: '/resetpassword/:passwordToken',
    name: 'resetPassword',
    component: ResetPassword,
    props: true,
  },
  {
    path: '/eventi/:eventoID',
    name: 'paginaEvento',
    component: EventoView,
    props: true
  },
  {
    path: '/locali/:localeID',
    name: 'paginaLocale',
    component: LocaleView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
