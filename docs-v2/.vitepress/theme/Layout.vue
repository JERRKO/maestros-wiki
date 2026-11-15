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
  <Layout>
    <template #sidebar-nav-after>
      <div class="mn-sidebar-footer">
        <div class="mn-sidebar-footer-label">Сообщество</div>
        <a
          class="mn-sidebar-social is-discord"
          href="https://discord.gg/jDbRN3Kgg"
          target="_blank"
          rel="noreferrer"
        >
          <span class="mn-sidebar-social-icon is-discord" aria-hidden="true">
            <svg viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
            </svg>
          </span>
          <span class="mn-sidebar-social-meta">
            <span class="mn-sidebar-social-title">Discord</span>
            <span class="mn-sidebar-social-sub">Наборы и рапорты</span>
          </span>
          <span class="mn-sidebar-social-arrow" aria-hidden="true">↗</span>
        </a>
        <a
          class="mn-sidebar-social is-telegram"
          href="https://t.me/GoreBoxMST"
          target="_blank"
          rel="noreferrer"
        >
          <span class="mn-sidebar-social-icon is-telegram" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.93 3.29a1.5 1.5 0 0 0-1.56-.21L2.94 10.1a1.45 1.45 0 0 0 .08 2.71l4.41 1.44 1.72 5.36a1.1 1.1 0 0 0 1.85.44l2.49-2.41 4.38 3.24a1.5 1.5 0 0 0 2.36-.88l2.7-15.2a1.5 1.5 0 0 0-1-1.51Zm-4.18 4.44-7.9 7.12-.31 3.28-1.26-3.93 9.47-6.47Z"/>
            </svg>
          </span>
          <span class="mn-sidebar-social-meta">
            <span class="mn-sidebar-social-title">Telegram</span>
            <span class="mn-sidebar-social-sub">Новости проекта</span>
          </span>
          <span class="mn-sidebar-social-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </template>
  </Layout>
</template>
