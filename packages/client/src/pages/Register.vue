<script setup>
import joi from 'joi';
import { useRouter } from 'vue-router';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import StrengthInput from '@components/Form/StrengthInput.vue';
import LocaleButton from '@components/Locale/Button.vue';

import useFetch from '@tools/useFetch';
import { setUserData } from '@store/userStore';

const router = useRouter();
const register = (data) => {
  useFetch({
    url: 'register',
    method: 'POST',
    body: data,
  }).then((res) => {
    setUserData(res.id);
    router.push({ path: '/login' });
  });
};

const rules = {
  name: joi.string().min(3),
  email: joi.string().min(3),
  phone: joi.string(),
  password: joi.string().min(8),
  confirm_password: joi.valid(joi.ref('password')).messages({ 'any.only': "Passwords don't match" }),
};
</script>

<template>
  <div class="flex h-full max-w-full items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
    <LocaleButton class="absolute right-3 top-3" />
    <div class="card flex flex-col gap-5 p-10 text-center">
      <div>
        <h1
          v-i18n
          class="text-2xl font-bold"
        >
          Register
        </h1>
        <div class="flex flex-row justify-center gap-1.5">
          <p v-i18n>
            Already have an account?
          </p>
          <RouterLink
            v-i18n
            to="/login"
          >
            Sign in here
          </RouterLink>
        </div>
      </div>
      <Form
        v-slot="{ errors }"
        :rules
        @submit="register"
      >
        <div class="flex flex-col gap-1 text-left">
          <Input
            name="name"
            :errors="errors?.name"
          />
          <Input
            type="email"
            name="email"
            :errors="errors?.email"
          />
          <Input
            name="phone"
            :errors="errors?.phone"
          />
          <StrengthInput
            :errors="errors?.password"
            name="password"
          />
          <Input
            name="confirm_password"
            type="password"
            :errors="errors?.confirmPassword"
          />
        </div>
      </Form>
    </div>
  </div>
</template>
