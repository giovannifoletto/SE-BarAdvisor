<template>
  <div class="navbarlist">
    <ul>
      <li>
        <router-link :to="{name: 'home'}">
          <div class="flex">
            <div class="icon">
              <IconsHome />
            </div>
            <div>
              <h3>Home</h3>
            </div>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'login'}">
          <div class="flex">
            <div class="icon">
              <IconsLogin />
            </div>
            <div>
              <h3>Login</h3>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
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
a{
  text-decoration: none;
  color: var(--black);
}
</style>
