<script setup>
import joi from 'joi';
import { useRouter } from 'vue-router';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import PasswordInput from '@components/Form/PasswordInput.vue';
import LocaleButton from '@components/Locale/Button.vue';

import useFetch from '@tools/useFetch';
import { setUserData } from '@store/userStore';

const router = useRouter();

const login = (data) => {
  useFetch({ url: 'login', method: 'POST', body: data }).then((res) => {
    setUserData(res.id);
    router.push('/');
  });
};
</script>

<template>
  <div class="flex h-full max-w-full items-center justify-center bg-linear-to-r from-purple-400 to-pink-400">
    <LocaleButton class="absolute right-3 top-3" />
    <div class="card flex flex-col gap-5 p-10 text-center">
      <div>
        <h1
          v-i18n
          class="text-2xl font-bold"
        >
          Login
        </h1>
        <div class="flex flex-row justify-center gap-1.5">
          <p v-i18n>
            Don't have an account yet?
          </p>
          <RouterLink
            v-i18n
            to="/register"
          >
            Sign up here
          </RouterLink>
        </div>
      </div>
      <Form
        v-slot="{ errors }"
        :rules="{
          email: joi.string().required(),
          password: joi.string().required(),
        }"
        @submit="login"
      >
        <div class="flex flex-col gap-1 text-left">
          <Input
            name="email"
            :errors="errors?.email"
          />
          <PasswordInput
            name="password"
            :errors="errors?.password"
          />
        </div>
      </Form>
    </div>
  </div>
</template>
