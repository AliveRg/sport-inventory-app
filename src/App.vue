<template>
  <div class="app-container">
    <nav class="nav-bar">
      <router-link to="/">Список</router-link>
      <router-link to="/inventory/new">Добавить</router-link>
    </nav>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<style>
.app-container {
  font-family: Arial, sans-serif;
}
.nav-bar {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background-color: #309d0b;
  color: white;
}
.nav-bar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}
.content {
  padding: 1rem;
}
</style>
