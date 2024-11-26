<script setup>
import { ref, watch } from "vue";
import { difficultyLevel } from "../../toolbox/consts/consts";

const value = defineModel();
const passwordPoints = ref(0);
const difficulty = ref(difficultyLevel[1]);
const message = ref("");

const color = () => {
  if (passwordPoints.value < 1) {
    difficulty.value = difficultyLevel[1];
  }
  if (passwordPoints.value > 1 && passwordPoints.value < 3) {
    difficulty.value = difficultyLevel[2];
  }
  if (passwordPoints.value >= 3) {
    difficulty.value = difficultyLevel[3];
  }
};

watch(value, (password) => {
  let points = 0;

  if (password.length > 8) {
    points++;
    if (password.match(/(?=.*[a-z])(?=.*[A-Z])/g)) {
      points++;
    } else {
      message.value = "Optional: At least one upper and lower case";
    }
    if (password.match(/\d/g)) {
      points++;
    } else {
      message.value = "Optional: At least one number";
    }
    if (password.match(/[$&+,:;=?@#|'<>.^*()%!-]/g)) {
      points++;
    } else {
      message.value = "Optional: At least one special character";
    }
  } else {
    return (message.value = "Required: At least 8 characters");
  }

  passwordPoints.value = points;
  color();
});
</script>

<template>
  <div>
    <label class="font-medium" for="password">Password</label>
    <input id="password" v-bind="$attrs" type="password" v-model="value" />
    <div>
      <progress
        id="progress"
        :class="`flex w-full mt-1 [&::-webkit-progress-value]:${difficulty.bg} [&::-webkit-progress-value]:rounded`"
        :value="passwordPoints"
        max="4"
      ></progress>
      <div v-if="message.length > 1" class="flex flex-row justify-between">
        <p v-if="difficultyLevel.difficulty != 'Good'" class="text-sm">
          {{ message }}
        </p>
        <p :class="`text-sm font-medium items-end ml-auto ${difficulty.color}`">
          {{ difficulty.difficulty }}
        </p>
      </div>
    </div>
  </div>
</template>
