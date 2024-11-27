<script setup>
import { computed, reactive, ref, watch } from "vue";
import Icon from "../Icon.vue";
import { difficultyLevel, passwordRules } from "@tools/consts/consts";

const value = defineModel();
const passwordPoints = ref(0);
const messages = ref([]);
const state = reactive({ visibility: false });

watch(value, (password) => {
  messages.value = passwordRules.filter((rules) => !password.match(rules.rule));
  passwordPoints.value = passwordRules.length - messages.value.length + 1;
  console.log(difficultyLevel[passwordPoints.value]);
  // + 1, because of the labels and the progress element
});

const passwordVisibility = computed(() =>
  state.visibility ? "text" : "password"
);

const iconVisible = computed(() =>
  state.visibility ? "visibility" : "visibility_off"
);
</script>

<template>
  <div>
    <label class="font-medium" for="password">Password</label>
    <div class="flex flex-row relative items-center">
      <input
        id="password"
        class="relative pr-9"
        v-bind="$attrs"
        :type="passwordVisibility"
        v-model="value"
      />
      <Icon
        class="absolute right-0 mr-1.5"
        :onclick="() => (state.visibility = !state.visibility)"
        :icon="iconVisible"
      />
    </div>
    <div>
      <progress
        id="progress"
        class="flex w-full mt-1 [&::-webkit-progress-value]:rounded"
        :class="`[&::-webkit-progress-value]:${difficultyLevel[passwordPoints]?.bg}`"
        :value="passwordPoints"
        max="5"
      ></progress>
      <div class="flex flex-row justify-between text-sm">
        <p>
          {{ messages[0]?.message }}
        </p>
        <p
          class="font-medium items-end ml-auto"
          :class="difficultyLevel[passwordPoints]?.color"
        >
          {{ difficultyLevel[passwordPoints]?.difficulty }}
        </p>
      </div>
    </div>
  </div>
</template>
