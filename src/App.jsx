import React, { useState, useEffect } from 'react';
import { 
  Compass, MapPin, Sparkles, Video, Play, Pause, Download, 
  RotateCcw, Sliders, Smartphone, Monitor, Database, CheckCircle, 
  Volume2, VolumeX, Eye, Flame, Map as MapIcon, Search, Globe, 
  ExternalLink, Layers, Navigation, AlertCircle, RefreshCw, Plus,
  FileCode, Terminal, HelpCircle, HardDrive, Trash2
} from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const DEFAULT_FAL_KEY = 'fal_sk_eccfd3d5b7b0469f86fd06b251412d6f:a56bec2c3ee9a9d2c8bd7f547c53ef89';
const DB_NAME = 'MapDramaPersistentDB_v2';
const DB_STORE = 'projects';

// Dữ liệu mẫu khởi tạo phong phú
const INITIAL_RESORTS = [
  {
    id: 'topas_sapa',
    name: 'Topas Ecolodge Sa Pa',
    lat: 22.2536,
    lng: 103.9056,
    region: 'Tây Bắc',
    rating: 4.9,
    reviewsCount: 2180,
    priceTier: '5.500.000₫ - 12.000.000₫',
    vibe: 'Đỉnh núi mờ sương & Bungalow đá',
    features: ['Hồ bơi vô cực nước ấm', 'View thung lũng Mường Hoa', 'Healing Retreat'],
    goldenReview: 'Lúc 5h sáng mở cửa ban công, sương tràn vào tận giường như ở thiên đường. Buổi tối ở quầy bar gặp lại người quen cũ sau 7 năm xa cách.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'amanoi_vinhhy',
    name: 'Amanoi Resort Vĩnh Hy',
    lat: 11.7246,
    lng: 109.1895,
    region: 'Duyên hải Nam Trung Bộ',
    rating: 5.0,
    reviewsCount: 890,
    priceTier: '25.000.000₫ - 95.000.000₫',
    vibe: 'Biệt lập tuyệt đối & Vách đá biển',
    features: ['Bãi biển riêng biệt lập', 'Hồ bơi vách đá', 'Cliff Pool'],
    goldenReview: 'Không gian tĩnh lặng tới mức nghe rõ từng nhịp sóng vỗ và tiếng ve rừng. Phục vụ chu đáo đến mức đoán trước cả ly trà khách muốn uống.',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'yoko_quanghanh',
    name: 'Yoko Onsen Quang Hanh',
    lat: 20.9789,
    lng: 107.1598,
    region: 'Quảng Ninh',
    rating: 4.8,
    reviewsCount: 3420,
    priceTier: '3.800.000₫ - 18.000.000₫',
    vibe: 'Khoáng nóng Nhật Bản thung lũng xanh',
    features: ['Suối nước nóng Onsen', 'Xông đá muối Himalaya', 'Kiến trúc gỗ Nhật'],
    goldenReview: 'Ngâm mình giữa làn nước khoáng nóng lúc trời se lạnh, nhìn khói sương bốc lên giữa hẻm núi đá vôi cảm giác trút bỏ mọi muộn phiền.',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'jw_phuquoc',
    name: 'JW Marriott Phu Quoc Emerald Bay',
    lat: 10.0401,
    lng: 104.0325,
    region: 'Phú Quốc',
    rating: 4.9,
    reviewsCount: 4150,
    priceTier: '8.500.000₫ - 28.000.000₫',
    vibe: 'Trường đại học thần thoại Bill Bensley',
    features: ['Bãi biển riêng biệt lập', 'Hồ bơi vô cực hình con sò', 'Kiến trúc Pháp độc bản'],
    goldenReview: 'Lạc vào một trường đại học thế kỷ 19 ven biển. Có một câu chuyện được kể trong từng khoa và góc sách cũ ở thư viện.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(DB_STORE)) {
        db.createObjectStore(DB_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export default function App() {
  const [activeTab, setActiveTab] = useState('radar');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  
  const [resorts, setResorts] = useState(INITIAL_RESORTS);
  const [selectedResort, setSelectedResort] = useState(INITIAL_RESORTS[0]);
  
  const [radarCenter, setRadarCenter] = useState({ lat: 21.0285, lng: 105.8542, name: 'Hà Nội & Miền Bắc' });
  const [geoRadius, setGeoRadius] = useState(350);
  const [mapTileMode, setMapTileMode] = useState('satellite');
  const [minRatingFilter, setMinRatingFilter] = useState(4.8);
  const [searchKeyword, setSearchKeyword] = useState('');

  const [scraperInput, setScraperInput] = useState('');
  const [isScraping, setIsScraping] = useState(false);
  const [scraperLogs, setScraperLogs] = useState([]);
  const [showScraperModal, setShowScraperModal] = useState(false);

  const [dramaTheme, setDramaTheme] = useState('mystery');
  const [scenes, setScenes] = useState([
    {
      id: 1,
      title: 'Tọa Độ Bí Ẩn 5 Sao',
      time: '0 - 5s (Hook)',
      text: 'Tại đúng tọa độ 22.2536° Bắc, nơi những đám mây sà xuống tận mép ban công
