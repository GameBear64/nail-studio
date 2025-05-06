<script setup>
import { computed, ref } from 'vue';
import joi from 'joi';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import Modal from '@components/Modal.vue';

const props = defineProps(['data']);
const open = ref(false);

const closeModal = () => {
  open.value = !open.value;
};

const isEditMode = computed(() => !!props?.data);

const handleSubmit = (formData) => {
  closeModal();
};
</script>
<template>
  <slot name="trigger" :click="() => (open = !open)" />
  <Modal v-if="open" :close="closeModal" :title="isEditMode ? 'Edit translation' : 'Add translation'">
    <Form
      v-slot="{ errors }"
      :rules="{
        bulgarian: joi.string().required(),
        english: joi.string().required(),
      }"
      @submit="handleSubmit">
      <div class="flex flex-col gap-1">
        <Input name="bulgarian" :errors="errors?.bulgarian" :model-value="props.data?.bulgarian" />
        <Input name="english" :errors="errors?.english" :model-value="props.data?.english" />
      </div>
    </Form>
  </Modal>
</template>
