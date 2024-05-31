<template>
  <section class="catalog">
    <template v-if="category.length">
      <CategoryCard v-for="category in category" :key="category._id" :category="category.name" :name="category.name"
        :images="category.image" :count="category.count" />
    </template>
    <template v-else>
      <p class="none">Категорий нет</p>
    </template>
  </section>
</template>

<script setup>
import apiService from '@/services/apiService';
import CategoryCard from '@/components/product/CategoryCard.vue';
import { ref, onMounted } from 'vue';

// Определяем переменные состояния для хранения данных
const category = ref([]);

onMounted(async () => {
  try {
    const response = await apiService.get('/api/category');
    category.value = response.data.sort((a, b) => a.name.localeCompare(b.name));

  } catch (error) {
    console.error(error);
  }
});
</script>


<style scoped>
.none {
  margin: 0 auto;
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
}

.catalog {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  align-items: center;
  column-gap: 40px;
}
</style>