<script setup>
import { ref, watch } from "vue";

const value = defineModel();
const points = ref(0);

watch(value, (password) => {
  if (password.length > 8) {
    points.value++;
    console.log("greater than 8!");
  }
  console.log(password.match(new RegExp("/\d/", "g")));
  if (password.match(new RegExp("/\d/", "g"))) {
    points.value++;
    console.log("there is a number!");
  }
});
</script>

<template>
  <div>
    <label class="font-medium" for="password">Password</label>
    <input id="password" v-bind="$attrs" type="password" v-model="value" />
  </div>
</template>
