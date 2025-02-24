<script setup>
import Icon from '@components/Icon.vue';

import useFetch from '@tools/useFetch';

import { data, loadImage } from '../api/artists';

import CreateUserModal from './Admin/CreateUserModal.vue';
import DeleteUserModal from './Admin/DeleteUserModal.vue';
import UpdateUserModal from './Admin/UpdateUserModal.vue';
import Table from './Table/Table.vue';

const headers = [
  { title: 'Image', key: 'image' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Actions', key: 'actions' },
];

useFetch({ url: 'artist', method: 'GET' }).then((res) => {
  data.value = res;
});
</script>

<template>
  <div class="mt-10 flex size-full justify-center">
    <Table
      :headers="headers"
      :data="data"
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h1 class="text-xl text-gray-800 md:text-2xl">
            Artists Management
          </h1>

          <CreateUserModal />
        </div>
      </template>
      <template #image="{ row }">
        <img
          class="size-10 rounded-sm object-cover"
          :src="loadImage(row.picture)"
          alt="image"
        >
      </template>

      <template #actions="{ row }">
        <div class="flex flex-row justify-center gap-3">
          <UpdateUserModal :data="row" />
          <DeleteUserModal :user-id="row._id" />
        </div>
      </template>
    </Table>
  </div>
</template>
