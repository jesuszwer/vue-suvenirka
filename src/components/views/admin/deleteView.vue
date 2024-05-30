<template>
  <h1>Страница удаления</h1>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import apiService from '@/services/apiService';

const id = useRoute().params.id;

onMounted(async () => {
  try {
    const response = await apiService.delete('/api/product/' + id);
    console.log(response.data);
    alert('Товар удален');
    window.location.href = '/';
  } catch (error) {
    console.error(error);
  }
});

</script>

<style scoped>
</style>