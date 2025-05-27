<script setup>
import CreateProceduresModal from '@components/Admin/Procedures/CreateProceduresModal.vue';
import DeleteProceduresModal from '@components/Admin/Procedures/DeleteProceduresModal.vue';
import UpdateProceduresModal from '@components/Admin/Procedures/UpdateProceduresModal.vue';
import Table from '@components/Table.vue';

import { data, readAllProcedures } from '@api/procedures';

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Duration', key: 'duration' },
  { title: 'Price', key: 'price' },
  { title: 'Actions', key: 'actions' },
];

readAllProcedures();
</script>

<template>
  <div class="m-auto mt-10 flex max-w-3xl flex-col justify-center">
    <div class="my-4 flex flex-row justify-between">
      <h1
        v-i18n
        class="text-xl text-gray-800 md:text-2xl"
      >
        Procedure Management
      </h1>

      <CreateProceduresModal />
    </div>

    <Table
      :headers="headers"
      :data="data"
    >
      <template #actions="{ row }">
        <div class="flex flex-row justify-center gap-3">
          <UpdateProceduresModal :data="row" />
          <DeleteProceduresModal :id="row._id" />
        </div>
      </template>
    </Table>
  </div>
</template>
