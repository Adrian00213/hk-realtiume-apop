// 香港即時資訊App - 完整功能版本
// 代碼超勁 × UI精緻 × 完美主義

document.addEventListener('DOMContentLoaded', function() {
  // 隱藏加載屏幕
  setTimeout(() => {
    const loading = document.getElementById('loading');
    const app = document.getElementById('app');
    
    if (loading) {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        loading.style.display = 'none';
        if (app) app.style.display = 'block';
      }, 300);
    }
  }, 1500);

  // 模擬數據
  const mockData = {
    traffic: [
      { id: 1, type: 'accident', location: '紅磡海底隧道', severity: 'high', time: '5分鐘前', delay: '30分鐘', description: '兩車相撞，快線封閉' },
      { id: 2, type: 'congestion', location: '東區走廊東行', severity: 'medium', time: '10分鐘前', delay: '15分鐘', description: '交通擠塞，車龍長達2公里' },
      { id: 3, type: 'roadwork', location: '彌敦道北行', severity: 'low', time: '1小時前', delay: '10分鐘', description: '道路維修工程' }
    ],
    deals: [
      { id: 1, store: '麥當勞', discount: '買一送一', location: '銅鑼灣', distance: '0.5km', expiry: '今日 23:59', category: 'food' },
      { id: 2, store: '百佳', discount: '8折優惠', location: '旺角', distance: '1.2km', expiry: '明日 12:00', category: 'grocery' },
      { id: 3, store: '萬寧', discount: '滿$100減$20', location: '尖沙咀', distance: '0.8km', expiry: '3日後', category: 'health' }
    ],
    events: [
      { id: 1, title: '維園年宵市場', type: 'festival', location: '維多利亞公園', time: '今日 10:00-22:00', popularity: '高' },
      { id: 2, title: '中環海濱音樂會', type: 'music', location: '中環海濱', time: '今晚 20:00', popularity: '中' },
      { id: 3, title: '深水埗電腦節', type: 'shopping', location: '深水埗', time: '本週末', popularity: '高' }
    ],
    weather: {
      temp: 24,
      condition: '部分多雲',
      humidity: '75%',
      wind: '東風 15km/h',
      feelsLike: 26
    },
    airQuality: {
      index: 45,
      level: '良好',
      pm25: 12,
      advice: '適合戶外活動'
    }
  };

  // 狀態管理
  let currentPage = 'home';
  let userLocation = null;

  // 獲取用戶位置
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          updateLocationDisplay('您嘅位置');
        },
        () => {
          userLocation = { lat: 22.3193, lng: 114.1694 };
          updateLocationDisplay('香港中環');
        }
      );
    } else {
      userLocation = { lat: 22.3193, lng: 114.1694 };
      updateLocationDisplay('香港中環');
    }
  }

  // 更新位置顯示
  function updateLocationDisplay(address) {
    const locationElement = document.querySelector('.location span');
    if (locationElement) {
      locationElement.textContent = address;
    }
  }

  // 更新天氣顯示
  function updateWeatherDisplay() {
    const tempElement = document.querySelector('.temp');
    const conditionElement = document.querySelector('.condition');
    
    if (tempElement) tempElement.textContent = `${mockData.weather.temp}°C`;
    if (conditionElement) conditionElement.textContent = mockData.weather.condition;
  }

  // 更新空氣質量顯示
  function updateAirQualityDisplay() {
    const aqiElement = document.querySelector('.aqi-value');
    const levelElement = document.querySelector('.aqi-level');
    const pm25Element = document.querySelector('.pm25-value');
    const adviceElement = document.querySelector('.aqi-advice');
    
    if (aqiElement) aqiElement.textContent = mockData.airQuality.index;
    if (levelElement) levelElement.textContent = mockData.airQuality.level;
    if (pm25Element) pm25Element.textContent = `${mockData.airQuality.pm25} µg/m³`;
    if (adviceElement) adviceElement.textContent = mockData.airQuality.advice;
  }

  // 渲染交通數據
  function renderTrafficData() {
    const container = document.getElementById('traffic-container');
    if (!container) return;

    container.innerHTML = mockData.traffic.map(item => `
      <div class="card traffic-card">
        <div class="card-header">
          <div class="card-title">${item.location}</div>
          <div class="card-time">${item.time}</div>
        </div>
        <div class="card-content">${item.description}</div>
        <div class="card-footer">
          <div>${getTrafficTypeText(item.type)}</div>
          <div>延誤: ${item.delay}</div>
        </div>
      </div>
    `).join('');
  }

  // 渲染優惠數據
  function renderDealsData() {
    const container = document.getElementById('deals-container');
    if (!container) return;

    container.innerHTML = mockData.deals.map(item => `
      <div class="card deal-card">
        <div class="card-header">
          <div class="card-title">${item.store} ${getCategoryEmoji(item.category)}</div>
          <div class="card-time">${item.distance}</div>
        </div>
        <div class="card-content">${item.discount}</div>
        <div class="card-footer">
          <div>${item.location}</div>
          <div style="color: #ef4444;">到期: ${item.expiry}</div>
        </div>
      </div>
    `).join('');
  }

  // 工具函數
  function getTrafficTypeText(type) {
    const types = {
      accident: '交通意外',
      congestion: '交通擠塞',
      roadwork: '道路工程'
    };
    return types[type] || '交通情況';
  }

  function getCategoryEmoji(category) {
    const emojis = {
      food: '🍔',
      grocery: '🛒',
      health: '💊'
    };
    return emojis[category] || '🏪';
  }

  // 導航功能
  function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
      button.addEventListener('click', function() {
        // 移除所有active類
        navButtons.forEach(btn => btn.classList.remove('active'));
        // 添加active類到當前按鈕
        this.classList.add('active');
        
        // 獲取頁面類型
        const page = this.getAttribute('data-page') || 'home';
        switchPage(page);
      });
    });
  }

  // 切換頁面
  function switchPage(page) {
    currentPage = page;
    
    // 隱藏所有頁面
    const pages = document.querySelectorAll('[id$="-page"]');
    pages.forEach(p => p.style.display = 'none');
    
    // 顯示當前頁面
    const currentPageElement = document.getElementById(`${page}-page`);
    if (currentPageElement) {
      currentPageElement.style.display = 'block';
    }
  }

  // 快速功能按鈕
  function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        handleQuickAction(action);
      });
    });
  }

  // 處理快速功能
  function handleQuickAction(action) {
    const actions = {
      toilet: '🚻 正在尋找附近廁所...',
      charging: '🔌 正在尋找充電站...',
      wifi: '📶 正在尋找WiFi熱點...',
      air: '🌬️ 正在獲取空氣質量數據...',
      noise: '🔊 正在加載噪音地圖...',
      queue: '⏱️ 正在獲取排隊時間...'
    };
    
    if (actions[action]) {
      alert(actions[action]);
    }
  }

  // 搜索功能
  function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          const query = this.value.trim();
          if (query) {
            alert(`🔍 搜索: ${query}`);
            this.value = '';
          }
        }
      });
    }
  }

  // 初始化應用
  function initApp() {
    getUserLocation();
    updateWeatherDisplay();
    updateAirQualityDisplay();
    renderTrafficData();
    renderDealsData();
    setupNavigation();
    setupQuickActions();
    setupSearch();
    
    // 模擬實時更新
    setInterval(() => {
      // 隨機更新溫度
      mockData.weather.temp = 22 + Math.floor(Math.random() * 6);
      updateWeatherDisplay();
      
      // 隨機更新AQI
      mockData.airQuality.index = 40 + Math.floor(Math.random() * 20);
      mockData.airQuality.pm25 = 10 + Math.floor(Math.random() * 15);
      updateAirQualityDisplay();
    }, 30000); // 每30秒更新一次
  }

  // 網絡狀態檢測
  function setupNetworkDetection() {
    window.addEventListener('online', () => {
      showNotification('✅ 網絡已恢復', 'success');
    });
    
    window.addEventListener('offline', () => {
      showNotification('⚠️ 您已離線，部分功能可能受限', 'warning');
    });
  }

  // 顯示通知
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // 添加動畫樣式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
  `;
  document.head.appendChild(style);

  // 啟動應用
  initApp();
  setupNetworkDetection();
  
  // 添加到主屏幕提示
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    setTimeout(() => {
      const installBtn = document.createElement('button');
      installBtn.textContent = '📱 添加到主屏幕';
      installBtn.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 10px 16px;
        border-radius: 24px;
        border: none;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        font-weight: 500;
        cursor: pointer;
        z-index: 100;
        animation: slideIn 0.3s ease-out;
      `;
      
      installBtn.onclick = () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('用戶接受安裝');
          }
          deferredPrompt = null;
          installBtn.remove();
        });
      };
      
      document.body.appendChild(installBtn);
      
      // 10秒後自動隱藏
      setTimeout(() => {
        installBtn.style.opacity = '0';
        installBtn.style.transition = 'opacity 0.3s';
        setTimeout(() => installBtn.remove(), 300);
      }, 10000);
    }, 5000);
  });

  // 錯誤處理
  window.addEventListener('error', (event) => {
    console.error('應用錯誤:', event.error);
    showNotification('😅 應用遇到問題，請刷新頁面', 'warning');
  });
});