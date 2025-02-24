<script setup>
import { ref, watch } from 'vue';

import { difficultyLevel, passwordRules } from '@tools/consts';

import PasswordInput from './PasswordInput.vue';

const value = defineModel();

const pp = ref(0); // Stands for "Password points"
const messages = ref([]);
const props = defineProps(['errors']);

watch(value, (password) => {
  messages.value = passwordRules.filter((rules) => !password.match(rules.rule));
  const hasRequired = messages.value.some((r) => r.required);

  if (hasRequired) {
    pp.value = 1;
  } else {
    pp.value = passwordRules.length - messages.value.length;
  }
});
</script>

<template>
  <div>
    <PasswordInput
      v-bind="$attrs"
      v-model="value"
      hide-errors
    />
    <div>
      <progress
        id="progress"
        class="mt-1 flex w-full"
        :class="difficultyLevel[pp]?.bg"
        :value="pp"
        :max="passwordRules.length"
      />
      <p
        v-if="errors"
        v-i18n
        class="text-error"
      >
        {{ props.errors }}
      </p>
      <div
        v-else
        class="flex h-4 flex-row justify-between text-sm"
      >
        <div
          v-if="pp > 0 && messages[0]"
          class="text-txtSecondary flex flex-row gap-1"
        >
          <p
            v-i18n
            class="font-semibold"
          >
            Hint:
          </p>
          <p v-i18n>
            {{ messages[0]?.message }}
          </p>
        </div>
        <p
          v-i18n
          class="ml-auto items-end font-medium"
          :class="difficultyLevel[pp]?.color"
        >
          {{ difficultyLevel[pp]?.difficulty }}
        </p>
      </div>
    </div>
  </div>
</template>
