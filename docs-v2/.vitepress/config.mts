import { defineConfig, type DefaultTheme } from 'vitepress'

function buildSidebar(mode: 'default' | 'vs-rf' | 'chri'): DefaultTheme.SidebarItem[] {
  const expandVsRf = mode === 'vs-rf'
  const expandChri = mode === 'chri'

  return [
    {
      items: [
        { text: 'Главная страница', link: '/' },
        { text: 'Команда проекта', link: '/team' }
      ]
    },
    {
      text: 'ЧЕЧНЯ РП',
      items: [
        { text: 'ПРАВИЛА ЧЕЧНЯ РП', link: '/chechnya-rp/rules' },
        { text: 'Система званий и заслуг', link: '/chechnya-rp/ranks' }
      ]
    },
    {
      text: 'ФРАКЦИИ И ПОДРАЗДЕЛЕНИЯ',
      items: [
        {
          text: 'ВС РФ',
          link: '/factions/vs-rf',
          collapsed: expandChri,
          items: [
            {
              text: 'Архитектура ВС РФ',
              link: '/factions/vs-rf-architecture',
              collapsed: !expandVsRf,
              items: [
                { text: 'Штаб (Командование)', link: '/factions/vs-rf-guides/shtab' },
                { text: 'МСВ (Мотострелки)', link: '/factions/vs-rf-guides/msv' },
                { text: 'Бронегруппа / РМО', link: '/factions/vs-rf-guides/rmo' },
                { text: 'Комендатура', link: '/factions/vs-rf-guides/komendatura' },
                { text: 'Особый отдел (ФСБ)', link: '/factions/vs-rf-guides/fsb' },
                { text: 'Спецназ ГРУ', link: '/factions/vs-rf-guides/gru' }
              ]
            },
            { text: 'Устав ВС РФ', link: '/factions/vs-rf-ustav' }
          ]
        },
        {
          text: 'ЧРИ',
          link: '/factions/chri',
          collapsed: expandVsRf,
          items: [
            {
              text: 'Архитектура ЧРИ',
              link: '/factions/chri-architecture',
              collapsed: !expandChri,
              items: [
                { text: 'Штаб (Совет командиров)', link: '/factions/chri-guides/shtab' },
                { text: 'Гвардия', link: '/factions/chri-guides/gvardiya' },
                { text: 'Отряды полевых командиров', link: '/factions/chri-guides/otryady' },
                { text: 'Ополчение', link: '/factions/chri-guides/opolchenie' },
                { text: 'ДГБ и Шариатская гвардия', link: '/factions/chri-guides/dgb' },
                { text: 'Диверсионные группы и тыл', link: '/factions/chri-guides/diversionnye' }
              ]
            },
            { text: 'Устав ЧРИ', link: '/factions/chri-ustav' }
          ]
        }
      ]
    }
  ]
}

export default defineConfig({
  base: '/maestros-wiki/v2/',
  lang: 'ru-RU',
  title: 'MAESTROS PROJECT',
  description: 'Официальная вики, правила и фракции проекта MAESTROS PROJECT',
  appearance: 'force-dark',
  cleanUrls: true,
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Manrope:wght@600;700;800&display=swap'
      }
    ]
  ],
  themeConfig: {
    logo: { src: '/images/mst_logo.jpg', alt: 'MST' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск...',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            noResultsText: 'Ничего не найдено по запросу',
            resetButtonTitle: 'Сбросить поиск',
            footer: {
              selectText: 'выбрать',
              navigateText: 'навигация',
              closeText: 'закрыть'
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: 'На этой странице'
    },
    docFooter: {
      prev: 'Назад',
      next: 'Далее'
    },
    nav: [
      { text: 'Discord', link: 'https://discord.gg/jDbRN3Kgg' },
      { text: 'Telegram', link: 'https://t.me/GoreBoxMST' }
    ],
    sidebar: {
      '/factions/vs-rf': buildSidebar('vs-rf'),
      '/factions/chri': buildSidebar('chri'),
      '/': buildSidebar('default')
    },
    footer: {
      message: 'Официальная документация MAESTROS PROJECT',
      copyright: 'MAESTROS PROJECT © 2026'
    }
  }
})
