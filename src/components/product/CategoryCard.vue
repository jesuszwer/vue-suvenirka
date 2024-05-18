<template>
  <router-link class="category-card" :to="'/catalog/' + name">
    <div class="images">
      <img :src="images" alt="">
    </div>
    <div class="text">
      <p>{{ count }} товаров</p>
      <h4>{{ name }}</h4>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
  name: String,
  images: String,
  count: Number,
})

onMounted(() => {
  props
})

</script>

<style scoped>
.category-card {
  position: relative;
  min-width: 370px;
  max-height: 380px;
  background-color: #F0F0F0;
  border-radius: 22px;

  & .images {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & img {
      width: 210px;
      height: 270px;
      object-fit: contain;
      padding: 18px;
    }
  }

  & .text {
    display: flex;
    flex-direction: column;
    position: absolute;

    border-radius: 0 0 22px 22px;

    width: 100%;
    bottom: 0;
    padding-bottom: 36px;
    padding-top: 22px;
    padding-left: 22px;

    color: black;
    background: linear-gradient(to top, #ADADAD, #e1e1e100);
    & p {
      margin-bottom: 8px;
      font-size: 18px;
    }

    & h4 {
      font-size: 24px;
    }

  }
  transition: background 0.3s ease 0s;

  &:hover {
    &::after {
      opacity: 0.8;
    } 
  }

  &::after {
    border-radius: 22px;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, #adadad3e, #e1e1e100);
    transition: background 0.3s ease 0s;
    opacity: 0;
  }
}

@media (max-width: 1200px) {
  .category-card {
    min-width: 320px;
    max-height: 440px;
  }
}

@media (max-width: 992px) {
  .category-card {
    min-width: 310px;
    max-height: 390px;
  }
}

@media (max-width: 768px) {
  .category-card {
    min-width: 280px;
    max-height: 370px;
  }
}

@media (max-width: 576px) {
  .category-card {
    min-width: 160px;
    max-height: 260px;

    & .images img {
      padding: 28px !important;
    }
  }
}
</style>
