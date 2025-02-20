<template>
  <div class="editor-container">
    <h1>{{ isEdit ? 'Редактировать' : 'Добавить' }} инвентарь</h1>
    <div class="editor-card">
      <form @submit.prevent="saveItem" class="form">
        <div>
          <label for="avatar">Главное фото:</label>
          <input type="file" id="avatar" @change="handleAvatarChange" accept="image/*" />
          <div v-if="item.avatar">
            <img :src="item.avatar" alt="Главное фото" class="preview-photo" />
          </div>
        </div>

        <div>
          <label for="gallery">Галерея:</label>
          <input type="file" id="gallery" @change="handleGalleryChange" accept="image/*" multiple />
          <div v-if="item.gallery.length">
            <div v-for="(image, index) in item.gallery" :key="index" class="gallery-item">
              <img :src="image" alt="Фото из галереи" class="preview-photo" />
            </div>
          </div>
        </div>

        <input v-model="item.title" placeholder="Название" required minlength="3" />
        <input v-model="item.category" placeholder="Категория" required />
        <input v-model.number="item.price" type="number" placeholder="Цена" required min="1" />
        <input
          v-model.number="item.count"
          type="number"
          placeholder="Количество"
          required
          min="1"
        />
        <textarea
          v-model="item.description"
          placeholder="Описание (макс 255 символов)"
          maxlength="255"
        ></textarea>
        <br />
        <button type="submit">Сохранить</button>
        <button type="button" @click="deleteItem" v-if="isEdit">Удалить</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from '../stores/inventoryStore'

const route = useRoute()
const router = useRouter()
const inventory = useInventoryStore()
const isEdit = !!route.params.id
const item = ref({
  title: '',
  category: '',
  price: 0,
  count: 1,
  description: '',
  avatar: '',
  gallery: [],
})

onMounted(() => {
  console.log(isEdit)

  inventory.fetchItems().then(() => {
    if (!inventory.items.length) {
      inventory.items = JSON.parse(localStorage.getItem('inventoryItems')) || []
    }
    item.value = inventory.items.find((i) => i.id == route.params.id) || {}
  })
})

const saveItem = () => {
  console.log('itemAdd')

  if (isEdit) {
    inventory.updateItem(item.value)
  } else {
    inventory.addItem(item.value)
  }
  router.push('/')
}

const deleteItem = () => {
  if (confirm('Вы уверены, что хотите удалить этот элемент?')) {
    inventory.deleteItem(item.value.id)
    router.push('/')
  }
}

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    item.value.avatar = URL.createObjectURL(file)
  }
}

const handleGalleryChange = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    item.value.gallery = []
    for (let i = 0; i < files.length; i++) {
      item.value.gallery.push(URL.createObjectURL(files[i]))
    }
  }
}
</script>

<style>
.editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  padding: 10px;
  margin: 10px;
}

textarea {
  padding: 10px;
  margin: 10px;
}

.editor-card {
  width: 400px;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
}

.preview-photo {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}

.gallery-item {
  display: inline-block;
  margin-right: 10px;
}

.gallery-item img {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
}
</style>
