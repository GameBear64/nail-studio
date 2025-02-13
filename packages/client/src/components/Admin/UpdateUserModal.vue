    <script setup>
    import { ref } from "vue";
    import joi from "joi"

    import { updateUser } from "../../api/artists";
import { readFile } from "../../toolbox/utils";
    import Form from '../Form/Form.vue';
    import Input from '../Form/Input.vue';
import SelectInput from '../Form/SelectInput.vue'
    import Icon from "../Icon.vue";
    import Modal from '../Modal.vue';

    const props = defineProps(["data"])
    const open = ref(false)
    const closeModal =()=> {open.value = !open.value}
const file = ref('')
    const loadImage = (img)=>{
if(!img||img.length<1){
  return new URL('../../public/defaultUserImage.jpg', import.meta.url).href 
}
 return new URL(origin + '/api/resource/'+ img, import.meta.url).href
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
    title="Edit a new user"
  >
    <Form
      v-slot="{errors}"
      :rules="{
        name:joi.string().required(),
        email: joi.string().required(),
        phone: joi.required(),
        biography:joi.string(),
        yearsExperience:joi.number(),
        shift:joi.string(),
        role:joi.string()
      }"
      @submit="(formData)=>updateUser(props.data.userId, formData)"
    >
      <div class="flex flex-row gap-10">
        <div>
          <img
            :src="file"
            alt=""
            srcset=""
          >
          <input
            class="min-w-60"
            type="file"
            accept="image/*"
            @change="async (e)=>{
              await readFile(e.target.files[0]).then((res)=>console.log(res))
              // file= await readFile(e.target.files[0])
              // console.log(await file.value)
            }"
          >
        </div>
        <div class="flex min-w-60 flex-col gap-3">
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
            :options="[{label:'Full', value:'Full'},{label:'Morning', value:'Morning'},{label:'Afternoon', value:'Afternoon'}]"
          />
          <SelectInput
            name="procedures"
            :options="[]"
          />
          <SelectInput
            name="role"
            :errors="errors?.role"
            :model-value="props.data.role"
            :options="[{label:'Admin', value:'admin'},{label:'Artist', value:'artist'},{label:'User', value:'user'}]"
          />
        </div>
      </div>
    </Form>
  </Modal>
</template>


