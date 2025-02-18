    <script setup>
    import { ref } from "vue";
    import joi from "joi"

    import { loadImage,updateUser } from "../../api/artists";
    import { Shifts, UserRoles } from "../../toolbox/consts";
    import useFetch from "../../toolbox/useFetch";
    import Form from '../Form/Form.vue';
    import Input from '../Form/Input.vue';
    import MediaInput from "../Form/MediaInput.vue";
    import SelectInput from '../Form/SelectInput.vue'
    import Icon from "../Icon.vue";
    import Modal from '../Modal.vue';

    const props = defineProps(["data"])
    const open = ref(false)
    const userPicture = ref(props.data.picture)
    const closeModal =()=> {open.value = !open.value}
console.log(props.data)
const formatObject = (obj)=> Object.entries(obj).map(([key,val])=>{
            return {label:val, value:val}
          })

  const handleUpload = (image) => {
    console.log(image)
  useFetch({ url: 'resource', method: 'POST', body: { data: image } })
  .then(id => { userPicture.value = id
    // save this ID somewhere, in the current artists picture key maybe
  })
}
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
    title="Edit user"
  >
    <Form
      v-slot="{errors}"
      :rules="{
        name:joi.string().required(),
        email: joi.string().required(),
        phone: joi.required(),
        picture:joi.required(),
        biography:joi.string(),
        yearsExperience:joi.number(),
        shift:joi.string(),
        role:joi.string()
      }"
      @submit="(formData)=> updateUser(props.data._id, {...props.data,...formData, picture:userPicture })
      "
    >
      <div class="flex flex-col gap-3 md:flex-row md:gap-10">
        <MediaInput
          name="picture"
          :preview="true"
          @update="handleUpload"
        />
        <div class="flex flex-col gap-3">
          <Input
            name="name"
            :errors="errors?.name"
            :model-value="props.data.name"
          />
          <Input
            name="email"
            :errors="errors?.email"
            :model-value="props.data.email"
          /><Input
            name="biography"
            :errors="errors?.biography"
            :model-value="props.data.biography"
          /><Input
            label="Years of experience"
            name="yearsExperience"
            :errors="errors?.yearsExperience"
            :model-value="props.data.yearsExperience"
          />
        </div>
        <div class="flex min-w-60 flex-col gap-3">
          <Input
            name="phone"
            :errors="errors?.phone"
            :model-value="props.data.phone"
          />
          <SelectInput
            name="shift"
            :errors="errors?.shift"
            :model-value="props.data.shift"
            :options="formatObject(Shifts)"
          />
          <SelectInput
            name="procedures"
            :options="[]"
          />
          <SelectInput
            name="role"
            :errors="errors?.role"
            :model-value="props.data.role"
            :options="formatObject(UserRoles)"
          />
        </div>
      </div>
    </Form>
  </Modal>
</template>


