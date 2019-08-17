<template>
  <div class="page-wrapper">
    <div class="page-nav">
      <router-link :to="{ name: 'page-2' }">prev</router-link>
      <router-link :to="{ name: 'page-1' }">next</router-link>
    </div>
    <div class="page-content">
      Page 3
    </div>
  </div>
</template>
