<template>
  <section>
    <h2>Вход в админку</h2>
    <form @submit.prevent="login">
      <label for="username">Имя пользователя: </label>
      <input type="text" v-model="username" required><br><br>
      <label for="password">Пароль: </label>
      <input type="password" v-model="password" required><br><br>
      <button type="submit">Войти</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </section>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import vuecookies from 'vue-cookies'

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const message = ref('');

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/admin/login', {
          username: username.value,
          password: password.value
        });
        message.value = response.data.message;
        if (response.data.success) {
          vuecookies.set('token', response.data.token);
          window.location.href = '/admin';
        } else {
          message.value = 'Неверное имя пользователя или пароль';
        }
      } catch (error) {
        console.error('Ошибка:', error);
        message.value = 'Произошла ошибка при попытке входа';
      }
    };

    return {
      username,
      password,
      message,
      login
    };
  }
};
</script>

<style scoped></style>