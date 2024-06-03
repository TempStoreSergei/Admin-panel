<template>
  <div class="flex items-center justify-between">
    <div class="relative">
      <button class="border-0 bg-transparent cursor-pointer" @click="toggleTooltip">
        <img :src="currentFlag" alt="flag" class="w-8 h-8 rounded-full" />
      </button>
      <div v-if="showTooltip" class="absolute mt-2 left-0 bg-white border border-gray-200 shadow-lg z-10 p-2">
        <ul class="list-none m-0 p-0">
          <li
            v-for="(lang, code) in languages"
            :key="code"
            class="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            @click="selectLanguage(code)"
          >
            <img :src="getFlagUrl(code)" :alt="lang" class="w-8 h-8 mr-2" />
            {{ lang }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = {
  gb: 'English',
  ru: 'Русский',
}

const getFlagUrl = (code: string) => {
  return `https://flagcdn.com/w320/${code}.png`
}

const currentFlag = computed(() => {
  return locale.value === 'gb' ? getFlagUrl('gb') : getFlagUrl('ru')
})

const showTooltip = ref(false)

const toggleTooltip = () => {
  showTooltip.value = !showTooltip.value
}

const selectLanguage = (code: string) => {
  locale.value = code === 'gb' ? 'gb' : 'ru'
  showTooltip.value = false
}
</script>

<style scoped>
.tooltip ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tooltip li {
  display: flex;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
}
</style>
