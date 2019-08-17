<template>
  <div class="page-wrapper">
    <div class="page-nav">
      <router-link :to="{ name: 'page-3' }">prev</router-link>
      <router-link :to="{ name: 'page-2' }">next</router-link>
    </div>
    <div class="page-content">
      Page 1
    </div>
  </div>
</template>
