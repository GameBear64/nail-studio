<script setup>
const props = defineProps(["icon"]);
</script>

<template>
  <span :v-bind="$attrs" class="material-symbols-rounded cursor-pointer">
    {{ icon }}
  </span>
</template>
