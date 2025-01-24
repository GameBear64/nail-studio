<script setup>
import Icon from '@components/Icon.vue';

const props= defineProps(["target", "title", "close"])
</script>

<template>
  <Teleport
    :to="props.target"
  >
    <div
      v-if="!closeModal"
      class="fixed z-50 size-full bg-gray-950/40 drop-shadow-sm backdrop-blur-sm"
    >
      <div class="flex size-full items-center justify-center">
        <div class="flex max-w-96 flex-col rounded border bg-white px-5 py-2 drop-shadow-sm">
          <div class="flex justify-end">
            <Icon
              class="text-lg"
              :onclick="props.close"
              clickable
              icon="close"
            />
          </div>
          <div class="flex flex-col gap-5 p-2">
            <div class="flex flex-col gap-2">
              <p>
                {{ props.title }}
              </p>
              <slot name="content" />
            </div>
            <div class="flex flex-row justify-end gap-5">
              <button
                :onclick="props.close"
                class="btn-outlined"
              >
                Cancel
              </button>
              <slot name="buttons" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
