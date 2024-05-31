<template>
  <section>
    <h2>Панель менеджера</h2>
    <form ref="myForm" @submit.prevent="handleSubmit" id="myForm">
      <label for="name">Название продукта: </label>
      <input type="text" name="name" id="name" value="" min="3" max="255" placeholder="Название продукта" required>

      <label for="description">Описание продукта: </label>
      <textarea id="description" name="description" placeholder="Описание продукта" max="500" required/>

      <label for="category">Категория: </label>
      <input type="text" id="category" name="category" placeholder="Категория продукта" min="3" max="500" required>

      <label for="price">Цена: </label>
      <input type="number" id="price" name="price" placeholder="Цена продукта" min="0" required>

      <label for="color">Цвет: </label>
      <select name="color" id="color" value="none">
        <option value="Белый">Белый</option>
        <option value="Черный">Черный</option>
        <option value="Красный">Красный</option>
        <option value="Зеленый">Зеленый</option>
        <option value="Синий">Синий</option>
        <option value="Фиолетовый">Фиолетовый</option>
        <option value="Желтый">Желтый</option>
        <option value="Оранжевый">Оранжевый</option>
        <option value="Розовый">Розовый</option>
        <option value="Серый">Серый</option>
        <option value="Бежевый">Бежевый</option>
        <option value="Коричневый">Коричневый</option>
        <option value="Бирюзовый">Бирюзовый</option>
        <option value="none">none</option>
      </select>

      <div class="additional-properties" id="additional-properties">
        <label>Дополнительные характеристики:</label>
        <div v-for="(property, index) in additionalProperties" :key="index" style="margin-bottom: 12px;">
          <input type="text" v-model="property.name" placeholder="Название характеристики" >
          <input type="text" v-model="property.value" placeholder="Значение характеристики" >
          <button class="remove" type="button" @click="removeProperty(index)">Удалить</button>
          <hr>
        </div>
        <button class="add" type="button" @click="addProperty">Добавить характеристику</button>
      </div>

      <label for="images">Изображение:</label>
      <input type="file" id="images" name="images" accept="images/*" required>

      <button type="submit">Сохранить продукт</button>
    </form>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import apiService from '@/services/apiService';
import VueCookies from 'vue-cookies';
import toast from 'vue3-toastify';

const myForm = ref(null);
const additionalProperties = ref([{ name: '', value: '' }]);

const addProperty = () => {
  additionalProperties.value.push({ name: '', value: '' });
};

const removeProperty = (index) => {
  additionalProperties.value.splice(index, 1);
};


const handleSubmit = (event) => {
  event.preventDefault(); // Останавливаем отправку формы

  // Собираем данные из формы
  const formData = new FormData(myForm.value);

  // Преобразуем основные данные формы в JSON
  const jsonData = {};
  formData.forEach((value, key) => {
    if (key !== 'images') { // Исключаем файл из JSON
      jsonData[key] = value;
    }
  });

  // Преобразуем дополнительные характеристики в объект
  jsonData.other_properties = {};
  additionalProperties.value.forEach(property => {
    jsonData.other_properties[property.name] = property.value;
  });

  // Создаем новый объект FormData для отправки
  const dataToSend = new FormData();
  dataToSend.append('data', JSON.stringify(jsonData)); // Добавляем JSON данные
  dataToSend.append('images', formData.get('images')); // Добавляем изображение

  // Отправляем данные на сервер с использованием Axios
  apiService.post('/api/product', dataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log('Success:', response.data);
      myForm.value.reset(); // Очистка формы
      additionalProperties.value = [{ name: '', value: '' }]; // Очистка дополнительных характеристик
      toast.success('Продукт успешно создан', { autoClose: 2000 });
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

// const handleSubmit = (event) => {
//   event.preventDefault(); // Останавливаем отправку формы

//   // Собираем данные из формы
//   const formData = new FormData(myForm.value);

//   // Преобразуем основные данные формы в JSON
//   const jsonData = {};
//   formData.forEach((value, key) => {
//     if (key !== 'images') { // Исключаем файл из JSON
//       jsonData[key] = value;
//     }
//   });

//   // Создаем новый объект FormData для отправки
//   const dataToSend = new FormData();
//   dataToSend.append('data', JSON.stringify(jsonData)); // Добавляем JSON данные
//   dataToSend.append('images', formData.get('images')); // Добавляем изображение

//   // Отправляем данные на сервер с использованием Axios
//   apiService.post('/api/product', dataToSend, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   })
//     .then(response => {
//       console.log('Success:', response.data);
//       document.getElementById('myForm').reset(); // Очистка формы
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// };

onMounted(() => {
  if (!VueCookies.get('token')) {
    window.location.href = '/admin/login';
  }
})
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  text-align: center;
  color: #333;

  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 600;
}

form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
}

input[type="text"],
input[type="textarea"],
input[type="number"],
select,
input[type="file"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="textarea"] {
  height: 80px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.additional-properties {
  margin-bottom: 20px; 
  

  .remove {
    background-color: rgb(255, 98, 98);
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;  
    margin-bottom: 8px;
  }

  .remove:hover {
    background-color: rgb(162, 61, 61);
  }

  .add {
    background-color: #4CAF50;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  .add:hover {
    background-color: #45a049;
  }

}

</style>
