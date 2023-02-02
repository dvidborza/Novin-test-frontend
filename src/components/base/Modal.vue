<script setup lang="ts">
export interface ModalProps {
  isVisible?: boolean;
}

export interface ModalEmits {
  (e: "close"): boolean;
}

const emit = defineEmits<ModalEmits>();
const props = withDefaults(defineProps<ModalProps>(), {
  isVisible: false,
});

const closeModal = () => {
  emit("close");
};
</script>

<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-inner">
      <div class="header">
        <button class="modal-close" @click="closeModal">X</button>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  text-align: end;
  /* float: right; */
}
.modal-close {
  background-color: white;
  border: none;
  color: gray;
  padding-top: 5px;
  padding-right: 10px;
  border-radius: 5px;
}
.modal {
  min-width: 300px;
  min-height: 300px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-inner {
    text-align: center;
  background-color: #fff;
  border-radius: 5px;
  min-width: 300px;
  min-height: 300px;
}
.content {
  padding: 0px 32px 32px 32px;
}
</style>
