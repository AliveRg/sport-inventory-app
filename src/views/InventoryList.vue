<template>
  <div>
    <h1>Список инвентаря</h1>
    <div class="inventory-list">
      <InventoryItem v-for="item in paginatedItems" :key="item.id" :item="item" />
    </div>
    <Pagination
      :totalItems="inventory.items.length"
      :itemsPerPage="12"
      @page-changed="onPageChanged"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useInventoryStore } from '../stores/inventoryStore'
import InventoryItem from '../components/InventoryItem.vue'
import Pagination from '../components/Pagination.vue'

const inventory = useInventoryStore()
const currentPage = ref(1)
const itemsPerPage = 12

onMounted(() => {
  inventory.fetchItems().then(() => {
    if (!inventory.items.length) {
      inventory.items = JSON.parse(localStorage.getItem('inventoryItems')) || []
    }
  })
})

// Вычисляем, какие элементы показывать на текущей странице
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return inventory.items.slice(start, start + itemsPerPage)
})

// Обработчик изменения страницы
const onPageChanged = (page) => {
  currentPage.value = page
}
</script>

<style>
.inventory-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
