<template>
  <div class="inventory-card">
    <div class="slider">
      <img :src="mainImage" alt="Главное фото" class="item-photo main-photo" />
      <div class="gallery">
        <div v-for="(image, index) in item.gallery" :key="index" class="gallery-item">
          <img
            :src="image"
            alt="Фото из галереи"
            @click="setMainImage(image)"
            class="gallery-photo"
          />
        </div>
        <div class="gallery-item">
          <img
            :src="item.avatar"
            alt="Фото из галереи"
            @click="setMainImage(item.avatar)"
            class="gallery-photo"
          />
        </div>
      </div>
    </div>
    <h2>{{ item.title }}</h2>
    <p>Категория: {{ item.category }}</p>
    <p>Цена: {{ item.price }} руб.</p>
    <p>Количество: {{ item.count }}</p>
    <router-link :to="'/inventory/' + item.id">Подробнее</router-link>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

// Создаем переменную для главного изображения
const mainImage = ref(props.item.avatar)

const setMainImage = (image) => {
  mainImage.value = image
}
</script>

<style scoped>
.inventory-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  background: white;
}

.slider {
  position: relative;
}

.main-photo {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.gallery {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.gallery-item {
  cursor: pointer;
  width: 50px;
  height: 50px;
}

.gallery-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}

h2,
p {
  margin-top: 0.5rem;
}
</style>
