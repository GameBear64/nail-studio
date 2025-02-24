<script setup>
import { ref } from 'vue';

import { deleteUser } from '../../api/artists';
import Icon from '../Icon.vue';
import Modal from '../Modal.vue';

const props = defineProps(['userId']);
const open = ref(false);

const closeModal = () => {
  open.value = !open.value;
};
</script>
<template>
  <Icon
    clickable
    :onclick="() => (open = !open)"
    class="text-red-600"
    icon="delete"
  />
  <Modal
    v-if="open"
    :close="closeModal"
  >
    <p>Are you sure you want to delete this user?</p>
    <template #buttons>
      <button
        :onclick="
          () => {
            deleteUser(props.userId);
            closeModal();
          }
        "
        class="btn-outlined bg-red-600 text-white"
      >
        Delete
      </button>
    </template>
  </Modal>
</template>
