<script setup>
import { ref } from 'vue';

import Table from '../components/Table.vue';
import useFetch from '../toolbox/useFetch';

const procedures = ref([]);

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Duration', key: 'duration' },
  { title: 'Price', key: 'price' },
];

useFetch({ url: '/procedures', method: 'GET' }).then((res) => (procedures.value = res));
</script>

<template>
  <div class="flex size-full flex-col">
    <div class="flex h-80 w-screen items-center justify-center bg-[url(../../public/flowers.jpg)] bg-center">
      <p
        class="text-bold text-md flex size-full items-center justify-center px-2 py-4 text-center italic text-pink-50 backdrop-brightness-50 sm:text-2xl">
        Explore all the nail treatments we offer – from classic manicures to advanced nail art, we've got something for every
        style.
      </p>
    </div>
    <div class="flex size-full justify-center py-20">
      <Table class="w-[60rem] shadow-sm" :headers="headers" :data="procedures">
        <template #duration="{ row }">
          <p>{{ row.duration }}min</p>
        </template>
        <template #price="{ row }">
          <p>{{ row.price }}lv</p>
        </template>
      </Table>
    </div>
  </div>
</template>
