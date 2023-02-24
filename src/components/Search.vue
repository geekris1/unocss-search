<script setup lang='ts'>
import { ref } from 'vue'
import { useHightlight } from '../hooks/useHightlight.hook'
const {highlight, kmp} = useHightlight()

const props = defineProps<{ data: string[] }>()
const emit = defineEmits<{
  (e: 'choose', item:string): void
}>()

const list = ref<string[]>([])
const htmls = ref<string[]>([])
function filterHandler(e: any): void {
  const pattern = e.target.value
  const ans: string[] = []
  const html: string[] = []
  props.data.forEach((text) => {
    if (kmp(text, pattern) > -1) {
      html.push(text)
      ans.push(highlight(text, pattern))
    }
  })
  htmls.value = html
  list.value = ans
  if(list.value.length === 0) emit('choose', '[unocss-reverse warning]: error input')
}
function choose(idx:number) {
  emit('choose', htmls.value[idx])
}
</script>

<template>
  <div w-200>
    <input
      h-16 p-2 w-full type="text" text-xl
      @input="filterHandler"
    >
    <div
      w-full overflow-auto max-h="360px"
      border-x="1px solid #88a" border-b="1px solid #88a"
    >
      <div
        v-for="(item, idx) of list" :key="idx"
        border-b="1xp solid #88a" h-14 p-2
        flex justify-left items-center
        transition-400
        hover:bg="#ccc" 
        v-html="item"
        @click="() => choose(idx)"
      />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
</style>
