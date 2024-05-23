<template>
  <div class="container">
    <CartCard :product="product"></CartCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CartCard from '../product/CartCard.vue';
import apiService from '@/services/apiService';

const product = ref({});

onMounted(async () => {
  try {
    const response = await apiService.get(`/api/product/664790f9353317f07f18b2a3`);
    product.value = response.data;
    console.log(product.value);
  } catch (error) {
    console.error(error);
  }
});


</script>

<style scoped>
.container {
  margin-top: 80px;
  padding: 20px;
}
</style>