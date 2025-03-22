<script setup>
const props = defineProps(['headers', 'data']);
</script>

<template>
  <div class="overflow-auto">
    <table class="w-full border bg-white">
      <thead>
        <tr class="sticky -top-1 rounded bg-gray-100 text-gray-600">
          <th
            v-for="tableHeader in props.headers"
            :key="tableHeader.key"
          >
            {{ tableHeader.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.data"
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
</template>

<style lang="css" scoped>
th {
  @apply font-normal !min-w-20 md:!min-w-32 px-2 py-3 uppercase text-center;
}
td {
  @apply py-2 px-5 text-center;
}
tr {
  @apply border border-b;
}
</style>
