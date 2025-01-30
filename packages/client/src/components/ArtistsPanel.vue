<script setup>
import { ref } from 'vue';

import useFetch from '@tools/useFetch';

import Modal from './Modal.vue';
import Table from './Table.vue';

const showDelete = ref(false)
const showCreate = ref(false)
const data = ref([])
// useFetch({url:"artist", method:"GET"}).then(res=>{
//   res?.map((obj)=>{
//     data.value.push(['CS', obj.name, obj.email, obj.phone])
//   })
// })
</script>

<template>
  <Modal
    v-if="showDelete"
    target="#teleport-target"
    :close="()=>showDelete=!showDelete"
    title="Are you sure you want to delete this user?"
  >
    <template #buttons>
      <button class="btn-outlined bg-red-600 text-white">
        Delete
      </button>
    </template>
  </Modal>
  <Modal
    v-if="showCreate"
    target="#teleport-target"
    :close="()=>showCreate=!showCreate"
    title="Create a new user"
  >
    <template #content />
    <template #buttons>
      <button class="btn-outlined bg-purple-600 text-white">
        Create
      </button>
    </template>
  </Modal>
  <div class="mt-10 flex size-full justify-center">
    <Table
      table-name="Artists Management"
      :headers="['Image', 'Name', 'Email', 'Phone', 'Actions']"
      :actions="[
        { icon: 'edit_square', styles: 'text-gray-800', action: () => {showCreate=true} },
        { icon: 'delete', styles: 'text-red-600', action: () => {showDelete=true} },
      ]"
      :data="[['CX', 'Catherine Nikiforova', 'catxrin@gmail.com', '0899999999']]"
    />
  </div>
</template>
