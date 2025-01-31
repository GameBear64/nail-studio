<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import useFetch from '@tools/useFetch';

import Icon from "../components/Icon.vue"

import Table from './Table/Table.vue';
import Modal from './Modal.vue';

const showDelete = ref(false)
const showCreate = ref(false)
const data = ref([])
const headers =[{title:'Image', key:'image'}, {title:'Name', key:'name'}, {title:'Email', key:'email'},{title:'Phone', key:'phone'}, {title:'Actions', key:'actions'}]
const route = useRoute()
useFetch({url:"artist", method:"GET"}).then((res)=>{
const actions=[
        { icon: 'edit_square', styles: 'text-gray-800', action: () => {showCreate.value=true} },
        { icon: 'delete', styles: 'text-red-600', action: () => {showDelete.value=true} },
      ]
      
  Object.values(res).map((artist)=>{
  data.value.push({...artist, actions})
  })
})

</script>

<template>
  <Modal
    v-if="showDelete"
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
      :headers="headers"
      :data="data"
    >
      <template #image="{ row }">
        {{ console.log(route.fullPath + '/api/resource/'+ row.image) }}
        <img
          class="size-10 rounded-sm object-cover"
          :src="'http://localhost:5173/api/resource/'+ row.image"
          alt="image"
        >
      </template>

      <template #actions="{ row }">
        <div
          class="flex flex-row justify-center gap-3"
        >
          <Icon
            v-for="action in row?.actions"
            clickable
            :onclick="action?.action"
            :class="action?.styles"
            :icon="action.icon"
          />
        </div>
      </template>
    </Table>
  </div>
</template>
