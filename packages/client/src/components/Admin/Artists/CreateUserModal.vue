<script setup>
import { ref } from 'vue';
import joi from 'joi';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import MediaInput from '@components/Form/MediaInput.vue';
import PasswordInput from '@components/Form/PasswordInput.vue';
import SelectInput from '@components/Form/SelectInput.vue';
import Icon from '@components/Icon.vue';
import Modal from '@components/Modal.vue';

import { Shifts } from '@tools/consts';
import useFetch from '@tools/useFetch';
import { createUser, loadImage } from '@api/artists';

const open = ref(false);
const userPicture = ref(loadImage());
const closeModal = () => {
  open.value = !open.value;
};
console.log(loadImage());
const formattedShifts = Object.entries(Shifts).map(([_key, val]) => ({ label: val, value: val }));

const handleUpload = (image) => {
  useFetch({ url: 'resource', method: 'POST', body: { data: image } }).then((id) => {
    userPicture.value = id.path;
  });
};
</script>

<template>
  <div :onclick="() => (open = !open)" class="btn flex cursor-pointer flex-row items-center gap-1">
    Create
    <Icon icon="add" class="text-sm md:pt-0.5 md:text-base" />
  </div>

  <Modal v-if="open" :close="closeModal" title="Create user">
    <Form
      v-slot="{ errors }"
      :rules="{
        name: joi.string().required(),
        email: joi.string().required(),
        phone: joi.string().min(10).required(),
        picture: joi.required(),
        biography: joi.string(),
        yearsExperience: joi.number().required(),
        shift: joi.string().required(),
        role: joi.string().required(),
        password: joi.string().min(8).required(),
        confirm_password: joi.valid(joi.ref('password')).messages({ 'any.only': 'Passwords don\'t match' }),
      }"
      @submit="
        (formData) => {
          createUser({ ...formData, picture: userPicture === loadImage() ? '' : userPicture });
          closeModal();
        }
      ">
      <div class="flex flex-row gap-3 md:flex-row md:gap-10">
        <MediaInput
          name="picture"
          :errors="errors?.picture"
          :initial-image="userPicture"
          :preview="true"
          @update="handleUpload" />
        <div class="flex flex-col gap-3">
          <Input name="name" :errors="errors?.name" />
          <Input name="email" :errors="errors?.email" /><Input name="biography" :errors="errors?.biography" /><Input
            label="Years of experience"
            name="yearsExperience"
            :errors="errors?.yearsExperience" />
        </div>
        <div class="flex min-w-60 flex-col gap-3">
          <Input name="phone" :errors="errors?.phone" />
          <SelectInput name="shift" :errors="errors?.shift" :options="formattedShifts" />
        </div>
      </div>
      <PasswordInput name="password" :errors="errors?.password" />
      <Input name="confirm_password" type="password" :errors="errors?.confirmPassword" />
    </Form>
  </Modal>
</template>
