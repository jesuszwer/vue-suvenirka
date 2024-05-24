<template>
  <section class="catalog">
    <template v-if="filteredProducts.length">
      <ProductCard v-for="product in filteredProducts" :key="product._id" :id="product._id" :name="product.name"
        :price="product.price" :oldprice="product.oldprice" :images="product.images" @add-to-cart="addToCart" />
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
const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);


onMounted(async () => {
  try {
    const response = await apiService.get('/api/product');
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const addToCart = (productId) => {
  const product = products.value.find(p => p._id === productId);
  console.log(product);
  if (product) {
    const cartItem = cart.value.find(item => item._id === productId);
    console.log(cartItem);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.value.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }
};

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