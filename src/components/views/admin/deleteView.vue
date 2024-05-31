<template>
  <h1>Страница удаления</h1>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import VueCookies from 'vue-cookies';
import toast from 'vue3-toastify';

import apiService from '@/services/apiService';

const id = useRoute().params.id;

onMounted(async () => {
  try {
    if (!VueCookies.get('token')) {
      toast.error('Вы не авторизованы');
      window.location.href = '/';
    }
    const response = await apiService.delete('/api/product/' + id);
    console.log(response.data);
    toast.success("Товар был удален");
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
});

</script>

<style scoped>
</style>