<template>
  <header>
    <RouterLink to="/">
      <img src="@/assets/img/logo.svg" alt="logo">
    </RouterLink>
    <ul class="navbar">
      <li class="navitem">
        <router-link to="/catalog">Каталог</router-link>
      </li>
      <li class="navitem">
        <router-link to="/about">О нас</router-link>
      </li>
      <li class="navitem">
        <router-link to="/cart" style="font-weight: 500;">
          Корзина
        </router-link>
      </li>
    </ul>
    <div class="contact">
      <a href="tel:+77770803003" class="phone">
        +7 777 080 3003
      </a>
      <a href="mailto:suvenirka@artpool.kz" class="email">
        suvenirka@artpool.kz
      </a>
    </div>

    <nav class="sidebar" :class="{ 'active': isSidebarOpen }">
      <ul class="sidebar__list">
        <li class="navitem" @click="closeSidebar">
          <router-link to="/catalog">Каталог</router-link>
        </li>
        <li class="navitem" @click="closeSidebar">
          <router-link to="/about">О нас</router-link>
        </li>
        <li class="navitem" @click="closeSidebar">
          <router-link to="/cart">
            Корзина
            <i class="bi bi-cart"></i>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar__icons" :class="{ 'active': isSidebarOpen }" @click="toggleSidebar">
      <span></span>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};
</script>


<style scoped>
header {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 12px;

  margin-bottom: 32px;

  justify-content: space-between;
  align-items: center;

  & img {
    height: 100%;
  }
}

.contact {
  display: flex;
  flex-direction: column;
  text-align: right;

  & a {
    font-size: 20px;
    color: black;
    text-decoration: none;
  }

  & .phone {
    margin-bottom: 8px;
  }
}

.navbar {
  display: flex;
  flex-direction: row;

  & .navitem {
    font-size: 20px;
    text-decoration: none;
    color: black;

    margin-right: 32px;

    & a {
      text-decoration: none;
      color: black;
      font-size: 24px;

      &:hover {
        color: #a7a7a7;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 992px) {

  .contact,
  .navbar {
    display: none;
  }
}

.sidebar {
  display: none;
  flex-direction: column;
  position: fixed;

  height: 100%;
  width: 100%;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 49;
  overflow-y: auto;
  padding: 132px 140px;
  background-color: #fff;

  & ul {
    flex-direction: column;

    & li {
      list-style-type: none;
      margin-bottom: 28px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    & li a {
      text-decoration: none;
      color: #000;
      font-size: 28px;

      text-align: start;

      @media (max-width: 500px) {
        font-size: 20px;
      }

      &:hover {
        text-decoration: underline;
        color: #5a5a5a;
      }
    }
  }

  @media (max-width: 992px) {
    &.active {
      display: flex;
    }
  }
}

.sidebar__icons {
  display: none;
  position: relative;

  cursor: pointer;

  z-index: 50;
  align-items: center;
  justify-content: flex-end;
  width: 30px;
  height: 18px;

  & span {
    height: 2px;
    width: 100%;
    transform: scale(1);
    background-color: #a0a0a0;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: #a0a0a0;
    transition: all 0.3s ease 0s;
  }

  &::after {
    top: 0;
  }

  &::before {
    bottom: 0;
  }

  &.active {
    & span {
      transform: scale(0);
    }

    &::after {
      transform: rotate(-45deg);
      top: calc(50% - 1px);
    }

    &::before {
      transform: rotate(45deg);
      bottom: calc(50% - 1px);
    }
  }

  @media (max-width: 992px) {
    display: flex;
  }
}

@media screen and (max-width: 576px) {
  header {
    padding: 0 20px;

    & img {
      width: 94px;
    }

  }

  .sidebar {
    padding: 132px 80px;
  }
}
</style>