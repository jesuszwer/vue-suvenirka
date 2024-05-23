<template>
  <div class="cart-product">
    <div class="product-info">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-description">{{ product.description }}</div>
      <div class="product-price">{{ formatPrice(product.price) }} тг</div>
      <div class="product-quantity">Количество: {{ product.quantity }}</div>
      <div class="product-final-price">Итого: {{ formatPrice(final_price) }} тг</div>
    </div>
    <div class="product-image">
      <img :src="product.images" alt="Product Image">
    </div>
    <button @click="removeFromCart" class="btn-remove">Удалить</button>
  </div>
</template>

<script setup>
import { onMounted, defineProps, computed, defineEmits } from 'vue';

const props = defineProps({
  product: Object,
})

const emit = defineEmits(['remove-from-cart'])

onMounted(() => {
  props
});

const removeFromCart = () => {
  emit('remove-from-cart', props.product._id)
};

const final_price = computed(() => {
  return props.product.price * props.product.quantity
})

const formatPrice = (price) => {
  if (price !== undefined && price !== null) {
    return price.toLocaleString('ru-RU').replace(/\s/g, '.');
  } else {
    return '.'; // Возвращаем пустую строку, если цена не определена
  }
};
</script>

<style scoped>
.cart-product {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
}

.product-description {
  margin-top: 5px;
  font-size: 14px;
}

.product-price {
  margin-top: 5px;
  font-size: 16px;
}

.product-quantity {
  margin-top: 5px;
  font-size: 16px;
}

.product-final-price {
  margin-top: 5px;
  font-size: 16px;
}

.product-image img {
  width: 100px;
  height: auto;
  margin-left: 20px;
}

.btn-remove {
  margin-left: 20px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
