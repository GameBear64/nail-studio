<script setup>
import { ref } from 'vue';
import joi from 'joi';

const props = defineProps(['rules']);
const emit = defineEmits(['submit']);
const error = ref(null); // provide and inject

const schema = joi.object(props.rules);

const handleSubmit = (event) => {
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  let validation = schema.validate(values, {
    abortEarly: false,
    presence: 'required',
  });
  if (!validation.error) {
    emit('submit', values);
    error.value = null;
    return;
  }

  validation = validation?.error?.details?.map((el) => [el.context.label, el.message]);

  error.value = Object.fromEntries(validation);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot :errors="error" />
    <button
      v-i18n
      class="btn mt-4 w-full"
      :class="{ 'bg-gray-300': error }"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>
