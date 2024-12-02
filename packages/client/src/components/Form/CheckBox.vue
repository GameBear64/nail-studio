<script setup>
const props = defineProps(["label"]);
</script>

<template>
  <div class="flex flex-row">
    <input type="checkbox" name="checkbox" id="checkbox" />
    <label :for="props.label">Hi</label>
  </div>
</template>
