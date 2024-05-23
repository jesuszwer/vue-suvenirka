<template>
  <section class="banner">
    <img src="@/assets/img/banner.jpg" alt="banner img">
  </section>

  <section class="new">
    <h2>Новинки</h2>
    <div class="new-carousel">
      <template v-if="products.length">
        <ProductCard v-for="product in products" :key="product.id" :id="product._id" :name="product.name"
          :price="product.price" :oldprice="product.oldprice" :images="product.images" @add-to-cart="addToCart" />
      </template>
      <template v-else>
        <p>Товаров нет</p>
      </template>
    </div>
  </section>

  <section class="categories">
    <h2>Каталог</h2>
    <div class="categories-carusel">
      <template v-if="categories.length">
        <CategoryCard v-for="category in categories" :key="category._id" :name="category.name" :count="category.count"
          :images="category.image" />
      </template>
      <template v-else>
        <p>Категорий нет</p>
      </template>
    </div>

  </section>


</template>

<script setup>
import CategoryCard from '@/components/product/CategoryCard.vue';
import ProductCard from '@/components/product/ProductCard.vue';
import { ref, onMounted } from 'vue';

import apiService from '@/services/apiService';

const products = ref([]);
const categories = ref([]);
const cart = ref([])

onMounted(async () => {
  try {
    const response = await apiService.get('/api/product');
    products.value = response.data
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  } catch (error) {
    console.error('Error fetching products:', error);
  }


  try {
    const response = await apiService.get('/api/category');
    categories.value = response.data.sort((a, b) => a.name.localeCompare(b.name));
    console.log(categories.value);
  } catch (error) {
    console.error('Error fetching categories:', error);
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

// document.addEventListener('DOMContentLoaded', function () {
//   const carusel = document.querySelector('.hits-carusel');
//   const prevBtn = document.querySelector('.prev_btn');
//   const nextBtn = document.querySelector('.next_btn');

//   const item = carusel.querySelectorAll('.carusel_item');
//   const itemWidth = item[0].offsetWidth;
//   let currentIndex = 0;
//   let translateX = 0;

//   prevBtn.addEventListener('click', function () {
//     if (currentIndex > 0) {
//       currentIndex--;
//       translateX += itemWidth;
//       carusel.style.transform = `translateX(${translateX}px)`;
//     }
//   });

//   nextBtn.addEventListener('click', function () {
//     if (currentIndex < item.length - 1) {
//       currentIndex++;
//       translateX -= itemWidth;
//       carusel.style.transform = `translateX(${translateX}px)`;
//     }
//   });

// })

</script>

<style scoped>
.banner {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 0 auto;

  & img {
    width: 100%;
    border-radius: 22px;
    filter: brightness(0.6) contrast(1.1);
  }
}

.new {
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h2 {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 600;
  }

  & .new-carousel {
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    align-items: center;
    column-gap: 40px;
  }
}

.categories {
  display: flex;
  flex-direction: column;

  & h2 {
    margin-bottom: 20px;
    font-size: 32px;
    font-weight: 600;
  }

  & .categories-carusel {
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    align-items: center;
    column-gap: 40px;
  }
}

@media (max-width: 992px) {
  .new-carousel {
    justify-content: center !important;
  }

  .categories-carusel {
    justify-content: center !important;
  }
}
</style>
