<script setup lang="ts">
import { useAuthStorage } from "@/stores/auth-storage";

const authStorage = useAuthStorage();

const loggedUser = authStorage.loggedUser;

const getformattedRoles = (roles: Array<string>) => {
  let result = "";
  roles.forEach((element) => {
    result += element.split("ROLE_")[1] + ", ";
  });

  return result.substring(0, result.length - 2);
};

const getformattedLastLogin = (lastLogin: Date) => {
  const date = new Date(lastLogin);

  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "" + date.getMonth() + 1 : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;
};
</script>

<template>
  <div class="home">
    <div class="card">
      <div class="card-body">
        <h2>Welcome {{ loggedUser.username }}</h2>
        <div class="row">
          <div class="col">
            <p>Your roles: {{ getformattedRoles(loggedUser.roles) }}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p>
              Your last login: {{ getformattedLastLogin(loggedUser.lastLogIn) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.card {
  margin: 30px;
}

.row {
  text-align: left;
}
</style>
