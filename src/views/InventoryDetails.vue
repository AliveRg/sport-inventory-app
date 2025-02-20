<template>
  <div v-if="item">
    <img :src="item.avatar" alt="Фото" class="item-photo" />
    <div class="gallery-item">
      <img
        v-for="(image, index) in item.gallery"
        :key="index"
        :src="image"
        alt="Фото из галереи"
        @click="setMainImage(image)"
        class="gallery-photo"
      />
    </div>
    <h1>{{ item.title }}</h1>
    <p>Категория: {{ item.category }}</p>
    <p>Цена: {{ item.price }}</p>
    <p>Количество: {{ item.count }}</p>
    <p>{{ item.description }}</p>
    <button @click="router.push(`/inventory/${item.id}/edit`)">Редактировать</button>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '../stores/inventoryStore'

const route = useRoute()
const router = useRouter()
const inventory = useInventoryStore()
const item = ref(null)

onMounted(() => {
  inventory.fetchItems().then(() => {
    if (!inventory.items.length) {
      inventory.items = JSON.parse(localStorage.getItem('inventoryItems')) || []
    } else {
      item.value = inventory.items.find((i) => i.id == route.params.id) || {}
    }
  })
})
</script>

<style scoped>
.gallery-item {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
}
.gallery-photo {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
}
</style>
