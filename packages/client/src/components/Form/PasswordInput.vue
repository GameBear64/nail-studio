<script setup>
import Input from "./Input.vue";

const props = defineProps(["errors"]);
</script>

<template>
  <Input type="password" name="password" :errors="$props.errors" />
</template>
