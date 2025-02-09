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
    title="Edit a new user"
  >
    <Form
      v-slot="{errors}"
      :rules="{
        name:joi.string().required(),
        email: joi.string().required(),
        phone: joi.required()
      }"
      @submit="(formData)=>updateUser(props.data.userId, formData)"
    >
      <Input
        name="name"
        :errors="errors?.name"
        :model-value="props.data.name"
      />
      <Input
        name="email"
        :errors="errors?.email"
        :model-value="props.data.email"
      />
      <Input
        name="phone"
        :errors="errors?.phone"
        :model-value="props.data.phone"
      />
    </Form>
  </Modal>
</template>


