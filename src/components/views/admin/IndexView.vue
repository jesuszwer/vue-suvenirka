<template>
  <h2>Панель менеджера</h2>
  <form ref="myForm" @submit.prevent="handleSubmit">
    <label for="name">Название продукта: </label>
    <input type="text" name="name" id="name"><br><br>

    <label for="description">Описание продукта: </label>
    <input type="textarea" id="description" name="description" required><br><br>

    <label for="price">Цена: </label>
    <input type="number" id="price" name="price" required><br><br>

    <label for="count">Количество: </label>
    <input type="number" id="count" name="count" required><br><br>

    <label for="category">Категория: </label>
    <input type="text" id="category" name="category" required><br><br>

    <label for="color">Цвет: </label>
    <input type="text" id="color" name="color" required><br><br>

    <label for="image">Image:</label>
    <input type="file" id="image" name="image" accept="image/*" required><br><br>

    <button type="">Submit</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '@/services/apiService';

const myForm = ref(null);
let isSubmitHandlerAdded = false;

const handleSubmit = (event) => {
  event.preventDefault(); // Останавливаем отправку формы

  // Собираем данные из формы
  const formData = new FormData(myForm.value);

  // Преобразуем основные данные формы в JSON
  const jsonData = {};
  formData.forEach((value, key) => {
    if (key !== 'image') { // Исключаем файл из JSON
      jsonData[key] = value;
    }
  });

  // Создаем новый объект FormData для отправки
  const dataToSend = new FormData();
  dataToSend.append('data', JSON.stringify(jsonData)); // Добавляем JSON данные
  dataToSend.append('image', formData.get('image')); // Добавляем изображение

  // Отправляем данные на сервер с использованием Axios
  apiService.post('/api/product', dataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log('Success:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

onMounted(() => {
  if (!isSubmitHandlerAdded) {
    myForm.value.addEventListener('submit', handleSubmit);
    isSubmitHandlerAdded = true;
  }
});
</script>

<style scoped></style>
