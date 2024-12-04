<script setup>
import joi from "joi";
import { useRouter } from "vue-router";

import useFetch from "@tools/useFetch";
import { setUserId } from "@store/userStore";

import Form from "@components/Form/Form.vue";
import Input from "@components/Form/Input.vue";
import TextArea from "@components/Form/TextArea.vue";
import SelectInput from "@components/Form/SelectInput.vue";
import StrengthInput from "@components/Form/StrengthInput.vue";
import CheckBox from "../components/Form/CheckBox.vue";

const router = useRouter();
const register = (data) => {
  console.log(data);
  useFetch({
    url: "register",
    method: "POST",
    body: data,
  }).then((res) => {
    setUserId(res.id);
    router.push({ path: "/login" });
  });
};

const rules = {
  name: joi.string().min(3),
  email: joi.string().min(3),
  phone: joi.string(),
  password: joi.string().min(8),
  confirmPassword: joi
    .valid(joi.ref("password"))
    .messages({ "any.only": "Passwords don't match" }),
  checkBox: joi.string().required(),
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
          <Input label="Name" name="name" :errors="errors?.name" />
          <Input type="email" name="email" :errors="errors?.email" />
          <Input name="phone" :errors="errors?.phone" />
          <StrengthInput :errors="errors?.password" name="password" />
          <Input
            name="confirmPassword"
            type="password"
            :errors="errors?.confirmPassword"
          />
          <CheckBox :errors="errors?.checkBox" name="checkBox" label="Check" />
          <!-- <TextArea
            name="testArea"
            label="Test Area"
            :errors="errors?.testArea"
          /> -->
          <!-- <SelectInput
            name="select"
            :options="[{ option: 1, value: 1 }]"
            :errors="errors?.select"
          /> -->
        </div>
      </Form>
    </div>
  </div>
</template>
