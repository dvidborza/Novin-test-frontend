<script setup lang="ts">
import { useAuthStorage } from "@/stores/auth-storage";
import { useRouter } from "vue-router";

const authStorage = useAuthStorage();
const router = useRouter();
let navItems: any = [];

router.options.routes.forEach((element) => {
  if (element.meta) {
    if (element.meta.inMenu) {
      navItems.push(element);
    }
  }
});

document.title = 'Novin Test'
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark"
    v-if="authStorage.loggedUser !== null"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Novin</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index" v-role-hide="item.meta.authorize">
            <a class="nav-link" aria-current="page" href="#"
              ><router-link class="nav-link" :to="item.path">
                {{ item.name }}
              </router-link></a
            >
          </li>
        </ul>
        <form class="d-flex" role="search">
          <button
            class="btn btn-outline-danger"
            @click.prevent="authStorage.logout()"
            type="submit"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<style lang="scss">
html {
  background-color: lightgray;
}

#app {
  background-color: lightgray;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: white;
      // color: #42b983;
    }
  }
}
</style>
