import { ref } from 'vue';

import useFetch from '../toolbox/useFetch';

export const data = ref([]);

export const readAllProcedures = () => {
  useFetch({ url: 'procedures', method: 'GET' }).then((res) => {
    data.value = res;
  });
};

export const createProcedure = (body) => {
  useFetch({ url: 'procedures/', method: 'POST', body }).then((res) => {
    data.value = [...data.value, res];
  });
};

export const updateProcedure = (id, body) => {
  delete body._id;

  useFetch({ url: 'procedures/' + id, method: 'PATCH', body }).then((res) => {
    data.value[data.value.findIndex((p) => p._id === res._id)] = res;
  });
};

export const deleteProcedure = (id) => {
  useFetch({ url: 'procedures/' + id, method: 'DELETE' }).then(() => {
    data.value = data.value.filter((p) => p._id != id);
  });
};
