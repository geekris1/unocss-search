<script setup lang='ts'>
import { ref, watch } from 'vue'
import { useHightlight } from '../hooks/useHightlight.hook'
const { highlight, kmp } = useHightlight()

const container = ref<HTMLElement | null>(null)

const props = defineProps<{ data: string[] }>()
const emit = defineEmits<{
  (e: 'choose', item: string): void
}>()

const list = ref<string[]>([])
const htmls = ref<string[]>([])
const inputValue = ref<string>("")
const chooseFlag = ref<boolean>(false)
watch(
  () => inputValue.value,
  n => !chooseFlag.value && inputHandler(n)
)

function inputHandler(e: string): void {
  const pattern = e
  list.value = []
  htmls.value = []
  props.data.forEach((text) => {
    if (kmp(text, pattern) > -1) {
      htmls.value.push(text)
      list.value.push(highlight(text, pattern))
    }
  })
  if (list.value.length === 0)
    emit('choose', inputValue.value)
}

let currentIdx = ref(-1)
function mouseEnterHandler(idx: number) {
  currentIdx.value = idx
  emit('choose', htmls.value[idx])
}
function choose(idx: number) {
  chooseFlag.value = true
  inputValue.value = htmls.value[idx]
  list.value = []
  htmls.value = []
  currentIdx.value = 0
}
document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 38:
      upArrow()
      break;
    case 40:
      downArrow()
      break;
    case 13:
      choose(currentIdx.value)
      break;
  }
});
function upArrow() {
  if (currentIdx.value <= 0) return
  currentIdx.value -= 1
  if (currentIdx.value > 2 && list.value.length > 6) {
    container.value!.scrollTop -= 60
  }
  mouseEnterHandler(currentIdx.value)
}
function downArrow() {
  if (currentIdx.value >= list.value.length - 1) return
  currentIdx.value += 1
  if (currentIdx.value > 5 && list.value.length > 6) {
    container.value!.scrollTop += 60
  }
  mouseEnterHandler(currentIdx.value)
}
</script>

<template>
  <div w-200>
    <input h-16 p-2 w-full type="text" text-xl v-model="inputValue"
      @input="e => { chooseFlag = false; currentIdx = -1; }">
    <div ref="container" w-full overflow-auto max-h="360px" border-x="1px solid #88a" border-b="1px solid #88a">
      <div v-for="(item, idx) of list" :key="idx" bg="#52525b" color="#fff" border-b="1xp solid #88a" h="60px" p-2 flex
        justify-left items-center transition-200 :class="{ select: idx === currentIdx }" v-html="item"
        @mouseenter="() => mouseEnterHandler(idx)" @click="() => choose(idx)" />
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.select {
  background-color: #171717;
}
</style>
