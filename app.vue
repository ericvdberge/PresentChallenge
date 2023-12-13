<script setup lang="ts">
const { presents, openPresent } = usePresents()
</script>

<template>
  <div class="container">
    <div v-for="(present, idx) in presents" :key="idx">
        <img src="/present.jpeg" 
        @click="() => openPresent(idx)"
        :style="`width: ${80 * present.scale}px`"/>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: min(50%, 500px);
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  aspect-ratio: 1/1;
}
</style>
