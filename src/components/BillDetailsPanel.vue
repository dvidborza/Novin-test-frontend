<script setup lang="ts">
import { ref } from "vue";
import InputField from "@/components/base/InputField.vue";
import { useRouter, useRoute } from "vue-router";
import { useBillStorage } from "@/stores/bill-storage";
import { useToast } from "vue-toastification";
import BillDto from "@/model/BillDto";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const billStorage = useBillStorage();
const bill = ref({}) as any;

const goTo = (path: string) => {
//   window.location.href = path;
  router.push("/bills")
};

const init = () => {
  billStorage
    .getById(route.params.id as string)
    .then((result: BillDto) => {
      bill.value = result;
      bill.value.createdDate = result.createdDate.toString().split('.')[0]

      console.log(result.createdDate.toString().split('.')[0]);
    })
    .catch((error) => {
      toast.error("Something went wrong! Try again!");
    });
};

init();
</script>

<template>
  <div class="home">
    <div class="card text-align-center">
      <div class="card-body">
        <h3>Bill Details</h3>
      </div>
      <form>
        <div class="row text-align-center">
          <div class="col">
            <InputField
              :disabled="true"
              label="ID"
              type="number"
              v-model="bill.id"
            />
          </div>
          <div class="col">
            <label class="textarea-label">Created Date</label>
            <input
              disabled
              class="date-picker disable-background"
              type="datetime-local"
              name="createdDate"
              v-model="bill.createdDate"
            />
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <InputField
              :disabled="true"
              label="Buyer's name"
              errorLabel="Buyer's name is required!"
              v-model="bill.buyersName"
            />
          </div>
          <div class="col">
            <InputField
              label="Item name"
              errorLabel="Item name is required!"
              :disabled="true"
              v-model="bill.itemName"
            />
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <InputField
              :disabled="true"
              label="Price"
              type="number"
              errorLabel="The price must be positive!"
              v-model="bill.price"
            />
          </div>
          <div class="col">
            <label class="textarea-label">Due Date</label>
            <input
              disabled
              class="date-picker disable-background"
              type="datetime-local"
              name="dueDate"
              v-model="bill.dueDate"
            />
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <label class="textarea-label">Comment</label>
            <textarea
              v-model="bill.comment"
              class="disable-background"
              disabled
              name="comment"
              rows="4"
              cols="50"
            ></textarea>
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <button class="btn btn-secondary" @click="goTo('/bills')">
              Back
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  max-width: 500px;
  margin: auto;
  margin-top: 50px;
}

.col {
  margin: 20px;
}
.disable-background:disabled {
  background-color: #e9ecef;
}

.error-border {
  border: 1px solid red;
}

.error-label {
  color: red;
  font-size: 12px;
}

.textarea-border {
  border: 1px solid lightgray;
}
.textarea-label {
  color: gray;
  margin-top: 30px;
  font-weight: 300;
  font-size: 18px;
}

.date-picker {
  border: 1px solid lightgray;
  height: 39px;
  border-radius: 7px;
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

.float-left {
  float: left;
}
</style>
