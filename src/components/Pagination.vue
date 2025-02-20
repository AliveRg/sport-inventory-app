<template>
  <div class="pagination">
    <button :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">Назад</button>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <button :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
      Вперёд
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue'

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits()

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  emit('page-changed', currentPage.value)

  // Плавная прокрутка до верха страницы
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

button:disabled {
  opacity: 0.5;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
