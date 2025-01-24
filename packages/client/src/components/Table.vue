<script setup>
import Icon from '@components/Icon.vue';

const props = defineProps(['tableName', 'headers', 'data', 'actions']);
</script>
<template>
  <div class="flex max-w-[50rem] flex-col gap-3">
    <h1 class="text-2xl text-gray-800">
      {{ props.tableName }}
    </h1>
    <div class="relative max-h-96 overflow-y-auto">
      <table class="max-h-96 overflow-y-auto border bg-white">
        <tr class="sticky -top-1 rounded bg-gray-100 text-gray-600">
          <th
            v-for="header in props.headers"
            :key="header"
          >
            {{ header }}
          </th>
        </tr>
        <tr
          v-for="el in props.data"
          :key="el"
        >
          <td
            v-for="val in el"
            :key="val"
          >
            {{ val }}
          </td>
          <td>
            <div class="flex flex-row justify-center gap-3">
              <Icon
                v-for="action in actions"
                clickable
                :onclick="action?.action"
                :class="action?.styles"
                :icon="action.icon"
              />
            </div>
          </td>
        </tr>
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
