<script setup>
import joi from "joi";
import Form from "@components/Form/Form.vue";
import Input from "@components/Form/Input.vue";
import PasswordInput from "@components/Form/PasswordInput.vue";
import useFetch from "../toolbox/useFetch";

const register = (data) => {
  console.log(data);
};

const rules = {
  name: joi.string().min(3),
  email: joi.string().min(3),
  phone: joi.string(),
  password: joi.string(),
  confirmPassword: joi
    .valid(joi.ref("password"))
    .messages({ "any.only": "Passwords don't match" }),
};
</script>

<template>
  <div
    class="max-w-full bg-gradient-to-r from-purple-400 to-pink-400 h-full flex justify-center items-center"
  >
    <div class="flex card flex-col gap-5 text-center p-10">
      <div>
        <h1 class="text-2xl font-bold">Register</h1>
        <div class="justify-center flex flex-row gap-1.5">
          <p>Already have an account?</p>
          <RouterLink to="/login"> Sign in here </RouterLink>
        </div>
      </div>
      <Form @submit="register" v-slot="{ errors }" :rules>
        <div class="text-left flex flex-col gap-1">
          <Input name="name" :errors="errors?.name" />
          <Input type="email" name="email" :errors="errors?.email" />
          <Input name="phone" :errors="errors?.phone_number" />
          <PasswordInput name="password" />
          <Input
            name="confirmPassword"
            type="password"
            :errors="errors?.confirm_password"
          />
        </div>
      </Form>
    </div>
  </div>
</template>
