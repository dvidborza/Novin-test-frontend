<script setup lang="ts">

export type InputFieldType = "text" | "password" | "number";

export interface InputFieldsProps {
  label?: string;
  hasError?: boolean;
  errorLabel?: string;
  type?: InputFieldType;
  modelValue?: any;
  disabled?: boolean
}

export interface InputFieldEmits {
  (e: "update:modelValue", data: String): String;
}

const emit = defineEmits<InputFieldEmits>();
const props = withDefaults(defineProps<InputFieldsProps>(), {
  label: "",
  hasError: false,
  errorLabel: "",
  type: "text",
  disabled: false,
});

const update = (data: String) => {
  emit("update:modelValue", data);
};
</script>

<template>
  <div>
    <label class="title-label">{{ props.label }}</label>
    <input
      :disabled="props.disabled"
      :value="props.modelValue"
      :type="type"
      :class="props.hasError && 'input-error'"
      class="form-control"
      :placeholder="props.label"
      @input="update($event.target.value)"
      step="any"
    />
    <label v-if="props.hasError" class="error-label">{{
      props.errorLabel
    }}</label>
  </div>
</template>

<style lang="scss" scoped>
.title-label {
  color: gray;
  margin-top: 30px;
  font-weight: 300;
  font-size: 18px;
}

.input-error {
  border: 1px solid red;
}

.error-label {
  color: red;
  font-size: 12px;
}
</style>
