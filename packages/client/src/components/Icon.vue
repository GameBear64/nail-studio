<script setup>
defineProps({ icon: String, clickable: Boolean, fill: Boolean, dense: Boolean });
</script>

<template>
  <span
    class="material-symbols-rounded select-none"
    :class="{ 'cursor-pointer': clickable, 'tracking-tight': dense }"
    :style="`font-variation-settings: 'FILL' ${fill ? 1 : 0} `"
  >
    {{ icon }}
  </span>
</template>
