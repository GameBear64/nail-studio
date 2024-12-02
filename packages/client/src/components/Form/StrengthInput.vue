<script setup>
import { ref, watch, useAttrs } from "vue";
import { difficultyLevel, passwordRules } from "@tools/consts/consts";
import PasswordInput from "./PasswordInput.vue";

const value = defineModel();

const pp = ref(0); // Stands for "Password points"
const messages = ref([]);
const props = defineProps(["errors"]);

const attrs = useAttrs();
const name = attrs.name.split("_").join(" ");

watch(value, (password) => {
  messages.value = passwordRules.filter((rules) => !password.match(rules.rule));
  const hasRequired = messages.value.some((r) => r.required);

  if (hasRequired) {
    pp.value = 1;
  } else {
    pp.value = passwordRules.length - messages.value.length + 1;
  }
});
</script>

<template>
  <div>
    <PasswordInput hide-errors v-bind="$attrs" v-model="value" :name="name" />
    <div>
      <progress
        id="progress"
        class="flex w-full mt-1"
        :class="difficultyLevel[pp]?.bg"
        :value="pp"
        max="5"
      ></progress>
      <p
        v-if="errors"
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
