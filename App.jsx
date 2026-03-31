import React, { useState, useEffect } from 'react';
import { 
  MapPin, AlertCircle, ShoppingBag, Car, MessageSquare, Wifi, BatteryCharging, Wind, 
  Volume2, Clock, Star, Heart, Settings, Home, Bell, User, Navigation, Filter, Search, 
  ChevronRight, TrendingUp, Calendar, Users, ThumbsUp, Share2, MoreVertical, Sun, Cloud,
  CloudRain, CloudSnow, Thermometer, Droplets, Wind as WindIcon, Eye, Umbrella,
  Compass, Navigation as NavIcon, Target, Locate, Route, Layers, ZoomIn, ZoomOut,
  RefreshCw, Download, Upload, Shield, Lock, Unlock, Battery, WifiOff, Signal,
  Phone, Mail, MessageCircle, HelpCircle, Info, AlertTriangle, CheckCircle, XCircle,
  Plus, Minus, X, Check, ChevronLeft, ChevronDown, ChevronUp, Menu, LogOut, LogIn,
  UserPlus, UserMinus, UserCheck, UserX, Camera, Video, Mic, Headphones, Music,
  Play, Pause, Stop, SkipBack, SkipForward, Repeat, Shuffle, Volume, VolumeX,
  BatteryFull, BatteryMedium, BatteryLow, BatteryWarning, Power, Zap, Flashlight,
  Moon, Sunrise, Sunset, Watch, Timer, Hourglass, History, FastForward, Rewind,
  PieChart, BarChart, LineChart, Activity, TrendingDown, DollarSign, CreditCard,
  Wallet, Receipt, Tag, Percent, Gift, Package, Truck, Bike, Bus, Train, Plane,
  Ship, Rocket, Car as CarIcon, Truck as TruckIcon, Bike as BikeIcon, Bus as BusIcon,
  Train as TrainIcon, Plane as PlaneIcon, Ship as ShipIcon, Rocket as RocketIcon,
  Building, Home as HomeIcon, Hotel, School, Hospital, Bank, Store, ShoppingCart,
  Coffee, Utensils, Pizza, Cake, Wine, Beer, Coffee as CoffeeIcon, Heart as HeartIcon,
  Smile, Frown, Meh, Laugh, Angry, Surprised, Wink, ThumbsDown, Award, Trophy, Medal,
  Crown, Flag, Globe, Map, Mountain, Tree, Leaf, Flower, Cloud as CloudIcon,
  Droplet as DropletIcon, Flame, Snowflake, CloudLightning, CloudDrizzle, CloudHail,
  CloudFog, CloudSun, CloudMoon, Sun as SunIcon, Moon as MoonIcon, Star as StarIcon,
  Sparkles, Meteor, Satellite, Planet, Galaxy, Universe, Rocket as RocketIcon2
} from 'lucide-react';

// 香港即時資訊App - 完整功能版本
// 代碼超勁 × UI精緻 × 完美主義

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userLocation, setUserLocation] = useState(null);
  const [realtimeData, setRealtimeData] = useState({
    traffic: [],
    deals: [],
    events: [],
    discussions: [],
    weather: null,
    airQuality: null,
    facilities: [],
    emergencies: []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);

  // 模擬香港位置 (中環)
  const defaultLocation = {
    lat: 22.3193,
    lng: 114.1694,
    address: '香港中環',
    district: 'Central',
    accuracy: 50
  };

  // 獲取用戶位置
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: '您嘅位置',
              accuracy: position.coords.accuracy,
              timestamp: position.timestamp
            });
          },
          (error) => {
            console.warn('位置獲取失敗:', error);
            setUserLocation(defaultLocation);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      } else {
        setUserLocation(defaultLocation);
      }
    };

    getLocation();
    
    // 每分鐘更新位置
    const locationInterval = setInterval(getLocation, 60000);
    return () => clearInterval(locationInterval);
  }, []);

  // 加載實時數據
  useEffect(() => {
    const loadRealtimeData = async () => {
      setLoading(true);
      
      try {
        // 模擬API調用
        const mockData = {
          traffic: [
            { 
              id: 1, 
              type: 'accident', 
              location: '紅磡海底隧道', 
              severity: 'high', 
              time: '5分鐘前', 
              delay: '30分鐘',
              description: '兩車相撞，快線封閉',
              coordinates: { lat: 22.303, lng: 114.187 }
            },
            { 
              id: 2, 
              type: 'congestion', 
              location: '東區走廊東行', 
              severity: 'medium', 
              time: '10分鐘前', 
              delay: '15分鐘',
              description: '交通擠塞，車龍長達2公里',
              coordinates: { lat: 22.285, lng: 114.221 }
            },
            { 
              id: 3, 
              type: 'roadwork', 
              location: '彌敦道北行', 
              severity: 'low', 
              time: '1小時前', 
              delay: '10分鐘',
              description: '道路維修工程',
              coordinates: { lat: 22.319, lng: 114.169 }
            }
          ],
          deals: [
            { 
              id: 1, 
              store: '麥當勞', 
              discount: '買一送一', 
              location: '銅鑼灣', 
              distance: '0.5km', 
              expiry: '今日 23:59',
              category: 'food',
              rating: 4.2,
              image: '🍔'
            },
            { 
              id: 2, 
              store: '百佳', 
              discount: '8折優惠', 
              location: '旺角', 
              distance: '1.2km', 
              expiry: '明日 12:00',
              category: 'grocery',
              rating: 4.0,
              image: '🛒'
            },
            { 
              id: 3, 
              store: '萬寧', 
              discount: '滿$100減$20', 
              location: '尖沙咀', 
              distance: '0.8km', 
              expiry: '3日後',
              category: 'health',
              rating: 4.5,
              image: '💊'
            }
          ],
          events: [
            { 
              id: 1, 
              title: '維園年宵市場', 
              type: 'festival', 
              location: '維多利亞公園', 
              time: '今日 10:00-22:00', 
              popularity: '高',
              price: '免費',
              organizer: '食環署'
            },
            { 
              id: 2, 
              title: '中環海濱音樂會', 
              type: 'music', 
              location: '中環海濱', 
              time: '今晚 20:00', 
              popularity: '中',
              price: '$280-$880',
              organizer: 'Live Nation'
            },
            { 
              id: 3, 
              title: '深水埗電腦節', 
              type: 'shopping', 
              location: '深水埗', 
              time: '本週末', 
              popularity: '高',
              price: '免費入場',
              organizer: '香港電腦商會'
            }
          ],
          discussions: [
            { 
              id: 1, 
              user: '香港人', 
              avatar: '👤',
              content: '今日地鐵好擠迫，大家小心！', 
              time: '5分鐘前', 
              likes: 24, 
              comments: 8,
              shares: 3
            },
            { 
              id: 2, 
              user: '交通達人', 
              avatar: '🚗',
              content: '東隧塞車，建議改行西隧', 
              time: '15分鐘前', 
              likes: 42, 
              comments: 12,
              shares: 7
            },
            { 
              id: 3, 
              user: '美食家', 
              avatar: '🍜',
              content: '推薦灣仔新開嘅茶餐廳，奶茶正！', 
              time: '30分鐘前', 
              likes: 18, 
              comments: 5,
              shares: 2
            }
          ],
          weather: {
            temp: 24,
            feelsLike: 26,
            condition: '部分多雲',
            humidity: '75%',
            wind: '東風 15km/h',
            pressure: '1013 hPa',
            visibility: '10 km',
            uvIndex: 6,
            sunrise: '06:30',
            sunset: '18:45',
            updatedAt: new Date().toLocaleTimeString('zh-HK')
          },
          airQuality: {
            index: 45,
            level: '良好',
            pm25: 12,
            pm10: 20,
            no2: 15,
            o3: 30,
            so2: 5,
            advice: '適合戶外活動',
            station: '中環監測站',
            updatedAt: new Date().toLocaleTimeString('zh-HK')
          },
          facilities: [
            { id: 1, type: 'toilet', name: '公共廁所', location: '銅鑼灣地鐵站', distance: '0.3km', status: '開放' },
            { id: 2, type: 'charging', name: '電動車充電站', location: '中環IFC', distance: '0.5km', status: '可用' },
            { id: 3, type: 'wifi', name: '免費WiFi熱點', location: '維園', distance: '0.8km', status: '強信號' },
            { id: 4, type: 'accessible', name: '無障礙設施', location: '尖沙咀碼頭', distance: '1.2km', status: '完善' }
          ],
          emergencies: [
            { id: 1, type: 'police', number: '999', name: '緊急報警', description: '罪案、意外、緊急求助' },
            { id: 2, type: 'fire', number: '999', name: '消防救護', description: '火警、救護車服務' },
            { id: 3, type: 'government', number: '1823', name: '政府熱線', description: '查詢政府服務' },
            { id: 4, type: 'weather', number: '1878 200', name: '天氣查詢', description: '天氣報告及警告' }
          ]
        };

        setRealtimeData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('數據加載失敗:', error);
        setLoading(false);
      }
    };

    loadRealtimeData();
    
    // 每30秒更新數據
    const interval = setInterval(loadRealtimeData, 30000);
    return () => clearInterval(interval);
  }, []);

  // 快速功能按鈕
  const quickActions = [
    { icon: <MapPin size={24} />, label: '廁所定位', color: 'bg-blue-500', type: 'toilet' },
    { icon: <BatteryCharging size={24} />, label: '充電站', color: 'bg-green-500', type: 'charging' },
    { icon: <Wifi size={24} />, label: 'WiFi熱點', color: 'bg-purple-500', type: 'wifi' },
    { icon: <Wind size={24} />, label: '空氣質量', color: 'bg-yellow-500', type: 'air' },
    { icon: <Volume2 size={24} />, label: '噪音地圖', color: 'bg-pink-500', type: 'noise' },
    { icon: <Clock size={24} />, label: '排隊時間', color: 'bg-indigo-500', type: 'queue' }
  ];

  // 導航欄
  const NavigationBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="flex justify-around items-center h-16">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center p-2 transition-all ${activeTab === 'home' ? 'text-blue-600 scale-110' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">首頁</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('news')}
          className={`flex flex-col items-center p-2 transition-all ${activeTab === 'news' ? 'text-blue-600 scale-110' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <div className="relative">
            <Bell size={24} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </div>
          <span className="text-xs mt-1">資訊</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('map')}
          className="flex flex-col items-center p-2 transition-all hover:scale-110"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center -mt-6 shadow-lg">
            <Navigation size={24} className="text-white" />
          </div>
          <span className="text-xs mt-1">地圖</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('discuss')}
          className={`flex flex-col items-center p-2 transition-all ${activeTab === 'discuss' ? 'text-blue-600 scale-110' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <MessageSquare size={24} />
          <span className="text-xs mt-1">討論</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center p-2 transition-all ${activeTab === 'profile' ? 'text-blue-600 scale-110' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <User size={24} />
          <span className="text-xs mt-1">我的</span>
        </button>
      </div>
    </div>
  );

  // 搜索欄
  const SearchBar = () => (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 p-4">
      <div className="flex items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜索地點、優惠、資訊..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="ml-3 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
          <Filter size={20} />
        </button>
      </div>
    </div>
  );

  // 主頁內容
  const HomeContent = () => (
    <div className="pb-20">
      {/* 狀態欄 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center">
              <div className="text-3xl mr-3">🇭🇰</div>
              <div>
                <h1 className="text-2xl font-bold">香港即時資訊</h1>
                <div className="flex items-center mt-1">
                  <MapPin size={16} />
                  <span className="ml-2 text-sm">{userLocation?.address || '獲取位置中...'}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{realtimeData.weather?.temp || '24'}°C</div>
            <div className="text-sm">{realtimeData.weather?.condition || '晴朗'}</div>
            <div className="text-xs opacity-80 mt-1">體感 {realtimeData.weather?.feelsLike || '26'}°C</div>
          </div>
        </div>
        
        {/* 空氣質量 */}
        {realtimeData.airQuality && (
          <div className="mt-4 bg-white/20 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <div>
                <div