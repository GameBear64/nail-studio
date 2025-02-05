<script setup>
const props = defineProps(['header', "headers", "data"]);
</script>

<template>
  <div class="flex max-w-[50rem] flex-col gap-3">
    <slot name="header">
      <h1 class="text-2xl text-gray-800">
        {{ props.header }}
      </h1>
    </slot>
    <div class="relative max-h-[40rem] overflow-y-auto">
      <table class="max-h-[40rem] overflow-y-auto border bg-white">
        <thead>
          <tr class="sticky -top-1 rounded bg-gray-100 text-gray-600">
            <th
              v-for="header in headers"
              :key="header.key"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
          >
            <td
              v-for="header in headers"
              :key="header.key"
            >
              <slot
                :name="header.key"
                :row="row"
              >
                {{ row[header.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped>
th {
  @apply font-normal !min-w-32 px-2 py-3 uppercase text-center;
}
td {
  @apply py-2 px-5 text-center;
}
tr {
  @apply border border-b-[1px];
}
</style>
