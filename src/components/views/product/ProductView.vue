<template>
  <section>
    <div class="content">
      <div class="" style="width: 200px">

      </div>
      <div class="images">
        <img :src="product.images" alt="@assets/img/default.jpg">
      </div>
      <div class="info">
        <div class="main">
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
          <div class="color">
            <div v-if="product.color" class="color-circle" :style="{ backgroundColor: color() }"></div>
            <!-- <p v-if="product.color">{{ product.color }}</p> -->
          </div>
        </div>
        <div class="price">
          <p>{{ formatPrice(product.price) }} тг</p>
          <p v-if="product.oldprice" class="old">{{ formatPrice(product.oldprice) }} тг</p>
        </div>


        <button class="btn-add-to-cart" @click="addToCart">В корзину</button>
      </div>
    </div>


    <div class="other-properties">
      <h3>Другие характеристики</h3>
      <table>
        <thead>
          <tr>
            <th>Характеристика</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key) in product.other_properties" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '@/services/apiService';

const product = ref({});

const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
const id = useRoute().params.id;

onMounted(async () => {
  try {
    const response = await apiService.get(`/api/product/${id}`);
    product.value = response.data;
    console.log(product.value);
  } catch (error) {
    console.error(error);
  }
});

const formatPrice = (price) => {
  if (price !== undefined && price !== null) {
    return price.toLocaleString('ru-RU').replace(/\s/g, '.');
  } else {
    return '.'; // Возвращаем пустую строку, если цена не определена
  }
};

const addToCart = () => {
  if (product.value ) {
    const cartItem = cart.value.find(item => item._id === product.value._id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.value.push({ ...product.value, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart.value));
  }
};

const color = (() => {
  switch (product.value.color) {
    case 'Белый': return '#FFFFFF';
    case 'Черный': return '#000000';
    case 'Красный': return '#FF0000';
    case 'Зелый': return '#00FF00';
    case 'Синий': return '#0000FF';
    case 'Фиолетовый': return '#FF00FF';
    case 'Желтый': return '#FFFF00';
    case 'Оранжевый': return '#808080';
    case 'Розовый': return '#FFC0CB';
    case 'Серый': return '#808080';
    case 'Бежевый': return '#C0C0C0';
    case 'Коричневый': return '#808000';
    case 'Бюзовый': return '#808000';
    default: return 'none';
  }
})

</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid #bdbdbd;
}

.images {
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 52px;

  border: 1px solid #bdbdbd;
  border-top: 0px;
  border-bottom: 0px;

  & img {
    max-width: 100%;
  }
}

.info {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  padding: 32px;

  padding-bottom: 38px;
  /* Добавляем отступ снизу */

  & .main {
    display: flex;
    flex-direction: column;

    & h2 {
      margin-bottom: 20px;
      font-size: 32px;
    }

    & p {
      margin-bottom: 20px;
      font-size: 18px;
    }
  }

  & .price {
    display: flex;
    flex-direction: row;

    & p {
      margin-right: 20px;

      font-size: 24px;

      &.old {
        text-decoration: line-through;
        color: #bdbdbd;
        margin-right: 0;
      }
    }
  }

  & .btn-add-to-cart {
    width: 100%;
    max-width: 300px;
    padding: 12px;

    font-size: 20px;

    background-color: transparent;
    border: 1px solid #000;

    border-radius: 22px;

    margin-top: auto;

    cursor: pointer;

    transition: all 0.3s ease;

    &:hover {
      background-color: #f2f2f2;
    }
  }
}

.other-properties {
  margin: 20px 0;

  & h3 {
    margin-bottom: 10px;
    font-size: 20px;
  }

  & table {
    width: 100%;
    border-collapse: collapse;
  }

  & th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  & th {
    background-color: #f2f2f2;
  }
}

.color {
  display: flex;
  margin-bottom: 20px;
}

.color-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
}

@media (max-width: 768px) {
  .btn-add-to-cart {
    font-size: 16px !important;
    padding: 10px !important;
  }

  .info {
    padding: 18px !important;

    & .main h2 {
      font-size: 26px !important;
    }
  }
}
</style>