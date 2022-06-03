<template>
  <div class="navbarlist">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">
          <div class="flex">
            <div class="icon">
              <Home />
            </div>
            <div>
              <h3>Home</h3>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'login' }" v-if="!$store.state.token">
          <div class="flex">
            <div class="icon">
              <Login />
            </div>
            <div>
              <h3>Login</h3>
            </div>
          </div>
        </router-link>
      </li>
      <li v-if="$store.state.token">
        <div class="flex" @click="logout">
          <div class="icon">
            <Login />
          </div>
          <div>
            <h3>Logout</h3>
          </div>
        </div>
      </li>
      <li>
        <router-link v-if="$store.state.user.locale" :to="{ name: 'paginaLocale', params: { localeID: $store.state.user.locale } }">
          <div class="flex">
            <div class="icon">
              <Login />
            </div>
            <div>
              <h3>Vai al mio account</h3>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Home from '@/components/icons/Home'
import Login from '@/components/icons/Login'
export default {
  components: {
    Home, Login
  },
  methods:{
    logout(){
      this.$store.commit('resetToken')
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
}
.navbarlist {
  padding-top: 1.5rem;
}
.flex {
  display: flex;
  flex-flow: row nowrap;
  padding: var(--big-padding);
}
li {
  border-radius: var(--border-radius);
  /*display: flex;
   flex-flow: row nowrap;
  gap: 2px; */
}
.icon {
  vertical-align: center;
  padding-right: var(--default-padding);
  padding-left: var(--default-padding);
}
li:hover {
  background: var(--secondaryOrange);
  color: var(--black);
}
a {
  text-decoration: none;
  color: var(--black);
}
</style>
