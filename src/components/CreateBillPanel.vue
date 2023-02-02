<script setup lang="ts">
import { ref } from "vue";
import { useBillStorage } from "@/stores/bill-storage";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import InputField from "@/components/base/InputField.vue";
import BillDto from "@/model/BillDto";

const toast = useToast();
const billStorage = useBillStorage();
const router = useRouter();
const buyersName = ref("");
const itemName = ref("");
const comment = ref("");
const price = ref(0);
const dueDate = ref("");
const createError = ref(false);

const goTo = (path: string) => {
  router.push("/bills")
};

const resetNewBillValues = () => {
  buyersName.value = "";
  itemName.value = "";
  comment.value = "";
  price.value = 0;
  createError.value = false;
};

const submit = () => {
  if (
    buyersName.value === "" ||
    itemName.value === "" ||
    comment.value === "" ||
    price.value < 0
  ) {
    createError.value = true;
  } else {
    const bill = new BillDto(
      null,
      buyersName.value,
      comment.value,
      itemName.value,
      new Date(),
      new Date(dueDate.value),
      price.value
    );

    billStorage
      .save(bill)
      .then(() => {
        toast.success("The Bill save successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        resetNewBillValues()
      });
  }
};
</script>

<template>
  <div class="home">
    <div class="card text-align-center">
      <div class="card-body">
        <h3>Create a new Bill</h3>
      </div>
      <form @submit.prevent="submit()">
        <div class="row text-align-center">
          <div class="col">
            <InputField
              label="Buyer's name"
              errorLabel="Buyer's name is required!"
              :hasError="createError && buyersName.length < 1"
              v-model="buyersName"
            />
          </div>
          <div class="col">
            <InputField
              label="Item name"
              errorLabel="Item name is required!"
              :hasError="createError && itemName.length < 1"
              v-model="itemName"
            />
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <InputField
              label="Price"
              type="number"
              :hasError="createError && price < 0"
              errorLabel="The price must be positive!"
              v-model="price"
            />
          </div>
          <div class="col">
            <label class="textarea-label">Due Date</label>
            <input
              class="date-picker"
              type="datetime-local"
              name="dueDate"
              v-model="dueDate"
            />
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <label class="textarea-label">Comment</label>
            <textarea
              :class="[
                createError && comment.length < 1 && 'error-border',
                !createError && comment.length > 0 && 'textarea-border',
              ]"
              name="comment"
              rows="4"
              cols="50"
              v-model="comment"
            ></textarea>
            <br />
            <label v-if="createError && comment.length < 1" class="error-label"
              >Comment is required!</label
            >
          </div>
        </div>
        <div class="row text-align-center">
          <div class="col">
            <button class="btn btn-secondary" @click="goTo('/bills')">
              Back
            </button>
          </div>
          <div class="col">
            <button class="btn btn-primary">Save</button>
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
