import { defineStore } from 'pinia'
import axios from 'axios'

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('inventoryItems')) || [],
  }),
  actions: {
    async fetchItems() {
      try {
        const { data } = await axios.get(
          'https://6712a5e16c5f5ced662443cb.mockapi.io/api/v2/inventories',
        )
        if (data.length > 0) {
          this.items = data
          localStorage.setItem('inventoryItems', JSON.stringify(data))
        } else {
          this.items = JSON.parse(localStorage.getItem('inventoryItems')) || []
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error)
        this.items = JSON.parse(localStorage.getItem('inventoryItems')) || []
      }
    },
    async addItem(item) {
      console.log(item.id)
      try {
        const { data } = await axios.post(
          'https://6712a5e16c5f5ced662443cb.mockapi.io/api/v2/inventories',
          item,
        )
        this.items.push(data)
        localStorage.setItem('inventoryItems', JSON.stringify(this.items))
        console.log(item.id)
      } catch (error) {
        console.error('Ошибка при добавлении товара:', error)
      }
    },
    async updateItem(updatedItem) {
      try {
        await axios.put(
          `https://6712a5e16c5f5ced662443cb.mockapi.io/api/v2/inventories/${updatedItem.id}`,
          updatedItem,
        )
        const index = this.items.findIndex((item) => item.id === updatedItem.id)
        if (index !== -1) {
          this.items[index] = updatedItem
          localStorage.setItem('inventoryItems', JSON.stringify(this.items))
        }
      } catch (error) {
        console.error('Ошибка при обновлении товара:', error)
      }
    },
    async deleteItem(id) {
      try {
        await axios.delete(`https://6712a5e16c5f5ced662443cb.mockapi.io/api/v2/inventories/${id}`)
        this.items = this.items.filter((item) => item.id !== id)
        localStorage.setItem('inventoryItems', JSON.stringify(this.items))
      } catch (error) {
        console.error('Ошибка при удалении товара:', error)
      }
    },
  },
})
