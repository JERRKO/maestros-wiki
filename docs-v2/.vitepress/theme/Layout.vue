<script setup>
import { onMounted, nextTick } from 'vue'
import { onContentUpdated } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {
  initSpotlight,
  initReadingProgress,
  updateReadingProgress,
  refreshScrollReveal,
  playPageTransition
} from './motion'

const { Layout } = DefaultTheme

onMounted(() => {
  initSpotlight()
  initReadingProgress()
  nextTick(() => {
    refreshScrollReveal()
    updateReadingProgress()
  })
})

onContentUpdated(() => {
  nextTick(() => {
    playPageTransition()
    refreshScrollReveal()
    updateReadingProgress()
  })
})
</script>

<template>
  <div class="mn-progress" aria-hidden="true">
    <div class="mn-progress-bar"></div>
  </div>
  <Layout />
</template>
