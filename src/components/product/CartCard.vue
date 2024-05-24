<template>

  <div class="cart-product">
    <div class="product-image">
      <img :src="product.images" alt="Product Image">
    </div>
    <div class="product-info">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-description">{{ product.description }}</div>
      <div class="product-price">{{ formatPrice(product.price) }} тг</div>
      <div class="product-quantity">Количество: {{ product.quantity }}</div>
      <div class="product-final-price">Итого: {{ formatPrice(final_price) }} тг</div>
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
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 22px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.product-image {
  background-color: #D9D9D9;
  border-radius: 22px;

  margin-right: 20px;
}

.product-image img {
  max-width: 238px;
  padding: 22px;
}

.product-info {
  flex: 1; 
}

.product-name {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.product-description {
  font-size: 18px;
  color: #757575;
  margin-bottom: 10px;
}

.product-price {
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 10px;
}

.product-quantity,
.product-final-price {
  font-size: 18px;
  margin-bottom: 5px;
}

.btn-remove {
  padding: 8px 16px;
  font-size: 18px;
  color: #fff;
  background-color: #f44336;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-remove:hover {
  background-color: #d32f2f;
}
</style>
