<script setup>
import joi from "joi";
import Form from "@components/Form/Form.vue";
import Input from "@components/Form/Input.vue";
import useFetch from "@tools/useFetch";
import PasswordInput from "../components/Form/PasswordInput.vue";

const login = (data) => {
  useFetch({ url: "login", method: "POST", body: data });
};
</script>

<template>
  <div
    class="max-w-full bg-gradient-to-r from-purple-400 to-pink-400 h-full flex justify-center items-center"
  >
    <div class="flex card flex-col gap-5 text-center p-10">
      <div>
        <h1 class="text-2xl font-bold">Login</h1>
        <div class="justify-center flex flex-row gap-1.5">
          <p>Don't have an account yet?</p>
          <RouterLink to="/register"> Sign up here </RouterLink>
        </div>
      </div>
      <Form
        @submit="login"
        v-slot="{ errors }"
        :rules="{
          email: joi.string().required(),
          password: joi.string().required(),
        }"
      >
        <div class="text-left flex flex-col gap-1">
          <Input name="email" :errors="errors?.email" />
          <PasswordInput name="password" :errors="errors?.password" />
          {{ console.log(errors) }}
        </div>
      </Form>
    </div>
  </div>
</template>
