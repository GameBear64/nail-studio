<script setup>
import Table from './Table.vue';
</script>

<template>
  <div class="mt-10 flex size-full justify-center">
    <Table
      table-name="Artists Management"
      :headers="['Image', 'Name', 'Email', 'Phone', 'Actions']"
      :actions="[
        { icon: 'edit_square', styles: 'text-gray-800', action: () => {} },
        { icon: 'delete', styles: 'text-red-600', action: () => {} },
      ]"
      :data="[['CX', 'Catherine Nikiforova', 'catxrin@gmail.com', '0899999999']]"
    />
  </div>
</template>
