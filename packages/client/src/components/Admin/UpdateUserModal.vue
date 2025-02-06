    <script setup>
    import joi from "joi"

    import { updateUser } from "../../api/artists";
    import Form from '../Form/Form.vue';
    import Input from '../Form/Input.vue';
    import Modal from '../Modal.vue';

    const props = defineProps(["onClose", "data"])


    </script>
<template>
  <Modal
    :close="props.onClose"
    title="Create a new user"
  >
    <Form
      v-slot="{errors}"
      :rules="{
        name:joi.string().required(),
        email: joi.string().required(),
        phone: joi.required()
      }"
      @submit="(userData)=>console.log(userData)"
    >
      <Input
        :errors="errors?.name"
        :value="props.data.name"
        name="name"
      />
      <Input
        :errors="errors?.email"
        :value="props.data.email"
        name="email"
      />
      <Input
        :errors="errors?.phone"
        :value="props.data?.phone"
        name="phone"
      />
    </Form>
  </Modal>
</template>


