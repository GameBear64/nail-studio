import { ref } from 'vue';

import useFetch from '../toolbox/useFetch';

export const data = ref([]);

export const readAllTranslations = () =>
  useFetch({ url: 'translations', method: 'GET' }).then((res) => {
    data.value = res;
  });

export const createTranslation = (body) => {
  useFetch({ url: 'translations', method: 'POST', body }).then((res) => {
    data.value = [...data.value, res];
  });
};

export const updateTranslation = (id, body) => {
  delete body._id;

  useFetch({ url: 'translations/' + id, method: 'PATCH', body }).then((res) => {
    data.value[data.value.findIndex((p) => p._id === res._id)] = res;
  });
};

export const deleteTranslation = (id) => {
  useFetch({ url: 'translations/' + id, method: 'DELETE' }).then(() => {
    data.value = data.value.filter((p) => p._id != id);
  });
};
