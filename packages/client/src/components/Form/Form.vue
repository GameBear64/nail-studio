<script setup>
import joi from "joi";
import { ref } from "vue";

const props = defineProps(["rules"]);
const emit = defineEmits(["submit"]);
const error = ref(null);

const schema = joi.object(props.rules);

const handleSubmit = (event) => {
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());

  let validation = schema.validate(values, {
    abortEarly: false,
    presence: "required",
  });
  if (!validation.error) {
    emit("submit", values);
    error.value = null;
    return;
  }

  validation = validation?.error?.details?.map((el) => [
    el.context.label,
    el.message,
  ]);

  error.value = Object.fromEntries(validation);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot :errors="error"></slot>
    <button class="mt-4 w-full" :class="error && 'bg-gray-300'" type="submit">
      Submit
    </button>
  </form>
</template>
