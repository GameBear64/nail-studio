<script setup>
import joi from 'joi';
import { useRouter } from 'vue-router';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';

import { successSnackBar } from '@tools/snackbars';
import useFetch from '@tools/useFetch';

const router = useRouter();

const res = await useFetch({ url: 'user', method: 'GET' });

const handleSubmit = (formData) => {
  useFetch({ url: 'user', method: 'PATCH', body: formData }).then(() => {
    successSnackBar('Profile updated');
    router.push('/');
  });
};
</script>

<template>
  <div class="flex items-center justify-center bg-[url(../../public/flowerThree.jpg)] px-2">
    <Form
      v-slot="{ errors }"
      :rules="{
        name: joi.string().min(3).max(50).required(),
        email: joi.string().min(10).max(255).required(),
        phone: joi
          .string()
          .length(10)
          .pattern(/^[0-9]+$/),
      }"
      class="rounded border bg-white px-12 py-6 shadow-sm"
      @submit="handleSubmit">
      <p class="pb-2 text-center text-xl font-semibold">Settings</p>
      <div class="flex flex-col gap-1">
        <Input name="name" :model-value="res?.name" :errors="errors?.name" />
        <Input name="email" :model-value="res?.email" :errors="errors?.email" />
        <Input name="phone" min="1" :model-value="res?.phone" :errors="errors?.phone" />
      </div>
    </Form>
  </div>
</template>
