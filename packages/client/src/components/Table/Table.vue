<script setup>
const props = defineProps(['header', 'headers', 'data']);
</script>

<template>
  <div class="flex min-w-10 max-w-[30rem] flex-col gap-3 md:max-w-[50rem]">
    <slot name="header">
      <h1 class="text-2xl text-gray-800">
        {{ props.header }}
      </h1>
    </slot>
    <div class="relative max-h-[40rem] min-w-10 max-w-[30rem] overflow-auto md:max-w-full">
      <table class="overflow-y-auto border bg-white">
        <thead>
          <tr class="sticky -top-1 rounded bg-gray-100 text-gray-600">
            <th
              v-for="tableHeader in headers"
              :key="tableHeader.key"
            >
              {{ tableHeader.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
          >
            <td
              v-for="tableHeader in headers"
              :key="tableHeader.key"
            >
              <slot
                :name="tableHeader.key"
                :row="row"
              >
                {{ row[tableHeader.key] }}
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
  @apply font-normal !min-w-20 md:!min-w-32 px-2 py-3 uppercase text-center;
}
td {
  @apply py-2 px-5 text-center;
}
tr {
  @apply border border-b-[1px];
}
</style>
