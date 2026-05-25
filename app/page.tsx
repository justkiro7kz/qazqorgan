"use client"

// src/app/page.tsx

import { ArrowRight, Menu, X } from "lucide-react"
import { useState } from "react"
interface Product {
  badge: string
  badgeClass: string
  title: string
  sub: string
  specs: string[][]
  code: string
  image?: string
}
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

.font-display { font-family: 'Space Grotesk', sans-serif; }

  .nav-link {
    position: relative;
    color: #334155;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 2px;
    background: #1d4ed8;
    transition: width 0.25s ease;
    border-radius: 2px;
  }
  .nav-link:hover { color: #1d4ed8; }
  .nav-link:hover::after { width: 100%; }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #1d4ed8;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 16px 36px;
    font-size: 0.8125rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
  }
  .btn-primary:hover {
    background: #1e40af;
    transform: scale(1.03);
    box-shadow: 0 8px 40px rgba(29, 78, 216, 0.4);
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: #fff;
    border: 1.5px solid rgba(255,255,255,0.35);
    border-radius: 50px;
    padding: 14px 36px;
    font-size: 0.8125rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.25s, border-color 0.25s;
  }
  .btn-outline:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.6);
  }

  .btn-nav {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #1d4ed8;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 10px 24px;
    font-size: 0.8rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.08em;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }
  .btn-nav:hover {
    background: #1e40af;
    box-shadow: 0 4px 20px rgba(29, 78, 216, 0.35);
  }

  .contact-input {
    width: 100%;
    border: 1.5px solid #e2e8f0;
    border-radius: 14px;
    padding: 15px 20px;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    color: #0a1628;
    background: #f8fafc;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    display: block;
  }
  .contact-input:focus {
    border-color: #1d4ed8;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(29, 78, 216, 0.08);
  }
  .contact-input::placeholder { color: #94a3b8; }

  .footer-link {
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    display: block;
    font-size: 0.9375rem;
    line-height: 1;
    transition: color 0.2s;
  }
  .footer-link:hover { color: #93c5fd; }

  .cat-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 48px;
  }
  .cat-tab {
    padding: 10px 22px;
    border-radius: 50px;
    border: 1.5px solid #dbeafe;
    background: #fff;
    color: #475569;
    font-size: 0.82rem;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  .cat-tab:hover { border-color: #1d4ed8; color: #1d4ed8; }
  .cat-tab.active {
    background: #1d4ed8;
    color: #fff;
    border-color: #1d4ed8;
  }

  .spec-card {
    background: #fff;
    border: 1.5px solid #dbeafe;
    border-radius: 20px;
    padding: 26px;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.2s;
  }
  .spec-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 50px rgba(29,78,216,0.1);
    border-color: #93c5fd;
  }
  .spec-badge {
    display: inline-block;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 50px;
    margin-bottom: 16px;
    align-self: flex-start;
  }
  .spec-badge-blue   { background: #eff6ff; color: #1d4ed8; }
  .spec-badge-green  { background: #f0fdf4; color: #16a34a; }
  .spec-badge-red    { background: #fff1f2; color: #dc2626; }
  .spec-badge-purple { background: #faf5ff; color: #7c3aed; }

  .spec-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.25rem;
    color: #0a1628;
    margin: 0 0 6px;
  }
  .spec-sub {
    font-size: 0.82rem;
    color: #64748b;
    margin: 0 0 18px;
    line-height: 1.5;
  }
  .spec-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-top: 1px solid #e2e8f0;
  }
  .spec-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 9px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 0.82rem;
    gap: 12px;
  }
  .spec-key { color: #64748b; flex-shrink: 0; }
  .spec-val { color: #0a1628; font-weight: 600; text-align: right; }

  .spec-footer {
    margin-top: auto;
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #94a3b8;
  }
  .spec-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 6px #22c55e;
    flex-shrink: 0;
  }

  .legal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(10,22,60,0.5);
    backdrop-filter: blur(6px);
    padding: 40px 20px;
    overflow-y: auto;
  }
  .legal-overlay.open { display: block; animation: fadeIn 0.2s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .legal-box {
    max-width: 820px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #dbeafe;
    border-radius: 24px;
    padding: 52px;
    position: relative;
    box-shadow: 0 30px 80px rgba(14,63,138,0.18);
  }
  .legal-close {
    position: absolute; top: 20px; right: 20px;
    width: 36px; height: 36px; border-radius: 50%;
    background: #f1f5f9; border: 1px solid #e2e8f0;
    color: #64748b; cursor: pointer;
    display: grid; place-items: center;
    transition: background 0.2s, color 0.2s;
  }
  .legal-close:hover { background: #dbeafe; color: #1d4ed8; }
  .legal-box h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; color: #0a1628; margin: 0 0 6px; }
  .legal-meta { font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: #1d4ed8; margin-bottom: 28px; }
  .legal-box h3 { font-size: 1rem; font-weight: 700; color: #0a1628; margin: 24px 0 8px; }
  .legal-box p, .legal-box li { font-size: 0.9rem; color: #475569; line-height: 1.75; }
  .legal-box ul { padding-left: 18px; margin: 0 0 10px; }
  .legal-box a { color: #1d4ed8; }

  .form-ok {
    display: none;
    margin-top: 12px;
    padding: 14px 18px;
    border-radius: 12px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #16a34a;
    font-size: 0.875rem;
    line-height: 1.6;
  }
  .form-ok.show { display: block; }

  /* ─── МОБИЛЬНАЯ АДАПТИВНОСТЬ ─── */

  /* Навигация */
  .nav-desktop { display: flex; }
  .nav-mobile-btn { display: none; }

  /* Хиро: кнопки */
  .hero-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  /* Статистика хиро */
  .hero-stats {
    display: flex;
    gap: 48px;
    flex-wrap: wrap;
  }

  /* Сетка продуктов */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  /* About секция */
  .about-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 72px;
    align-items: center;
  }

  /* Contacts секция */
  .contacts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 72px;
    align-items: start;
  }

  /* Форма — сетка имя/email */
  .form-name-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  /* Footer */
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 44px;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  /* Tabs — горизонтальный скролл на мобиле */
  .cat-tabs-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-bottom: 0;
    padding-bottom: 2px;
  }
  .cat-tabs-wrapper::-webkit-scrollbar { display: none; }
  .cat-tabs-wrapper .cat-tabs {
    flex-wrap: nowrap;
    margin-bottom: 0;
    width: max-content;
    min-width: 100%;
  }

  @media (max-width: 768px) {
    /* Навигация */
    .nav-desktop { display: none !important; }
    .nav-mobile-btn { display: flex !important; }
    .btn-nav { display: none !important; }

    /* Мобильное меню */
    .mobile-menu {
      background: #fff;
      border-top: 1px solid #e2e8f0;
      padding: 20px 24px 28px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .mobile-menu-cta {
      display: block !important;
    }

    /* Хиро */
    .hero-section {
      min-height: 100svh;
      padding-top: 100px !important;
      padding-bottom: 60px !important;
    }
    .hero-buttons {
      flex-direction: column;
      align-items: flex-start;
    }
    .hero-buttons .btn-primary,
    .hero-buttons .btn-outline {
      width: 100%;
      justify-content: center;
    }
    .hero-stats {
      gap: 28px 40px;
    }
    .hero-stats > div {
      min-width: calc(50% - 20px);
    }

    /* About */
    .about-section {
      padding: 64px 20px !important;
    }
    .about-grid {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }

    /* Products */
    .products-section {
      padding: 64px 20px !important;
    }
    .products-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 20px !important;
      margin-bottom: 28px !important;
    }
    .products-grid {
      grid-template-columns: 1fr !important;
    }
    .cat-tabs {
      margin-bottom: 28px !important;
    }

    /* Contacts */
    .contacts-section {
      padding: 64px 20px !important;
    }
    .contacts-grid {
      grid-template-columns: 1fr !important;
      gap: 44px !important;
    }

    /* Form */
    .form-name-grid {
      grid-template-columns: 1fr !important;
    }
    .contact-form-box {
      padding: 28px 20px !important;
      border-radius: 20px !important;
    }

    /* Footer */
    .footer-section {
      padding: 48px 20px 32px !important;
    }
    .footer-grid {
      grid-template-columns: 1fr 1fr !important;
      gap: 32px !important;
    }
    .footer-bottom {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 10px !important;
    }
    .footer-bottom-links {
      order: -1;
    }

    /* Legal modal */
    .legal-overlay {
      padding: 20px 12px;
    }
    .legal-box {
      padding: 28px 18px !important;
      border-radius: 18px !important;
    }
    .legal-box h2 {
      font-size: 1.4rem !important;
      padding-right: 40px;
    }

    /* Spec card */
    .spec-card {
      padding: 20px !important;
    }
  }

  @media (max-width: 400px) {
    .footer-grid {
      grid-template-columns: 1fr !important;
    }
    .hero-stats > div {
      min-width: 100%;
    }
  }

  @media (min-width: 769px) {
    .nav-mobile-btn { display: none !important; }
    .mobile-menu { display: none !important; }
    .mobile-menu-cta { display: none !important; }
  }
`

const UAS_PRODUCTS = [
  {
    badge: "Тактический VTOL", badgeClass: "spec-badge-blue",
    title: "SUNQAR",
    image: "/products/sunqar.png",
    sub: "БПЛА вертикального взлёта и посадки для разведки и наблюдения",
    specs: [
      ["Макс. взлётная масса", "34 кг"],
      ["Полезная нагрузка", "10 кг"],
      ["Время полёта", "150 мин"],
      ["Макс. скорость", "140 км/ч"],
      ["Радиус действия", "80 км"],
      ["Макс. высота", "5 000 м"],
      ["Ветроустойчивость", "12 м/с"],
      ["Размеры (Ш×Д×В)", "3920×1927×749 мм"],
      ["Двигатель", "Бесколлекторный"],
      ["Температура эксплуатации", "−20 / +50°C"],
    ],
    code: "QQ-УАС-01",
  },
  {
    badge: "Гибридный VTOL", badgeClass: "spec-badge-blue",
    title: "QYRAN",
    image: "/products/qyran.png",
    sub: "Гибридная БПЛА для дистанционного мониторинга день/ночь",
    specs: [
      ["Макс. взлётная масса", "35 кг"],
      ["Полезная нагрузка", "3 кг"],
      ["Время полёта", "120 мин"],
      ["Макс. скорость", "140 км/ч"],
      ["Радиус действия", "80 км"],
      ["Макс. высота", "5 000 м"],
      ["Ветроустойчивость", "12 м/с"],
      ["Размеры (Ш×Д×В)", "3810×2100×800 мм"],
      ["Двигатель", "Гибридный (бензин + эл.)"],
      ["Температура эксплуатации", "−20 / +50°C"],
    ],
    code: "QQ-УАС-02",
  },
  {
    badge: "МЕДЭВАК / Логистика", badgeClass: "spec-badge-blue",
    title: "TULPAR",
    image: "/products/tulpar.png",
    sub: "БАС для эвакуации раненых из труднодоступных и боевых зон",
    specs: [
      ["Макс. взлётная масса", "165 кг"],
      ["Полезная нагрузка", "90 кг"],
      ["Груз эвакуации", "до 100 кг"],
      ["Время полёта", "30 мин"],
      ["Макс. скорость", "36 км/ч"],
      ["Радиус действия", "15 км"],
      ["Макс. высота", "4 000 м"],
      ["Ветроустойчивость", "10 м/с"],
      ["Размеры (Ш×Д×В)", "3920×3920×850 мм"],
      ["Температура эксплуатации", "−25 / +60°C"],
    ],
    code: "QQ-УАС-03",
  },
  {
    badge: "Квадрокоптер ISR", badgeClass: "spec-badge-blue",
    title: "EVO MAX 4T",
    image: "/products/evo_max.png",
    sub: "Профессиональный квадрокоптер с тепловизором для разведки",
    specs: [
      ["Широкоугол. камера", "50 МП"],
      ["Телекамера", "48 МП (10x / 160x зум)"],
      ["Тепловизор", "640 × 512 пкс"],
      ["Лазерный дальномер", "до 1,2 км"],
      ["Время полёта", "42 мин"],
      ["Макс. скорость", "82,3 км/ч"],
      ["Дальность сигнала", "20 км (SkyLink 3.0)"],
      ["Шифрование", "AES-256"],
    ],
    code: "QQ-УАС-04",
  },
  {
    badge: "FPV / Рой", badgeClass: "spec-badge-blue",
    title: "FPV-дроны и рои",
    image: "/products/fpv.png",
    sub: "Барражирующие FPV-системы для разведки и ударных задач",
    specs: [
      ["Дальность", "до 10 км"],
      ["Управление роем", "ИИ + оператор"],
      ["Режим", "Барражирующий / Камикадзе"],
      ["Видео", "Аналоговое и цифровое"],
      ["Стратегия", "Децентрализованный рой"],
      ["Преимущество", "Массовое насыщение ПВО"],
    ],
    code: "QQ-УАС-05",
  },
]

const DET_PRODUCTS = [
  {
    badge: "Стационарный", badgeClass: "spec-badge-green",
    title: "STP120",
    image: "/products/stp120.png",
    sub: "Стационарный комплекс РЧ-обнаружения и мониторинга БПЛА",
    specs: [
      ["Дальность обнаружения", "3 км"],
      ["Время обнаружения", "≤ 3 сек"],
      ["Диапазон частот", "400–6 000 МГц"],
      ["Одновременных целей", "≥ 10"],
      ["Точность позиционирования", "10 м"],
      ["Рабочая температура", "−30 / +70°C"],
      ["Класс защиты", "IP66"],
      ["Питание", "DC12V / AC220V"],
    ],
    code: "QQ-ОБН-01",
  },
  {
    badge: "Возимый", badgeClass: "spec-badge-green",
    title: "STP121",
    image: "/products/stp121.png",
    sub: "Мобильный комплекс обнаружения БПЛА на базе автомобиля",
    specs: [
      ["Дальность обнаружения", "3 км"],
      ["Время обнаружения", "≤ 3 сек"],
      ["Диапазон частот", "400–6 000 МГц"],
      ["Одновременных целей", "≥ 10"],
      ["Точность позиционирования", "10 м"],
      ["Рабочая температура", "−30 / +70°C"],
      ["Класс защиты", "IP66"],
      ["Работа в движении", "Да"],
    ],
    code: "QQ-ОБН-02",
  },
  {
    badge: "Быстрое развёртывание", badgeClass: "spec-badge-green",
    title: "STP122",
    image: "/products/stp122.png",
    sub: "Комплекс обнаружения с магнитным креплением для быстрого монтажа",
    specs: [
      ["Дальность обнаружения", "3 км"],
      ["Время обнаружения", "≤ 3 сек"],
      ["Диапазон частот", "400–6 000 МГц"],
      ["Одновременных целей", "≥ 10"],
      ["Точность позиционирования", "10 м"],
      ["Рабочая температура", "−30 / +70°C"],
      ["Класс защиты", "IP66"],
      ["Крепление", "Магнитное (быстрый монтаж)"],
    ],
    code: "QQ-ОБН-03",
  },
]

const CM_PRODUCTS = [
  {
    badge: "Носимый подавитель", badgeClass: "spec-badge-red",
    title: "Blader SPS110",
    image: "/products/sps110.png",
    sub: "Носимый комплекс противодействия коммерческим БПЛА и FPV-дронам",
    specs: [
      ["Макс. мощность", "100 Вт"],
      ["Время работы от АКБ", "30 мин"],
      ["Масса", "4 кг"],
      ["Размеры", "795 × 100 × 304 мм"],
      ["Азимут подавления", "±15°"],
      ["Угол подавления (тангаж)", "±10°"],
      ["Рабочая температура", "−20 / +55°C"],
      ["Класс защиты", "IP65"],
    ],
    code: "QQ-ПД-01",
  },
  {
    badge: "Стационарный 360°", badgeClass: "spec-badge-red",
    title: "CM12",
    image: "/products/cm12.png",
    sub: "Стационарный комплекс обнаружения и подавления БПЛА",
    specs: [
      ["Диапазонов подавления", "12"],
      ["Эффективный радиус", "до 2 км"],
      ["Сектор антенн", "360°"],
      ["Класс защиты", "IP67"],
      ["Монтаж", "Стационарный / Автомобильный"],
      ["Питание", "AC 220В / Автономное"],
    ],
    code: "QQ-ПД-02",
  },
  {
    badge: "Возимый", badgeClass: "spec-badge-red",
    title: "Hunter V (SVH100)",
    image: "/products/hunterv.png",
    sub: "Мобильный подавитель БПЛА для защиты транспортных колонн и VIP",
    specs: [
      ["Радиус защиты", "> 300 м"],
      ["Высота защиты", "> 500 м"],
      ["Горизонтальное покрытие", "360°"],
      ["Вертикальное покрытие", "90°"],
      ["Продолжительность работы", "> 4 часов"],
      ["Потребляемая мощность", "2 850 Вт"],
      ["Размеры", "760 × 578 × 480 мм"],
      ["Рабочая температура", "−40 / +70°C"],
      ["Класс защиты", "IP67"],
    ],
    code: "QQ-ПД-03",
  },
  {
    badge: "Комнатный", badgeClass: "spec-badge-red",
    title: "ZLL-10CNET",
    image: "/products/zll.png",
    sub: "Комнатный подавитель беспроводного сигнала для защищённых помещений",
    specs: [
      ["Стандарты", "2G / 3G / 4G / 5G / Wi-Fi / BT"],
      ["Антенна", "Встроенная всенаправленная"],
      ["Интерфейс", "RJ45 (сетевое управление)"],
      ["Охлаждение", "Тихое вентиляторное"],
      ["Мониторинг", "Ток / Напряжение / Темп. / Мощн."],
    ],
    code: "QQ-ПД-04",
  },
]

const RAD_PRODUCTS = [
  {
    badge: "Базовая станция", badgeClass: "spec-badge-purple",
    title: "Barys KZTE-9500 BTX",
    image: "/products/kzte9500.png",
    sub: "Базовая станция транкинговой связи высокой ёмкости",
    specs: [
      ["Макс. пользователей", "30 000"],
      ["Ёмкость сайта", "256"],
      ["Рабочая частота", "350–470 МГц (U-диапазон)"],
      ["Мощность передатчика", "макс. 50 Вт/несущая"],
      ["Режим доступа", "TDMA/FDD"],
      ["MTBF", "100 000 часов"],
      ["MTTR", "≤ 30 мин"],
    ],
    code: "QQ-СВЯЗЬ-BTX",
  },
  {
    badge: "Стационарная", badgeClass: "spec-badge-purple",
    title: "Barys KZTE-R5",
    image: "/products/kzte-r5.png",
    sub: "Стационарная транкинговая радиостанция DMR",
    specs: [
      ["Диапазон частот", "ОВЧ 136–174 / УВЧ 350–520 МГц"],
      ["Каналов связи", "1 024"],
      ["Зон связи", "64 (до 256 кан./зону)"],
      ["Шаг сетки", "12,5 / 25 кГц"],
      ["Стабильность частоты", "±0,5 ppm"],
      ["Размеры", "180 × 199 × 63 мм"],
      ["Масса", "6 014 г"],
      ["Рабочая температура", "−30 / +60°C"],
      ["Защита", "IP68 / MIL-STD-810"],
    ],
    code: "QQ-СВЯЗЬ-R5",
  },
  {
    badge: "Возимая", badgeClass: "spec-badge-purple",
    title: "Barys KZTE-C5",
    image: "/products/kzte-c5.png",
    sub: "Возимая мобильная радиостанция DMR для транспортных средств",
    specs: [
      ["Диапазон частот", "ОВЧ 136–174 / УВЧ 350–520 МГц"],
      ["Каналов связи", "1 024"],
      ["Зон связи", "64 (до 256 кан./зону)"],
      ["Шаг сетки", "12,5 / 25 кГц"],
      ["Размеры", "180 × 199 × 63 мм"],
      ["Масса", "2 059 г"],
      ["Рабочая температура", "−30 / +60°C"],
      ["Защита", "IP68 / MIL-STD-810"],
    ],
    code: "QQ-СВЯЗЬ-C5",
  },
  {
    badge: "Портативная DMR", badgeClass: "spec-badge-purple",
    title: "Barys KZTE-M3",
    image: "/products/kzte-m3.png",
    sub: "Двухдиапазонная портативная рация DMR с функцией ретранслятора",
    specs: [
      ["Диапазон частот", "УВЧ 400–480 / ОВЧ 136–174 МГц"],
      ["Зон канала", "16 (250 кан./зону)"],
      ["АКБ", "Ли-ион, 3 000 мАч"],
      ["Время работы (аналог)", "15 часов"],
      ["Время работы (цифра)", "23 часа"],
      ["Размеры", "125 × 60 × 39 мм"],
      ["Масса", "317 г"],
      ["Ретранслятор", "Да"],
    ],
    code: "QQ-СВЯЗЬ-M3",
  },
  {
    badge: "Портативная LTE", badgeClass: "spec-badge-purple",
    title: "Barys KZTE-M4 LTE",
    image: "/products/kzte-m.png",
    sub: "Рация DMR + LTE (PoC) для частных и публичных сетей",
    specs: [
      ["Тип сети", "GSM/WCDMA/TDD-LTE/FDD-LTE"],
      ["Диапазон радио", "УВЧ 400–480 / ОВЧ 136–174 МГц"],
      ["АКБ", "Ли-ион, 3 000 мАч"],
      ["Время работы (аналог)", "15 часов"],
      ["Время работы (цифра)", "23 часа"],
      ["Размеры", "125 × 60 × 39 мм"],
      ["Масса", "317 г"],
    ],
    code: "QQ-СВЯЗЬ-M4",
  },
  {
    badge: "Tier 3 · IP68", badgeClass: "spec-badge-purple",
    title: "Barys KZTE-M5 Tier3",
    image: "/products/kzte-m.png",
    sub: "Транкинговая рация DMR Tier III с защитой IP68",
    specs: [
      ["Диапазон частот", "ОВЧ 136–174 / УВЧ 350–520 МГц"],
      ["Каналов связи", "1 024"],
      ["АКБ", "Ли-ион, 3 350 мАч"],
      ["Время работы (цифра)", "40 часов"],
      ["Время работы (аналог)", "28 часов"],
      ["Дисплей", "2\" HD цветной"],
      ["Размеры (без антенны)", "129 × 56 × 29,5 мм"],
      ["Масса", "330 г (с антенной)"],
      ["Защита", "IP68 / MIL-STD-810"],
    ],
    code: "QQ-СВЯЗЬ-M5",
  },
]

const TABS = [
  { id: "uas", label: "Беспилотные системы", data: UAS_PRODUCTS },
  { id: "det", label: "Обнаружение БПЛА",    data: DET_PRODUCTS },
  { id: "cm",  label: "Противодействие БПЛА", data: CM_PRODUCTS },
  { id: "rad", label: "Связь BARYS KZTE",     data: RAD_PRODUCTS },
]

function SpecCard({ p }: { p: Product }) {
  return (
    <div className="spec-card">
      <span className={`spec-badge ${p.badgeClass}`}>{p.badge}</span>

      <div style={{
        aspectRatio: "16/9",
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: 20,
        border: "1px solid #dbeafe",
      }}>
        <img
          src={p.image}
          alt={p.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <h4 className="spec-title">{p.title}</h4>
      <p className="spec-sub">{p.sub}</p>

      <ul className="spec-list">
        {p.specs.map(([k, v]) => (
          <li key={k} className="spec-row">
            <span className="spec-key">{k}</span>
            <span className="spec-val">{v}</span>
          </li>
        ))}
      </ul>

      <div className="spec-footer">
        <span>{p.code}</span>
        <span className="spec-dot" />
      </div>
    </div>
  )
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("uas")
  const [legal, setLegal] = useState<string | null>(null)
  const [formOk, setFormOk] = useState(false)

  const navLinks = ["#about:О компании", "#products:Продукция", "#contacts:Контакты"]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity()
      return
    }
    setFormOk(true)
    e.currentTarget.reset()
    setTimeout(() => setFormOk(false), 8000)
  }

  return (
    <main style={{ fontFamily: "'Inter', sans-serif", background: "#fff", color: "#0a1628", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* NAVBAR */}
      <header style={{
        position: "fixed", top: 0, zIndex: 100, width: "100%",
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #e2e8f0",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
         <img
  src="/logo.png"
  alt="QazQorgan"
  style={{ height: 44, width: "auto", display: "block" }}
/>
          <nav className="nav-desktop" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navLinks.map(item => {
              const [href, label] = item.split(":")
              return <a key={href} href={href} className="nav-link">{label}</a>
            })}
          </nav>
          <button className="btn-nav" onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}>
               Оставить заявку
          </button>
          <button
            className="nav-mobile-btn"
            aria-label="Открыть меню"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "#0a1628", padding: 4, display: "none" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu" style={{ display: "none" }}>
            {navLinks.map(item => {
              const [href, label] = item.split(":")
              return (
                <a
                  key={href}
                  href={href}
                  className="nav-link"
                  onClick={() => setMobileOpen(false)}
                  style={{ fontSize: "1rem" }}
                >
                  {label}
                </a>
              )
            })}
            <button
              className="btn-primary mobile-menu-cta"
              style={{ width: "100%", justifyContent: "center", marginTop: 4, display: "none" }}
              onClick={() => {
                setMobileOpen(false)
                document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Запросить брифинг <ArrowRight size={16} />
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        className="hero-section"
        style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", padding: "120px 24px 80px" }}
      >
<div
  style={{
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top, rgba(37,99,235,0.18), transparent 35%), linear-gradient(180deg, rgba(3,7,18,0.82) 0%, rgba(3,7,18,0.94) 100%)",
  }}
/>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(120deg, rgba(6,14,35,0.92) 0%, rgba(10,22,60,0.82) 50%, rgba(15,35,90,0.65) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        <div style={{ position: "absolute", top: -80, right: 80, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 68%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          <div style={{ maxWidth: 720 }}>
            <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 4.8rem)", lineHeight: 1.08, letterSpacing: "-0.01em", color: "#fff", margin: 0 }}>
              БЕСПИЛОТНЫЕ<br />
              СИСТЕМЫ<br />
              <span style={{ color: "#60a5fa" }}>И ЗАЩИТА</span>
            </h1>

            <p style={{ marginTop: 28, maxWidth: 520, fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", lineHeight: 1.85, color: "rgba(255,255,255,0.68)" }}>
              НПЦ ОТ «QazQorgan» — разработчик и производитель беспилотных авиационных систем двойного назначения, комплексов обнаружения и подавления БПЛА, а также профессиональной тактической радиосвязи серии BARYS KZTE.
            </p>

            <div className="hero-buttons" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 14 }}>
              <button className="btn-primary" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
                Наша продукция <ArrowRight size={17} />
              </button>
              <button className="btn-outline" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                О компании
              </button>
            </div>
          </div>

          <div className="hero-stats" style={{ marginTop: 56, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { value: "19",   label: "Продуктов в каталоге" },
              { value: "4",    label: "Продуктовых семейства" },
              { value: "3",    label: "Страны партнёры" },
              { value: "100%", label: "Отечественное производство" },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", color: "#fff", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section" style={{ background: "#fff", padding: "100px 24px", borderBottom: "1px solid #e2e8f0" }}>
        <div className="about-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563eb", fontWeight: 700, marginBottom: 20, marginTop: 0 }}>О компании</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)", lineHeight: 1.12, color: "#0a1628", margin: "0 0 36px" }}>
              Казахстанский разработчик и производитель полного цикла
            </h2>
            <div style={{ fontSize: "1.05rem", lineHeight: 1.9, color: "#475569" }}>
              <p style={{ marginTop: 0 }}>
                <strong style={{ color: "#0a1628" }}>НПЦ ОТ «QazQorgan»</strong> — ведущий отечественный производитель беспилотных авиационных систем двойного назначения, комплексов обнаружения, слежения и подавления БАС, а также средств профессиональной тактической связи серии <strong style={{ color: "#0a1628" }}>BARYS KZTE</strong>.
              </p>
              <p>
                Компания располагает <strong style={{ color: "#0a1628" }}>полной производственной цепочкой</strong>: монтаж печатных плат, производство композитных планеров, прошивка авионики, сборка наземных станций управления и сервисное обслуживание — всё на собственных мощностях в Астане.
              </p>
              <p style={{ marginBottom: 0 }}>
                Продукция поставляется в интересах <strong style={{ color: "#0a1628" }}>Министерства обороны РК</strong>, <strong style={{ color: "#0a1628" }}>МЧС РК</strong>, <strong style={{ color: "#0a1628" }}>Министерства промышленности и строительства РК</strong>. Подписаны меморандумы о сотрудничестве с партнёрами из <strong style={{ color: "#0a1628" }}>Канады</strong>, <strong style={{ color: "#0a1628" }}>Республики Корея</strong> и <strong style={{ color: "#0a1628" }}>КНР</strong>.
              </p>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 12, marginTop: 0 }}>Государственные партнёры</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["МО РК", "МЧС РК", "Министерство промышленности РК", "Пограничная служба", "Национальная гвардия"].map(p => (
                  <span key={p} style={{ fontSize: "0.8rem", fontWeight: 500, color: "#334155", padding: "7px 14px", border: "1px solid #e2e8f0", borderRadius: 999, background: "#f8faff" }}>{p}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 12, marginTop: 0 }}>Международные партнёры</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🇨🇦 Канада", "🇰🇷 Республика Корея", "🇨🇳 КНР"].map(p => (
                  <span key={p} style={{ fontSize: "0.9rem", fontWeight: 500, color: "#334155", padding: "7px 16px", border: "1px solid #e2e8f0", borderRadius: 999, background: "#f8faff" }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products-section" style={{ background: "#f8faff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="products-header" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 28, marginBottom: 40 }}>
            <div>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563eb", fontWeight: 700, marginBottom: 14, marginTop: 0 }}>Продукция</p>
              <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)", color: "#0a1628", lineHeight: 1.12, margin: 0 }}>
                Четыре продуктовых семейства.<br />Единое боевое пространство.
              </h2>
            </div>
            <p style={{ maxWidth: 400, fontSize: "1rem", lineHeight: 1.8, color: "#64748b", margin: 0 }}>
              БАС для разведки, поражения и эвакуации — в связке с системами обнаружения, подавления БПЛА и связной инфраструктурой BARYS KZTE.
            </p>
          </div>

          {/* Tabs — горизонтальный скролл на мобиле */}
          <div className="cat-tabs-wrapper" style={{ marginBottom: 28 }}>
            <div className="cat-tabs" role="tablist">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`cat-tab${activeTab === t.id ? " active" : ""}`}
                  role="tab"
                  aria-selected={activeTab === t.id}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {TABS.map(t => (
            <div
              key={t.id}
              className="products-grid"
              style={{ display: activeTab === t.id ? "grid" : "none", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}
            >
              {t.data.map(p => <SpecCard key={p.code} p={p} />)}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="contacts-section" style={{ background: "#eff6ff", padding: "100px 24px", borderTop: "1px solid #dbeafe" }}>
        <div className="contacts-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563eb", fontWeight: 700, marginBottom: 20, marginTop: 0 }}>Контакты</p>
            <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)", color: "#0a1628", lineHeight: 1.12, margin: "0 0 24px" }}>
              Запросите брифинг<br />или характеристики
            </h2>
            <p style={{ maxWidth: 400, fontSize: "1.05rem", lineHeight: 1.85, color: "#475569", marginTop: 0 }}>
              Свяжитесь с нами по вопросам закупок, совместных разработок или планирования демонстраций на нашей площадке в Астане.
            </p>
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Штаб-квартира",   value: "Республика Казахстан, Астана", sub: "Алматинский район, ул. Жирентаева, зд. 18" },
                { label: "Общие запросы",    value: "info.qazqorgan@gmail.com" },
                { label: "Юридическое лицо", value: "НПЦ ОТ «QazQorgan»" },
                { label: "Время работы",     value: "Пн — Пт · 09:00 — 18:00 (UTC+5)" },
              ].map(c => (
                <div key={c.label}>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 4, marginTop: 0 }}>{c.label}</p>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#0a1628", margin: 0 }}>
                    {c.label === "Общие запросы"
                      ? <a href="mailto:info.qazqorgan@gmail.com" style={{ color: "#1d4ed8", textDecoration: "none" }}>info.qazqorgan@gmail.com</a>
                      : c.value}
                  </p>
                  {c.sub && <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "2px 0 0" }}>{c.sub}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-box" style={{ background: "#fff", borderRadius: 28, border: "1.5px solid #dbeafe", padding: "44px 36px", boxShadow: "0 20px 60px rgba(29,78,216,0.07)" }}>
            <h3 className="font-display" style={{ fontSize: "1.65rem", color: "#0a1628", margin: "0 0 32px" }}>Отправить запрос</h3>
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="form-name-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input name="name" placeholder="ФИО" className="contact-input" required minLength={2} />
                <input name="email" placeholder="E-mail" type="email" className="contact-input" required />
              </div>
              <input name="organization" placeholder="Организация (необязательно)" className="contact-input" />
              <select name="subject" className="contact-input" defaultValue="">
                <option value="" disabled>— Тема обращения —</option>
                <option>Запрос технических характеристик</option>
                <option>Государственные закупки</option>
                <option>Партнёрство и сотрудничество</option>
                <option>Планирование демонстрации</option>
                <option>Техническая поддержка</option>
                <option>Другое</option>
              </select>
              <textarea name="message" placeholder="Опишите оперативный контекст, интересующие платформы и сроки." rows={4} className="contact-input" required minLength={10} style={{ resize: "vertical" }} />
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "17px 24px", marginTop: 4 }}>
                Отправить запрос <ArrowRight size={16} />
              </button>
              <p style={{ fontSize: "0.78rem", color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                Отправляя форму, вы соглашаетесь на обработку данных в соответствии с нашей{" "}
                <a href="#privacy" style={{ color: "#1d4ed8" }} onClick={(e) => { e.preventDefault(); setLegal("privacy") }}>Политикой конфиденциальности</a>.
              </p>
              <div className={`form-ok${formOk ? " show" : ""}`}>
                Спасибо — ваш запрос получен. Мы ответим с адреса <strong>info.qazqorgan@gmail.com</strong> в течение одного рабочего дня.
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section" style={{ background: "#050d1f", padding: "64px 24px 40px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 44 }}>
          <div>
 <img
  src="/logo.png"
  alt="QazQorgan"
  style={{ height: 44, width: "auto", display: "block" }}
/>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "rgba(255,255,255,0.35)", maxWidth: 260, margin: 0 }}>
              НПЦ ОТ «QazQorgan» — казахстанская разработка и производство БАС, средств противодействия БПЛА и профессиональной радиосвязи BARYS KZTE.
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.67rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 18, marginTop: 0 }}>Навигация</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {[["#about","О компании"],["#products","Продукция"],["#contacts","Контакты"]].map(([href, label]) => (
                <a key={href} href={href} className="footer-link">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "0.67rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 18, marginTop: 0 }}>Документы</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <a href="#privacy" className="footer-link" onClick={(e) => { e.preventDefault(); setLegal("privacy") }}>Политика конфиденциальности</a>
              <a href="#terms"   className="footer-link" onClick={(e) => { e.preventDefault(); setLegal("terms") }}>Условия использования</a>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: "0.67rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: 18, marginTop: 0 }}>Контакты</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="mailto:info.qazqorgan@gmail.com" className="footer-link">info.qazqorgan@gmail.com</a>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", margin: 0 }}>Алматинский район, ул. Жирентаева, зд. 18</p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", margin: 0 }}>Астана, Казахстан</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom" style={{ maxWidth: 1280, margin: "44px auto 0", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2025 QazQorgan. Все права защищены.</p>
          <div className="footer-bottom-links" style={{ display: "flex", gap: 20 }}>
            <a href="#privacy" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }} onClick={(e) => { e.preventDefault(); setLegal("privacy") }}>Политика конфиденциальности</a>
            <a href="#terms"   style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textDecoration: "none" }} onClick={(e) => { e.preventDefault(); setLegal("terms") }}>Условия использования</a>
          </div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", margin: 0 }}>НПЦ ОТ «QazQorgan» · Астана, Казахстан</p>
        </div>
      </footer>

      {/* PRIVACY POLICY */}
      <div className={`legal-overlay${legal === "privacy" ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setLegal(null) }} role="dialog" aria-modal="true">
        <div className="legal-box">
          <button className="legal-close" onClick={() => setLegal(null)} aria-label="Закрыть"><X size={14} /></button>
          <h2>Политика конфиденциальности</h2>
          <div className="legal-meta">QazQorgan · Действует с 01 января 2025 года</div>
          <p>Настоящая Политика описывает, как НПЦ ОТ «QazQorgan» собирает, использует и защищает данные, предоставляемые через сайт.</p>
          <h3>1. Какие данные мы собираем</h3>
          <p>Только те данные, которые вы добровольно предоставляете через форму обратной связи: имя, адрес электронной почты, организация (необязательно), текст сообщения. Мы не используем cookies для трекинга и рекламных целей.</p>
          <h3>2. Как мы используем ваши данные</h3>
          <p>Исключительно для ответа на ваш запрос и последующей деловой переписки. Без вашего согласия данные не используются для маркетинга.</p>
          <h3>3. Передача третьим лицам</h3>
          <p>QazQorgan не продаёт и не передаёт ваши персональные данные третьим лицам. Раскрытие возможно только по требованию законодательства Республики Казахстан.</p>
          <h3>4. Сроки хранения</h3>
          <p>Данные хранятся в течение срока, необходимого для ответа и документирования, после чего удаляются или обезличиваются.</p>
          <h3>5. Ваши права</h3>
          <p>Вы вправе запросить доступ, исправление или удаление ваших данных: <a href="mailto:info.qazqorgan@gmail.com">info.qazqorgan@gmail.com</a></p>
          <h3>6. Безопасность</h3>
          <p>Мы применяем технические и организационные меры для защиты данных от несанкционированного доступа.</p>
          <h3>7. Применимое право</h3>
          <p>Политика регулируется законодательством Республики Казахстан, в том числе Законом «О персональных данных и их защите».</p>
          <h3>8. Контакты</h3>
          <p>НПЦ ОТ «QazQorgan», Алматинский район, ул. Жирентаева, зд. 18, г. Астана, РК. Email: <a href="mailto:info.qazqorgan@gmail.com">info.qazqorgan@gmail.com</a></p>
        </div>
      </div>

      {/* TERMS OF SERVICE */}
      <div className={`legal-overlay${legal === "terms" ? " open" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) setLegal(null) }} role="dialog" aria-modal="true">
        <div className="legal-box">
          <button className="legal-close" onClick={() => setLegal(null)} aria-label="Закрыть"><X size={14} /></button>
          <h2>Условия использования</h2>
          <div className="legal-meta">QazQorgan · Действуют с 01 января 2025 года</div>
          <p>Настоящие Условия регулируют использование сайта qazqorgan.kz, эксплуатируемого НПЦ ОТ «QazQorgan».</p>
          <h3>1. Использование сайта</h3>
          <p>Сайт предоставляет информацию о продукции и контактных каналах QazQorgan. Вы обязуетесь использовать сайт только в законных целях.</p>
          <h3>2. Интеллектуальная собственность</h3>
          <p>Всё содержимое сайта — тексты, логотипы, наименования изделий («QazQorgan», «SUNQAR», «QYRAN», «Tulpar», «BARYS KZTE», «Blader», «Hunter V» и др.) — принадлежит НПЦ ОТ «QazQorgan» и охраняется законодательством РК. Воспроизведение без письменного согласия запрещено.</p>
          <h3>3. Информация о продукции</h3>
          <p>Технические характеристики носят справочный характер. Окончательные параметры подтверждаются в официальных коммерческих соглашениях. Содержимое сайта не является публичной офертой.</p>
          <h3>4. Отказ от гарантий</h3>
          <p>Сайт и его содержимое предоставляются «как есть». QazQorgan не гарантирует бесперебойную работу сайта.</p>
          <h3>5. Ограничение ответственности</h3>
          <p>В максимально допустимых законом пределах QazQorgan не несёт ответственности за косвенные убытки, связанные с использованием сайта.</p>
          <h3>6. Изменение Условий</h3>
          <p>QazQorgan вправе обновлять настоящие Условия. Продолжение использования сайта означает согласие с обновлённой редакцией.</p>
          <h3>7. Применимое право</h3>
          <p>Условия регулируются законодательством Республики Казахстан. Споры рассматриваются в компетентных судах РК.</p>
          <h3>8. Контакты</h3>
          <p>По вопросам, связанным с настоящими Условиями: <a href="mailto:info.qazqorgan@gmail.com">info.qazqorgan@gmail.com</a></p>
        </div>
      </div>
    </main>
  )
}
