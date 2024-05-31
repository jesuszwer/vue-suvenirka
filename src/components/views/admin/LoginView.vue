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
import apiService from '@/services/apiService';
import vuecookies from 'vue-cookies';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const message = ref('');

    const login = async () => {
      try {
        const response = await apiService.post('/api/admin/login', {
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
        message.value = 'Неверное имя пользователя или пароль';
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