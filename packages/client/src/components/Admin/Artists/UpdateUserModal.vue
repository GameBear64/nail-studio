<script setup>
import { computed, ref } from 'vue';
import joi from 'joi';

import Form from '@components/Form/Form.vue';
import Input from '@components/Form/Input.vue';
import MediaInput from '@components/Form/MediaInput.vue';
import MultiSelect from '@components/Form/MultiSelect.vue';
import SelectInput from '@components/Form/SelectInput.vue';
import Icon from '@components/Icon.vue';
import Modal from '@components/Modal.vue';

import { Shifts } from '@tools/consts';
import useFetch from '@tools/useFetch';
import { loadImage, updateUser } from '@api/artists';

const props = defineProps(['data']);
const open = ref(false);
const userPicture = ref(loadImage(props.data.picture));

const closeModal = () => {
  open.value = !open.value;
};

const formattedShifts = Object.entries(Shifts).map(([_key, val]) => ({ label: val, value: val }));

const handleUpload = (image) => {
  useFetch({ url: 'resource', method: 'POST', body: { data: image } }).then((id) => {
    userPicture.value = id;
  });
};
</script>

<template>
  <Icon
    clickable
    :onclick="() => (open = !open)"
    class="text-gray-800"
    icon="edit_square"
  />
  <Modal
    v-if="open"
    :close="closeModal"
    title="Edit user"
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
        // procedures: joi.string().required(),
        role: joi.string().required(),
      }"
      @submit="
        (formData) => {
          updateUser(props.data._id, { ...props.data, ...formData, picture: userPicture });
          closeModal();
        }
      "
    >
      <div class="flex flex-col gap-3 md:flex-row md:gap-10">
        <MediaInput
          name="picture"
          :errors="errors?.picture"
          :initial-image="userPicture"
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
            :options="formattedShifts"
          />
          <!-- <MultiSelect
            name="procedures"
            :errors="errors?.procedures"
            :options="formattedProcedures"
          /> -->
          <SelectInput
            name="role"
            :errors="errors?.role"
            :model-value="props.data.role"
            :options="[{ label: 'artist', value: 'artist'}]"
          />
        </div>
      </div>
    </Form>
  </Modal>
</template>
