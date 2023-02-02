<script setup lang="ts">
import { ref } from "vue";
import { useAuthStorage } from "@/stores/auth-storage";
import { RoleTypeEnum } from "@/model/RoleTypeEnum";
import SignupRequest from "@/model/request/SignupRequest";
import InputField from "@/components/base/InputField.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const authStorage = useAuthStorage();
const username = ref("");
const name = ref("");
const password = ref("");
const registerError = ref(false);
const selectedRole = ref("");
const roles: String[] = [];

const goTo = (path: string) => {
  window.location.href = path as string;
};

const formatRole = (role: String) => {
  return role.split("ROLE_")[1];
};

const register = () => {
  if (
    username.value === "" ||
    name.value === "" ||
    password.value === "" ||
    selectedRole.value === ""
  ) {
    registerError.value = true;
  } else {
    const signupData = new SignupRequest(
      username.value,
      name.value,
      password.value,
      [selectedRole.value]
    );
    authStorage
      .register(signupData)
      .then(async (result) => {
        window.location.href = "/login";
      })
      .catch((error) => {
        toast.error("Registration error! Try again!");
      });
  }
};

const disabledRegisterButton = () => {
  if (
    username.value === "" ||
    name.value === "" ||
    password.value.length < 6 ||
    selectedRole.value === ""
  ) {
    return true
  }

  return false
};

const init = () => {
  Object.values(RoleTypeEnum).forEach((element) => {
    if (element !== "ROLE_ADMINISTRATOR") {
      roles.push(element);
    }
  });
};

init();
</script>

<template>
  <div class="login">
    <div class="container register card">
      <div>
        <h3>Register</h3>
        <form @submit.prevent="register()">
          <div class="row">
            <div class="col">
              <InputField
                label="Name"
                :hasError="registerError && name === ''"
                errorLabel="Name is required!"
                v-model="name"
              />
            </div>
            <div class="col">
              <InputField
                label="Username"
                :hasError="registerError && username === ''"
                errorLabel="Username is required!"
                v-model="username"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <InputField
                label="Password"
                type="password"
                :hasError="registerError && password === ''"
                errorLabel="Password is required!"
                v-model="password"
              />
            </div>
            <div class="col">
              <label class="title-label">Role</label>
              <select
                class="form-select"
                v-model="selectedRole"
                :class="[
                  registerError && selectedRole === '' && 'error-select',
                ]"
              >
                <option disabled value="">Please select one</option>
                <option
                  v-for="(role, index) in roles"
                  :key="index"
                  :value="role"
                >
                  {{ formatRole(role) }}
                </option>
              </select>
              <label
                class="error-label"
                v-if="registerError && selectedRole === ''"
                >You have to choose a role!</label
              >
            </div>
          </div>
          <button type="submit" class="submit-button btn btn-outline-primary" :disabled="disabledRegisterButton()">
            Register
          </button>
          <p class="register-label">
            <a href="#" @click.prevent="goTo('/login')">Back to login</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: lightgray;
}

.container {
  margin-top: 40px;
  max-width: 550px;
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.38);
}
.title-label {
  color: gray;
  margin-top: 30px;
  font-weight: 300;
  font-size: 18px;
}

.register {
  width: 40%;
  height: 500px;

  h3 {
    color: gray;
    margin-top: 30px;
  }

  button {
    width: 70%;
  }
}

.submit-button {
  margin-top: 70px;
  width: 100%;
}

.error-select {
  border: 1px solid red;
}

.error-label {
  color: red;
  font-size: 12px;
}

.register-label {
  margin-top: 30px;
  color: gray;
}
</style>
