<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStorage } from "@/stores/auth-storage";
import LoginRequest from "@/model/request/LoginRequest";
import InputField from "@/components/base/InputField.vue";
import { useToast } from "vue-toastification";
//@ts-ignore
import { VueRecaptcha } from "vue-recaptcha";

const router = useRouter();
const toast = useToast();
const authStorage = useAuthStorage();
const siteKey = process.env.VUE_APP_CAPTCHA_SITE_KEY
const username = ref("");
const password = ref("");
const reChaptcha = ref<HTMLElement>();
const loginError = ref(false);
const needCaptcha = ref(false);
const acceptCaptcha = ref(false);

const handleCaptchaError = () => {
  acceptCaptcha.value = false;
};
const handleCaptchaExpired = () => {
  console.log("Captcha expired");
  acceptCaptcha.value = false;
};

const handleCaptchaSuccess = (response: string) => {
  acceptCaptcha.value = true;
};

const login = () => {
  if (needCaptcha.value && !acceptCaptcha.value) {
    toast.warning("Accept the captcha!")
  } else {
    if (username.value !== "" && password.value !== "") {
      authStorage
        .login(new LoginRequest(username.value, password.value))
        .then(() => {
          toast.success("Login successfully!", {
            timeout: 2000,
          });

          localStorage.removeItem("loginAttempts")
          window.location.href="/"
        })
        .catch((error) => {
          handleIncorrectLoginError();

          toast.error("Incorrect username or password!", {
            timeout: 2000,
          });
        });
    } else {
      loginError.value = true;
    }
  }
};

const handleIncorrectLoginError = () => {
  let loginAttempts: any = localStorage.getItem("loginAttempts") || 0;
  loginAttempts++;
  localStorage.setItem("loginAttempts", loginAttempts);

  if (loginAttempts >= 3) {
    needCaptcha.value = true;
  }
};

const goTo = (path: string) => {
  router.push(path);
};

onMounted(() => {
  const loginAttempts: any = localStorage.getItem("loginAttempts") || 0;

  if (loginAttempts >= 3) {
    needCaptcha.value = true;
  }
});
</script>

<template>
  <div class="login">
    <div class="container login card">
      <div>
        <form @submit.prevent="login">
          <InputField
            label="Username"
            :hasError="loginError && username === ''"
            errorLabel="Username is required!"
            v-model="username"
          />
          <InputField
            label="Password"
            :hasError="loginError && password === ''"
            errorLabel="Password is required!"
            type="password"
            v-model="password"
          />
          <VueRecaptcha
            v-if="needCaptcha"
            ref="reChaptcha"
            class="mt-4"
            :sitekey="siteKey"
            :load-recaptcha-script="true"
            @verify="handleCaptchaSuccess"
            @expired="handleCaptchaExpired"
            @error="handleCaptchaError"
          ></VueRecaptcha>
          <button
            type="submit"
            class="submit-button btn btn-outline-primary"
            :disabled="username === '' || password.length < 6"
          >
            Login
          </button>
          <p class="register-label">
            Don't have an account?
            <a href="#" @click.prevent="goTo('/register')">Sign up</a>
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
  max-width: 400px;
  min-height: 400px;
  border: 1px solid lightgray;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.38);
}

.submit-button {
  margin-top: 40px;
  width: 100%;
}

.register-label {
  margin-top: 30px;
  color: gray;
}

.text-align-center {
  text-align: center;
}
</style>
