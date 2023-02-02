<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBillStorage } from "@/stores/bill-storage";
import { RoleTypeEnum } from "@/model/RoleTypeEnum";

const billStorage = useBillStorage();
const router = useRouter();

const goTo = (path: string) => {
  window.location.href = path;
};

const formatDate = (date: Date) => {
  return `${date.toString().split("T")[0]} ${
    date.toString().split("T")[1].split(".")[0]
  }`;
};

const getDetails = (id: number | null) => {
  // window.location.href=`/bill-details/${id}`
  router.push(`/bill-details/${id}`);
};

const init = () => {
  billStorage.getBills();
};

init();
</script>

<template>
  <div class="home">
    <div class="card">
      <div class="card-body">
        <button
          class="btn btn-warning float-left mb-5"
          @click="goTo('/create-bill')"
          v-role-disable="[
            RoleTypeEnum.ROLE_ACCOUNTANT,
            RoleTypeEnum.ROLE_ADMINISTRATOR,
          ]"
        >
          Create
        </button>
        <h3>Bills</h3>
        <table
          class="table table-striped"
          v-if="billStorage.bills !== undefined && billStorage.bills.length > 0"
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Buyer's name</th>
              <th scope="col">Item name</th>
              <th scope="col">Price</th>
              <th scope="col">Due date</th>
              <th scope="col">Created date date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(bill, index) in billStorage.bills"
              :key="index"
              class="table-row"
              @click="getDetails(bill.id)"
            >
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ bill.buyersName }}</td>
              <td>{{ bill.itemName }}</td>
              <td>{{ bill.price }}</td>
              <td>{{ formatDate(bill.dueDate) }}</td>
              <td>{{ formatDate(bill.createdDate) }}</td>
            </tr>
          </tbody>
        </table>
        <div
          class="empty-table"
          v-if="billStorage.bills === undefined || billStorage.bills.length < 1"
        >
          <p>No bill yet!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 30px;
}

.table-row {
  cursor: pointer;
}
.table-row:hover {
  opacity: 70%;
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
.float-left {
  float: left;
}
</style>
