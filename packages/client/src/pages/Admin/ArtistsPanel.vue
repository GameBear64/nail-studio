<script setup>
import DeleteUserModal from '@components/Admin/Artists/DeleteUserModal.vue';
import UpsertUserModal from '@components/Admin/Artists/UpsertUserModal.vue';
import Icon from '@components/Icon.vue';
import Table from '@components/Table.vue';

import { data, loadImage, readAllArtists } from '@api/artists';
import { readAllProcedures } from '@api/procedures';

const headers = [
  { title: 'Image', key: 'image' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Phone', key: 'phone' },
  { title: 'Actions', key: 'actions' },
];

readAllArtists();
readAllProcedures();
</script>

<template>
  <div class="m-auto mt-10 flex max-w-3xl flex-col justify-center">
    <div class="my-4 flex flex-row justify-between">
      <h1 class="text-xl text-gray-800 md:text-2xl">Artists Management</h1>

      <UpsertUserModal>
        <template #trigger="{ click }">
          <div :onclick="click" class="btn flex cursor-pointer flex-row items-center gap-1">
            Create
            <Icon icon="add" class="text-sm md:pt-0.5 md:text-base" />
          </div>
        </template>
      </UpsertUserModal>
    </div>

    <Table :headers="headers" :data="data">
      <template #image="{ row }">
        <img class="size-10 rounded-sm object-cover" :src="loadImage(row.picture)" alt="image" />
      </template>

      <template #actions="{ row }">
        <div class="flex flex-row justify-center gap-3">
          <UpsertUserModal :data="row">
            <template #trigger="{ click }">
              <Icon clickable :onclick="click" class="text-gray-800" icon="edit_square" />
            </template>
          </UpsertUserModal>
          <DeleteUserModal :user-id="row._id" />
        </div>
      </template>
    </Table>
  </div>
</template>
