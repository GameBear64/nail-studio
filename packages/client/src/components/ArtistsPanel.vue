<script setup>
import { ref } from 'vue';

import Icon from '@components/Icon.vue';

import useFetch from '@tools/useFetch';

import { data } from '../api/artists';

import DeleteUserModal from './Admin/DeleteUserModal.vue';
import UpdateUserModal from './Admin/UpdateUserModal.vue';
import Table from './Table/Table.vue';

const headers =[{title:'Image', key:'image'}, {title:'Name', key:'name'}, {title:'Email', key:'email'},{title:'Phone', key:'phone'}, {title:'Actions', key:'actions'}]

const loadImage = (img)=>{
if(!img){
  return new URL('../public/defaultUserImage.jpg', import.meta.url).href 
}
 return new URL(origin + '/api/resource/'+ img, import.meta.url).href
}

useFetch({url:"artist", method:"GET"}).then((res)=>{


Object.entries(res)?.map((el)=>{
        data?.value.push({userId:el[0], ...el[1]})
      })
})
console.log(data.value);

</script>

<template>
  <div class="mt-10 flex size-full justify-center">
    <Table
      :headers="headers"
      :data="data"
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h1 class="text-2xl text-gray-800">
            Artists Management
          </h1> 
          <div class="btn flex flex-row items-center gap-1">
            Create 
            <Icon
              icon="add"
              class="text-md pt-0.5"
            />
          </div>
        </div>
      </template>
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
          <UpdateUserModal :data="row" />
          <DeleteUserModal :user-id="row.userId" />
        </div>
      </template>
    </Table>
  </div>
</template>
