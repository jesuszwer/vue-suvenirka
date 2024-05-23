<template>
  <div>
    <h1>Корзина</h1>
    <div v-if="cart.length === 0">Ваша корзина пуста.</div>
    <div v-else>
      <CartCard v-for="item in cart" :key="item.id" :product="item" @remove-from-cart="removeFromCart(item._id)" />
      <div>Итого: {{ total }} тг</div>
      <button @click="removeAllFromCart(item)">Удалить все</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CartCard from '@/components/product/CartCard.vue';

const cart = ref([]);

onMounted(() => {
  // Загружаем корзину из localStorage при монтировании компонента
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.value = savedCart;

  console.log(cart.value);
});

// Вычисляем общую сумму корзины
const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const removeFromCart = (item) => {
  const index = cart.value.findIndex(i => i.id === item.id);
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity -= 1; // Уменьшаем количество на 1
    } else {
      cart.value.splice(index, 1); // Удаляем товар из корзины, если количество стало равным 0
    }
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }
};

const removeAllFromCart = (item) => {
  const index = cart.value.indexOf(item);
  if (index !== -1) {
    cart.value.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }
};

</script>


<style scoped></style>