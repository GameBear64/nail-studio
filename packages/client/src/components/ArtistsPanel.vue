<script setup>
import { ref } from 'vue';

import useFetch from '@tools/useFetch';

import Icon from "../components/Icon.vue"

import DeleteUserModal from './Admin/DeleteUserModal.vue';
import UpdateUserModal from './Admin/UpdateUserModal.vue';
import Table from './Table/Table.vue';

const showDelete = ref(false)
const showCreate = ref(false)
const data = ref([])
const headers =[{title:'Image', key:'image'}, {title:'Name', key:'name'}, {title:'Email', key:'email'},{title:'Phone', key:'phone'}, {title:'Actions', key:'actions'}]


const loadImage = (img)=>
 new URL(origin + '/api/resource/'+ img, import.meta.url).href

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
  <DeleteUserModal
    v-if="showDelete"
    :on-close="()=>showDelete=!showDelete"
  />
 
  <UpdateUserModal 
    v-if="showCreate"
    :on-close="()=>showCreate=!showCreate
    "
  />

  <div class="mt-10 flex size-full justify-center">
    <Table
      title="Artists Management"
      :headers="headers"
      :data="data"
    >
      <template #image="{ row }">
        <img
          class="size-10 rounded-sm object-cover"
          :src="loadImage(row.image)"
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
