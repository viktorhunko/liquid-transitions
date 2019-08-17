<template>
  <div class="page-wrapper">
    <div class="page-nav">
      <router-link :to="{ name: 'page-1' }">prev</router-link>
      <router-link :to="{ name: 'page-3' }">next</router-link>
    </div>
    <div class="page-content">
      Page 2
    </div>
  </div>
</template>
