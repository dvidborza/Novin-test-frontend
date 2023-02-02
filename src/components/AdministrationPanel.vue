<script setup lang="ts">
import { ref } from "vue";
import { useUserStorage } from "@/stores/user-storage";
import { useToast } from "vue-toastification";
import Modal from "@/components/base/Modal.vue";
import InputField from "@/components/base/InputField.vue";
import { RoleTypeEnum } from "@/model/RoleTypeEnum";
import UserRequest from "@/model/request/UserRequest";
import Multiselect from "@vueform/multiselect";

const toast = useToast();
const userStorage = useUserStorage();
const modifyModalIsShown = ref(false);
const options = ref([]) as any;
const currentUser = ref<UserRequest>();
const modifyError = ref(false);

const getformattedLastLogin = (lastLogin: Date) => {
  if (lastLogin === null) {
    return "NaN";
  }

  const date = new Date(lastLogin);

  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "" + date.getMonth() + 1 : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${
    date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  }:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;
};

const deleteUser = (id: Number) => {
  userStorage
    .deleteUser(id)
    .then(() => {
      toast.success("User delete successfully!");
    })
    .catch((error) => {
      toast.error("User deletion error! Try again!");
    });
};

const openModifyModal = (user: UserRequest) => {
  currentUser.value = new UserRequest(
    user.id,
    user.username,
    user.name,
    user.roles
  );

  modifyModalIsShown.value = true;
};

const closeModifyModal = () => {
  modifyModalIsShown.value = false;
  modifyError.value = false;
};

const submitModify = () => {
  if (currentUser.value !== undefined) {
    if (
      currentUser.value.name.length < 1 ||
      currentUser.value.username.length < 1 ||
      currentUser.value.roles.length < 1
    ) {
      modifyError.value = true;
    } else {
      userStorage
        .update(currentUser.value)
        .then(() => {
          toast.success("User update successfully!");
          closeModifyModal();
        })
        .catch((error) => {
          toast.error("User modify error! Try Again!");
        });
    }
  }
};

const getRolesTableData = (roles: Array<String>) => {
  let text = "";

  roles.forEach((element) => {
    text = text + element.split("ROLE_")[1] + ", ";
  });

  return text.substring(0, text.length - 2);
};

const init = () => {
  userStorage.getUsers();

  Object.values(RoleTypeEnum).forEach((element) => {
    const elementLabel =
      element.split("ROLE_")[1].charAt(0).toUpperCase() +
      element.split("ROLE_")[1].slice(1).toLowerCase();

    options.value.push({
      value: element,
      label: elementLabel,
    });
  });
};

init();
</script>

<template>
  <div class="home">
    <div class="card">
      <div class="card-body">
        <h3>Administration</h3>
        <table class="table table-striped" v-if="userStorage.users !== undefined && userStorage.users.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Roles</th>
              <th scope="col">Last Login</th>
              <th scope="col" class="text-align-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in userStorage.users">
              <th scope="row text-align-left">{{ index + 1 }}</th>
              <td>{{ user.username }}</td>
              <td>{{ user.name }}</td>
              <td>{{ getRolesTableData(user.roles) }}</td>
              <td>{{ getformattedLastLogin(user.lastLogIn) }}</td>
              <td class="text-align-right">
                <button
                  class="btn btn-warning me-2"
                  @click="openModifyModal(user)"
                >
                  Modify
                </button>
                <button
                  class="btn btn-danger"
                  @click.prevent="deleteUser(user.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="empty-table"
          v-if="userStorage.users === undefined || userStorage.users.length < 1"
        >
          <p>No User yet!</p>
        </div>
      </div>
    </div>
    <Modal :isVisible="modifyModalIsShown" @close="closeModifyModal()">
      <div>
        <div><h2>Modify user</h2></div>
        <div>
          <div class="row text-align-center">
            <div class="col">
              <InputField
                label="Username"
                v-model="currentUser.username"
                :hasError="modifyError && currentUser.username.length < 1"
                errorLabel="Username is required!"
              />
            </div>
            <div class="col">
              <InputField
                label="Name"
                v-model="currentUser.name"
                :hasError="modifyError && currentUser.name.length < 1"
                errorLabel="Name is required!"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <Multiselect
                :class="[
                  modifyError &&
                    currentUser.roles.length < 1 &&
                    'multiselect-error',
                ]"
                class="mt-4"
                v-model="currentUser.roles"
                mode="tags"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="options"
              />
              <label
                v-show="modifyError && currentUser.roles.length < 1"
                class="multiselect-label-error"
                >You have to choose at least one!</label
              >
            </div>
          </div>
          <div class="row mt-4">
            <div class="col text-align-center">
              <button
                class="btn btn-secondary me-3"
                @click="closeModifyModal()"
              >
                Cancel
              </button>
              <button class="btn btn-success" @click="submitModify()">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style lang="scss" scoped>
.card {
  margin: 30px;
}

.empty-table {
  border-top: 1px solid lightgray;
  padding-top: 30px;
  margin-top: 30px;
}

.text-align-right {
  text-align: right;
}
.text-align-left {
  text-align: left;
}
.text-align-center {
  text-align: center;
}

.multiselect-error {
  border: 1px solid red;
}

.multiselect-label-error {
  color: red;
  font-size: 12px;
}
</style>
