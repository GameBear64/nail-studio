    <script setup>
    import { ref } from "vue";
    import joi from "joi"

    import { updateUser } from "../../api/artists";
    import Form from '../Form/Form.vue';
    import Input from '../Form/Input.vue';
    import Icon from "../Icon.vue";
    import Modal from '../Modal.vue';

    const props = defineProps(["data"])
    const open = ref(false)
    const closeModal =()=> {open.value = !open.value}

    </script>
<template>
  <Icon
    clickable
    :onclick="()=>open=!open"
    class="text-gray-800"
    icon="edit_square"
  />
  <Modal
    v-if="open"
    :close="closeModal"
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
      <p>{{ props.data.name }}</p>
      <Input
        :errors="errors?.name"
        name="name"
      />
      <Input
        :errors="errors?.email"
        name="email"
      />
      <Input
        :errors="errors?.phone"
        name="phone"
      />
    </Form>
  </Modal>
</template>


