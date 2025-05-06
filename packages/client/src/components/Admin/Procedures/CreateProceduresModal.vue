<script setup>
import { ref } from 'vue';
import joi from 'joi';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import Icon from '@components/Icon.vue';
import Modal from '@components/Modal.vue';

import { createProcedure } from '@api/procedures';

const open = ref(false);

const closeModal = () => {
  open.value = !open.value;
};
</script>

<template>
  <div
    :onclick="() => (open = !open)"
    class="btn flex cursor-pointer flex-row items-center gap-1"
  >
    Create
    <Icon
      icon="add"
      class="text-sm md:pt-0.5 md:text-base"
    />
  </div>

  <Modal
    v-if="open"
    :close="closeModal"
    title="Create user"
  >
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
          createProcedure(formData);
          closeModal();
        }
      "
    >
      <div class="flex flex-col gap-3">
        <Input
          name="name"
          :errors="errors?.name"
        />
        <Input
          name="description"
          :errors="errors?.description"
        />
        <Input
          name="price"
          type="number"
          min="1"
          :errors="errors?.price"
        />
        <Input
          type="number"
          name="duration"
          min="1"
          :errors="errors?.duration"
        />
      </div>
    </Form>
  </Modal>
</template>
