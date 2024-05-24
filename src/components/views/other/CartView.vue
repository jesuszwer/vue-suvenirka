<template>
  <section>
    <h2>Корзина</h2>
    <div class="btn" v-if="cart.length === 0">Ваша корзина пуста.</div>
    <div v-else>
      <CartCard v-for="item in cart" :key="item._id" :product="item" @remove-from-cart="removeFromCart" />
      <hr>
      <div class="btn">
        <button @click="removeAllFromCart">Удалить все</button>
        <div class="total">Вся корзина: <b>{{ formatPrice(total) }} тг</b></div>
      </div>


      <div class="delivery">
        <form class="order-form" @submit.prevent="handleSubmit">
          <label for="name">Ваше имя</label>
          <input type="text" id="name" name="name" required>

          <label for="phone">Телефон</label>
          <input type="tel" id="phone" name="phone" placeholder="+7 999 99 99 999" required>

          <div class="delivery-options">
            <label>
              <input type="radio" name="delivery" value="pickup" required>
              Самовывоз
            </label>
            <label>
              <input type="radio" name="delivery" value="city-delivery">
              Доставка в крупные города по Казахстану (Курьерская служба DHL или Казпочта)
            </label>
            <label>
              <input type="radio" name="delivery" value="yandex-courier">
              Доставка через Яндекс-курьера по г. Алматы
            </label>
            <label>
              <input type="radio" name="delivery" value="individual">
              Индивидуальный расчет
            </label>
          </div>

          <button type="submit" class="submit-btn">Оформить заказ</button>
        </form>
      </div>


    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import CartCard from '@/components/product/CartCard.vue';

const cart = ref([]);

onMounted(() => {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.value = savedCart;
  console.log(cart.value);
});

const total = computed(() => {
  return cart.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const removeFromCart = (id) => {
  const index = cart.value.findIndex(i => i._id === id);
  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      cart.value[index].quantity -= 1;
    } else {
      cart.value.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }
};

const handleSubmit = () => {
  // Обработка данных формы
  event.preventDefault(); // предотвращает стандартное поведение отправки формы

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());

  // Получение данных из локального хранилища
  const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

  // Добавление корзины к данным формы
  const dataToSend = {
    ...formObject,
    cart: savedCart
  };

  // Отправка данных на сервер с использованием axios
  axios.post('http://localhost:3000/telegram', dataToSend) // замените на ваш URL
    .then(response => {
      console.log('Success:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const removeAllFromCart = () => {
  cart.value = [];
  localStorage.setItem('cart', JSON.stringify(cart.value));
};

const formatPrice = (price) => {
  if (price !== undefined && price !== null) {
    return price.toLocaleString('ru-RU').replace(/\s/g, '.');
  } else {
    return '.'; // Возвращаем пустую строку, если цена не определена
  }
};
</script>



<style scoped>
h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

hr {
  margin: 28px 12px 16px 12px;
}

.total {
  display: flex;
  font-size: 24px;
  text-align: end;
}

.btn {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 20px;

  & button {
    border-radius: 22px;
    background-color: #fff;
    border: 1px solid #000;
    padding: 8px 12px;
    cursor: pointer;
  }
}

.order-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-form label {
  display: block;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
}

.order-form input[type="text"],
.order-form input[type="tel"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px;
}

.order-form .delivery-options label {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  font-weight: normal;
  cursor: pointer;
  font-size: 18px;
}

.order-form .delivery-options input[type="radio"] {
  margin-right: 10px;
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

.submit-btn:hover {
  background-color: #555;
}
</style>