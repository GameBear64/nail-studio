<script setup>
const props= defineProps(["target"])
</script>

<template>
  <Portal
    :target="props.target"
    class="m-auto flex size-full items-center justify-center rounded bg-red-300"
  >
    <div class="absolute flex min-h-96 min-w-96 items-center justify-center rounded bg-pink-100">
      <div class="flex flex-col">
        <p> Are you sure you want to delete this user?</p>
        <div class="flex flex-row justify-center gap-5">
          <button class="btn-outlined">
            Delete
          </button>
          <button class="btn-outlined">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </Portal>
</template>
