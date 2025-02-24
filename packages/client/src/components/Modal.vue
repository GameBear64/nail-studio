<script setup>
import { useSlots } from 'vue';

import Icon from '@components/Icon.vue';

const props = defineProps(['title', 'close', 'easyClose']);
const slots = useSlots();
</script>

<template>
  <Teleport to="#teleport-target">
    <div
      class="absolute right-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-slate-500/40"
      @click.self="props.easyClose && props.close()"
    >
      <div
        class="bg-base text-primaryText w-auto min-w-[20em] max-w-[80vw] rounded-lg px-4 py-3 md:w-auto lg:max-w-[60vw] xl:w-auto"
      >
        <div
          class="flex justify-between pb-1"
          :class="props.title && 'border-pink-300 border-b-2'"
        >
          <p class="text-xl font-bold">
            {{ props.title }}
          </p>
          <button
            v-if="props.close"
            @click="props.close"
          >
            <Icon icon="close" />
          </button>
        </div>
        <div class="max-h-[80vh] overflow-auto py-2">
          <slot />
        </div>
        <div
          v-if="slots.buttons"
          class="flex justify-end gap-4 pt-4"
        >
          <slot name="buttons" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
