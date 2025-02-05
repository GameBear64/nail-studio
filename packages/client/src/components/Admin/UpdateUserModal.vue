    <script setup>
    import joi from "joi"

    import Form from '../Form/Form.vue';
    import Input from '../Form/Input.vue';
    import Modal from '../Modal.vue';
    
    const props = defineProps(["onClose", "data"])

    console.log(props.data)
    const editUser =(dataa)=>{
  // console.log(dataa)
}

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
      @submit="editUser"
    >
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


