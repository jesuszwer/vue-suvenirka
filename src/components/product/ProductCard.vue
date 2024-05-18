<template>
  <router-link :to="'/product/' + id" class="product-card">
    <div class="img">
      <img :src="images" alt="">
      <div v-if="promo" class="promo">
        {{ promo }}
      </div>
    </div>
    <div class="text">
      <div class="name">
        {{ name }}
      </div>
      <div class="price">
        {{ price }} тг
      </div>
      <div v-if="oldprice" class="oldprice">
        {{ oldprice }} тг
      </div>
    </div>
    <div class="btn">
      <button :id="'cartAdd_' + id" @click.prevent="addToCart" class="btn-add-to-cart">
        В корзину
      </button>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, onMounted } from 'vue'

const props = defineProps({
  id: Number,
  images: String,
  promo: String,
  name: String,
  price: String,
  oldprice: String
})

onMounted(() => {
  props
})

function addToCart() {
  console.log(`addToCart ${props.id}`);
}

</script>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  max-width: 270px;
  max-height: 470px;

  text-decoration: none;
  color: #000;

  & .img {
    position: relative;
    background-color: #F0F0F0;
    border-radius: 22px;
  }

  & .img img {
    width: 270px;
    height: 330px;
    padding: 26px;
    object-fit: contain;
  }

  & .promo {
    position: absolute;
    top: 26px;
    left: 22px;
    color: white;
    background-color: #ff4a4a;
    padding: 8px 16px;
    border-radius: 22px;
  }

  & .text {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 20px;
    margin: 6px 0;
  }

  & .text .name {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 8px;
  }

  & .text .price {
    margin-bottom: 2px;
  }

  & .text .oldprice {
    font-size: 18px;
    opacity: 0.5;
    text-decoration: line-through;
  }

  & .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: auto;
  }

  & .btn .btn-add-to-cart {
    display: flex;
    font-size: 18px;
    background-color: transparent;
    border: 1px solid black;
    padding: 8px 28px;
    border-radius: 22px;
    cursor: pointer;

    transition: all 0.3s ease 0s;

    &:hover {
      background-color: #F0F0F0;
    }
  }
}

.mobile-btn-add-to-cart {
  display: none;
}

@media (max-width: 1200px) {
  .product-card {
    max-width: 250px;
    max-height: 440px;

    & .img img {
      padding: 28px;
      width: 250px;
      height: 310px;
    }
  }
}

@media (max-width: 992px) {
  .product-card {
    max-width: 220px;
    max-height: 390px;

    & .img img {
      padding: 32px;
      width: 220px;
      height: 280px;
    }

    & .text .name {
      font-size: 22px;
      margin-bottom: 2px;
    }
  }
}

@media (max-width: 768px) {
  .product-card {
    max-width: 180px;
    max-height: 340px;

    & .img img {
      padding: 22px;
      width: 180px;
      height: 240px;
    }

    & .text .name {
      font-size: 20px;
      margin-bottom: 2px;
    }

    & .text .price,
    .oldprice {
      font-size: 18px;
    }

  }
}

@media (max-width: 576px) {
  .product-card {
    max-width: 150px;
    max-height: 290px;

    & .img img {
      padding: 14px;
      width: 150px !important;
      height: 200px !important;
    }
     
    & .img .promo {
      font-size: 16px;
      top: auto;
      bottom: 16px;
      left: 28px;
    }

    & .text .name {
      font-size: 18px;
    }
  }

  & .btn .btn-add-to-cart {
    font-size: 18px !important;
    border-radius: 22px !important;
    background-color: transparent !important;
    border: 1px solid black !important;
    padding: 4px 20px !important;
  }
}
</style>
