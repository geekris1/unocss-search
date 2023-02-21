<script  setup lang="ts">
import {} from 'vue'
import {generator} from "unocss-reverse"
console.log(generator('width:100px'))
</script>

<template>
  <div>111 </div>
  <div>{{ generator('width:100px') }}</div>
</template>

<style scoped></style>