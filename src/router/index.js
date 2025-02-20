import { createRouter, createWebHistory } from 'vue-router'
import InventoryList from '../views/InventoryList.vue'
import InventoryEditor from '../views/InventoryEditor.vue'
import InventoryDetails from '../views/InventoryDetails.vue'

const routes = [
  { path: '/', component: InventoryList },
  { path: '/inventory/new', component: InventoryEditor },
  { path: '/inventory/:id', component: InventoryDetails },
  { path: '/inventory/:id/edit', component: InventoryEditor },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
