<script setup>
import { computed, reactive, ref, watch } from "vue";
import { difficultyLevel, passwordRules } from "@tools/consts/consts";
import Icon from "../Icon.vue";

const value = defineModel();

const pp = ref(0); // Stands for "Password points"
const messages = ref([]);
const props = defineProps(["errors"]);

const state = reactive({ visibility: false });

watch(value, (password) => {
  if (!password.match(/^.{8,}$/)) {
    pp.value = 1;
    return (messages.value = [{ message: "At least 8 characters" }]);
  }
  messages.value = passwordRules.filter((rules) => !password.match(rules.rule));
  pp.value = passwordRules.length - messages.value.length + 2;
  // + 2, because of the labels and the progress element
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
        :clickable="true"
      />
    </div>
    <div>
      <progress
        id="progress"
        class="flex w-full mt-1"
        :class="difficultyLevel[pp]?.bg"
        :value="pp"
        max="5"
      ></progress>
      <p
        v-if="errors && value.length < 8"
        class="text-red-600 leading-none text-sm h-4 mt-1 font-medium"
      >
        {{ props.errors }}
      </p>
      <div v-else class="flex flex-row justify-between h-4 text-sm">
        <div
          v-if="pp > 0 && messages[0]"
          class="flex flex-row gap-1 text-txtSecondary"
        >
          <p class="font-semibold">Hint:</p>
          <p>{{ messages[0]?.message }}</p>
        </div>
        <p
          class="font-medium items-end ml-auto"
          :class="difficultyLevel[pp]?.color"
        >
          {{ difficultyLevel[pp]?.difficulty }}
        </p>
      </div>
    </div>
  </div>
</template>
