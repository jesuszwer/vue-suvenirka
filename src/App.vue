<template>
  <div class="container">
    <HeaderComponent />
    <router-view></router-view>
  </div>
  <FooterComponent />

</template>

<script setup>
import HeaderComponent from './components/views/particles/headerComponent';
import FooterComponent from './components/views/particles/footerComponent';


</script>

<style></style>
