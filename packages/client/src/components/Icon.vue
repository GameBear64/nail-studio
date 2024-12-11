<script setup>
defineProps(['icon', 'clickable', 'fill', 'dense']);
</script>

<template>
  <span
    class="material-symbols-rounded"
    :class="{ 'cursor-pointer': clickable, 'tracking-tight': dense }"
    :style="`font-variation-settings: 'FILL' ${fill ? 1 : 0} `"
    :v-bind="$attrs"
  >
    {{ icon }}
  </span>
</template>
