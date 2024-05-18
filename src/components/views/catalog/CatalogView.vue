<template>
  <section class="catalog">
    <template v-if="filteredProducts.length">
      <ProductCard v-for="product in filteredProducts" :key="product._id" :id="product._id" :name="product.name"
        :price="product.price" :oldprice="product.oldprice" :images="product.images" />
    </template>
    <template v-else>
      <p>Такой категории нету</p>
    </template>
  </section>
</template>

<script setup>
import apiService from '@/services/apiService';
import ProductCard from '@/components/product/ProductCard.vue';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

// Определяем переменные состояния для хранения данных
const products = ref([]);
const category = ref(useRoute().params.category); // Переменная состояния для хранения текущей категории

onMounted(async () => {
  try {
    const response = await apiService.get('/api/product');
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

// Создаем вычисляемое свойство для фильтрации продуктов по категории
const filteredProducts = computed(() => {
  const answer = products.value.filter(product => product.category === category.value);
  answer.sort((a, b) => a.name.localeCompare(b.name))
  return answer || [];
});
</script>


<style scoped>
.catalog {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  align-items: center;
  column-gap: 40px;
}
</style>