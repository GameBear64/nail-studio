<script setup>
import { deleteUser } from '../../api/artists';
import Modal from '../Modal.vue';

const props = defineProps(['onClose', 'userId']);
</script>
<template>
  <Modal :close="props.onClose">
    <p>Are you sure you want to delete this user?</p>
    <template #buttons>
      <button
        :onclick="() => deleteUser(props.userId)"
        class="btn-outlined bg-red-600 text-white"
      >
        Delete
      </button>
    </template>
  </Modal>
</template>
