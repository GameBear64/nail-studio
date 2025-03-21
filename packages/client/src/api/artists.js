import { ref } from 'vue';

import useFetch from '../toolbox/useFetch';

export const data = ref([]);

export const deleteUser = (userId) => {
  useFetch({ url: 'artist/' + userId, method: 'DELETE' }).then(() => {
    data.value = data.value.filter((d) => d.userId != userId);
  })
};

export const updateUser = (userId, body) => {
  const userData = Object.assign(body);
  delete userData._id;

  useFetch({ url: 'artist/' + userId, method: 'PATCH', body: userData })
    .then((res) => {
      data.value[data.value.findIndex((user) => user._id === res._id)] = res;
    })
 
};

export const loadImage = (img) => {
  if (!img || img.length < 1) {
    return new URL('../public/defaultUserImage.jpg', import.meta.url).href;
  }
  return new URL(origin + '/api/resource/' + img, import.meta.url).href;
};

export const createUser = (body) => {
  useFetch({url:'artist/', method:'POST', body}).then(res=>{data.value = [...data.value, res]})
};
