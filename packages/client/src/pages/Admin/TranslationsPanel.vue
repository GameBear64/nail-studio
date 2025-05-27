<script setup>
import Icon from '@components/Icon.vue';
import Table from '@components/Table.vue';

import { data, readAllTranslations } from '@api/translations';

import DeleteTranslationModal from '../../components/Admin/Translations/DeleteTranslationModal.vue';
import UpsertTranslationModal from '../../components/Admin/Translations/UpsertTranslationModal.vue';

const headers = [
  { title: 'Bulgarian', key: 'bulgarian' },
  { title: 'English', key: 'english' },
  { title: 'Actions', key: 'actions' },
];

readAllTranslations();
</script>
<template>
  <div class="m-auto mt-10 flex max-w-3xl flex-col justify-center">
    <div class="my-4 flex flex-row justify-between">
      <h1
        v-i18n
        class="text-xl text-gray-800 md:text-2xl"
      >
        Translations
      </h1>

      <UpsertTranslationModal>
        <template #trigger="{ click }">
          <div
            :onclick="click"
            class="btn flex cursor-pointer flex-row items-center gap-1"
          >
            <span v-i18n>Add</span>
            <Icon
              icon="add"
              class="text-sm md:pt-0.5 md:text-base"
            />
          </div>
        </template>
      </UpsertTranslationModal>
    </div>

    <Table
      :headers="headers"
      :data="data"
    >
      <template #actions="{ row }">
        <div class="flex flex-row justify-center gap-3">
          <UpsertTranslationModal :data="row">
            <template #trigger="{ click }">
              <Icon
                clickable
                :onclick="click"
                class="text-gray-800"
                icon="edit_square"
              />
            </template>
          </UpsertTranslationModal>
          <DeleteTranslationModal :id="row._id" />
        </div>
      </template>
    </Table>
  </div>
</template>
