<script setup>
import { ref } from 'vue';
import joi from 'joi';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import Icon from '@components/Icon.vue';
import Modal from '@components/Modal.vue';

import { updateProcedure } from '@api/procedures';

const props = defineProps(['data']);
const open = ref(false);
const closeModal = () => {
  open.value = !open.value;
};
</script>

<template>
  <Icon clickable :onclick="() => (open = !open)" class="text-gray-800" icon="edit_square" />
  <Modal v-if="open" :close="closeModal" title="Edit user">
    <Form
      v-slot="{ errors }"
      :rules="{
        name: joi.string().required(),
        description: joi.string().required(),
        price: joi.number().min(1).required(),
        duration: joi.number().min(1).required(), // In minutes!
      }"
      @submit="
        (formData) => {
          updateProcedure(props.data._id, formData);
          closeModal();
        }
      ">
      <div class="flex flex-col gap-3">
        <Input name="name" :model-value="props.data.name" :errors="errors?.name" />
        <Input name="description" :model-value="props.data.description" :errors="errors?.description" />
        <Input name="price" type="number" min="1" :model-value="props.data.price" :errors="errors?.price" />
        <Input type="number" name="duration" min="1" :model-value="props.data.duration" :errors="errors?.duration" />
      </div>
    </Form>
  </Modal>
</template>
