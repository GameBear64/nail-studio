        
        <script setup>
import Modal from '../Modal.vue';

        const props = defineProps(["onClose"])
        </script>
<template>
  <Modal
    :close="props.onClose"
  >
    <p>Are you sure you want to delete this user?</p>
    <template #buttons>
      <button class="btn-outlined bg-red-600 text-white">
        Delete
      </button>
    </template>
  </Modal>
</template>

