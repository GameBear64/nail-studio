<script setup>
import { ref } from 'vue';

import Icon from '@components/Icon.vue';
import Modal from '@components/Modal.vue';

import { deleteTranslation } from '../../../api/translations';

const props = defineProps(['id']);
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
    <p v-i18n>
      Are you sure you want to delete this translation?
    </p>
    <template #buttons>
      <button
        v-i18n
        :onclick="
          () => {
            deleteTranslation(props.id);
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
