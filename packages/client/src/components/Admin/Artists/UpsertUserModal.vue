<script setup>
import { computed,ref } from 'vue';
import joi from 'joi';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import MediaInput from '@components/Form/MediaInput.vue';
import SelectInput from '@components/Form/SelectInput.vue';
import Modal from '@components/Modal.vue';
import MultiSelect from '@components/MultiSelect.vue'

import { Shifts } from '@tools/consts';
import useFetch from '@tools/useFetch';
import { createUser, updateUser } from '@api/artists';
import { data as proceduresData } from '@api/procedures';

const props = defineProps(['data']);
const open = ref(false);
const userPicture = ref(props?.data?.picture);
const selectedOptions = ref(props?.data?.procedures || []);

const closeModal = () => {
  open.value = !open.value;
};

const formattedShifts = Object.entries(Shifts).map(([_key, val]) => ({ label: val, value: val }));
const formattedProcedures = computed(() => proceduresData.value?.map((p) => ({ label: p.name, value: p._id })));
const isEditMode = computed(() => !!props?.data);


const handleUpload = (image) => {
  useFetch({ url: 'resource', method: 'POST', body: { data: image } }).then((id) => {
    userPicture.value = id;
  });
};

const handleSubmit = (formData) => {
  if (isEditMode.value) {
    updateUser(props.data._id, { ...props.data, ...formData, procedures: selectedOptions.value, picture: userPicture.value });
  } else {
    createUser({ ...formData, procedures: selectedOptions.value, picture: userPicture.value || "" });
  }

  closeModal();
}
</script>

<template>
  <slot
    name="trigger"
    :click="() => (open = !open)"
  />
  <Modal
    v-if="open"
    :close="closeModal"
    :title="isEditMode ? 'Edit user' : 'Create user'"
  >
    <Form
      v-slot="{ errors }"
      :rules="{
        name: joi.string().required(),
        email: joi.string().required(),
        phone: joi.string().min(10).required(),
        picture: joi.required(),
        biography: joi.string(),
        yearsExperience: joi.number().required(),
        shift: joi.string().required(),
      }"
      @submit="handleSubmit"
    >
      <div class="flex flex-col gap-3 md:flex-row md:gap-10">
        <MediaInput
          name="picture"
          :errors="errors?.picture"
          :initial-image="'/api/resource/' + userPicture"
          :preview="true"
          @update="handleUpload"
        />
        <div class="flex flex-col gap-3">
          <Input
            name="name"
            :errors="errors?.name"
            :model-value="props.data?.name"
          />
          <Input
            name="email"
            :errors="errors?.email"
            :model-value="props.data?.email"
          />
          <Input
            name="biography"
            :errors="errors?.biography"
            :model-value="props.data?.biography"
          />
          <Input
            label="Years of experience"
            name="yearsExperience"
            :errors="errors?.yearsExperience"
            :model-value="props.data?.yearsExperience"
          />
        </div>
        <div class="flex min-w-60 flex-col gap-3">
          <Input
            name="phone"
            :errors="errors?.phone"
            :model-value="props.data?.phone"
          />
          <SelectInput
            name="shift"
            :errors="errors?.shift"
            :model-value="props.data?.shift"
            :options="formattedShifts"
          />
          <MultiSelect
            v-model="selectedOptions"
            class="max-w-72"
            :errors="errors?.procedures"
            :options="formattedProcedures"
          />
        </div>
      </div>
    </Form>
  </Modal>
</template>
