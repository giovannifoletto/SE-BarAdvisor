import { createRouter, createWebHistory } from 'vue-router'
import auth from '@/middleware/authentication'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView'
import RegistrazioneView from '../views/auth/RegistrazioneView'
import RegistrazioneClienteView from '@/views/auth/RegistrazioneClienteView'
import RegistrazioneGestoreLocaleView from '@/views/auth/RegistrazioneGestoreLocaleView'
import EventoView from '@/views/evento/EventoView'
import PasswordDimenticata from '@/views/auth/PasswordDimenticataView'
import ResetPassword from '@/views/auth/ResetPasswordView'

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
    path: '/evento/:eventoID',
    name: 'paginaEvento',
    component: EventoView,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
