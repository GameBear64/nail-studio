<script setup>
import CreateUserModal from '@components/Admin/Artists/CreateUserModal.vue';
import DeleteUserModal from '@components/Admin/Artists/DeleteUserModal.vue';
import UpdateUserModal from '@components/Admin/Artists/UpdateUserModal.vue';
import Table from '@components/Table.vue';

import { data, loadImage, readAllArtists } from '@api/artists';

const headers = [
  { title: 'Image', key: 'image' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Actions', key: 'actions' },
];

readAllArtists();
</script>

<template>
  <div class="m-auto mt-10 flex max-w-3xl flex-col justify-center">
    <div class="my-4 flex flex-row justify-between">
      <h1 class="text-xl text-gray-800 md:text-2xl">
        Artists Management
      </h1>

      <CreateUserModal />
    </div>

    <Table
      :headers="headers"
      :data="data"
    >
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
