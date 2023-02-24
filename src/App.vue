 
<script setup lang="ts">
import { ref, computed } from 'vue'
import { generator } from 'unocss-reverse'
import  Search  from './components/Search.vue'
import {searchData} from './assets/data'
const message = ref('')
const transform = computed(() => {
   return generator(message.value)
})
const userChoose = (item:string) => {
   message.value = item
}
</script>

<template>
   <div w="100%" h="100%" flex justify-center items-center flex-col p="y-10">
      <Search 
         :data="searchData" 
         @choose="userChoose">
      </Search>
      <div v-if="transform">
         <h2>结果：</h2>
         <div>{{ transform }}</div>
      </div>
      <div v-else>
         <div v-if="message">
            <h2>当前值不对，或匹配错误！</h2>
            如果你输入的是一个合法的值，你可以再这里添加你的例子。
            <a href="https://github.com/geekris1/unocss-reverse/issues" target="_blank">issues</a>
            <div>
            </div>
         </div>
         <div v-else>
            <h2>正在开发中...</h2>

            你可以在<a href="https://github.com/geekris1/unocss-reverse"
               target="_blank"><b>unocss-reverse</b></a>查看现在支持的属性，进行体验。
         </div>
      </div>
   </div>
</template>

<style scoped></style>
