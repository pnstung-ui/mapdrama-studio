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
      text: 'Tại đúng tọa độ 22.2536° Bắc, nơi những đám mây sà xuống tận mép ban công lúc 5 giờ sáng, có một bí mật mà các vị khách nghỉ dưỡng ở Topas Ecolodge chưa từng được nghe kể...',
      visualPrompt: 'Cinematic drone shot flying through morning mist descending into a luxury mountain stone lodge in Sa Pa, 4k hyperrealistic, 9:16 vertical format',
      videoUrl: '',
      isRendering: false
    },
    {
      id: 2,
      title: 'Lần Theo Dấu Vết Đánh Giá',
      time: '5 - 18s (Bối cảnh)',
      text: 'Hơn 2000 lượt đánh giá 5 sao trên Google Maps đều nhắc tới hồ bơi vô cực sưởi ấm trên đỉnh đồi. Nhưng ít ai để ý đến chiếc bàn gỗ số 4 ở góc quầy bar lộng gió...',
      visualPrompt: 'Slow pan across a steaming luxury heated infinity pool overlooking deep green rice terrace valleys in foggy morning, cinematic lighting',
      videoUrl: '',
      isRendering: false
    },
    {
      id: 3,
      title: 'Cuộc Gặp Gỡ Định Mệnh',
      time: '18 - 44s (Drama Climax)',
      text: 'Chính tại chiếc bàn đó, một người đàn ông đi nghỉ dưỡng một mình đã vô tình nhận lại chiếc đồng hồ bị bỏ quên suốt 7 năm từ tay một vị khách vừa check-in ở bungalow bên cạnh.',
      visualPrompt: 'Atmospheric close-up of a vintage leather watch on a rustic wooden bar counter, fireplace warm glow background, luxury mountain resort',
      videoUrl: '',
      isRendering: false
    },
    {
      id: 4,
      title: 'Hạ Màn & Tọa Độ Nghỉ Dưỡng',
      time: '44 - 60s (Call To Action)',
      text: 'Một kỳ nghỉ chữa lành không chỉ có cảnh sắc mộng mơ mà còn là nơi hàn gắn những câu chuyện tưởng chừng đã quên. Bạn dám thử mở ban công lúc 5 giờ sáng ở tọa độ này không?',
      visualPrompt: 'Breathtaking sunset view over the entire mountain resort with soft amber fairy lights turning on, tranquil luxury ambiance, 4k ultra-detailed',
      videoUrl: '',
      isRendering: false
    }
  ]);

  const [isAutopilotRunning, setIsAutopilotRunning] = useState(false);
  const [autopilotProgress, setAutopilotProgress] = useState(0);
  const [autopilotStatus, setAutopilotStatus] = useState('');

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [voiceList, setVoiceList] = useState([]);
  const [savedVaultProjects, setSavedVaultProjects] = useState([]);

  useEffect(() => {
    const updateVoices = () => {
      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();
        setVoiceList(voices);
      }
    };
    updateVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    loadProjectsFromDB();
  }, []);

  const loadProjectsFromDB = async () => {
    try {
      const db = await initDB();
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        setSavedVaultProjects(req.result || []);
      };
    } catch (err) {
      console.warn('Lỗi đọc DB:', err);
    }
  };

  const saveCurrentProjectToVault = async () => {
    try {
      const db = await initDB();
      const tx = db.transaction(DB_STORE, 'readwrite');
      const store = tx.objectStore(DB_STORE);
      const projectData = {
        id: `proj_${selectedResort.id}_${Date.now()}`,
        name: selectedResort.name,
        resort: selectedResort,
        theme: dramaTheme,
        scenes: scenes,
        aspectRatio: aspectRatio,
        savedAt: new Date().toLocaleString('vi-VN')
      };
      store.put(projectData);
      tx.oncomplete = () => {
        loadProjectsFromDB();
        alert('Đã lưu toàn bộ Video, Kịch bản và Tọa độ vào bộ nhớ máy!');
      };
    } catch (err) {
      alert('Không thể lưu vào DB: ' + err.message);
    }
  };

  const deleteProjectFromVault = async (id) => {
    try {
      const db = await initDB();
      const tx = db.transaction(DB_STORE, 'readwrite');
      const store = tx.objectStore(DB_STORE);
      store.delete(id);
      tx.oncomplete = () => {
        loadProjectsFromDB();
      };
    } catch (err) {
      alert('Lỗi xóa project: ' + err.message);
    }
  };

  const handleScrapeGoogleMaps = () => {
    if (!scraperInput.trim()) {
      alert('Vui lòng nhập Link Google Maps hoặc từ khóa resort/tọa độ!');
      return;
    }

    setIsScraping(true);
    setScraperLogs([]);
    
    const logs = [
      `[1/4] Kết nối Google Maps Geocoding & Places API...`,
      `[2/4] Phân tích URL / Từ khóa: "${scraperInput}"`,
      `[3/4] Trích xuất tọa độ GPS, ảnh 4K chia sẻ từ khách và đánh giá 5 sao...`,
      `[4/4] Hoàn tất trích xuất dữ liệu sạch!`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setScraperLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setIsScraping(false);
          const isUrl = scraperInput.includes('maps.google') || scraperInput.includes('goo.gl');
          const cleanName = isUrl ? 'Resort 5 Sao Từ Link GG Maps' : scraperInput;
          const newResort = {
            id: `custom_${Date.now()}`,
            name: cleanName,
            lat: Number((20.5 + Math.random() * 2).toFixed(4)),
            lng: Number((105.5 + Math.random() * 2).toFixed(4)),
            region: 'Khu vực vừa cào',
            rating: 4.9,
            reviewsCount: 1540,
            priceTier: '4.200.000₫ - 15.000.000₫',
            vibe: 'Khu nghỉ dưỡng thiên nhiên cao cấp',
            features: ['Hồ bơi vô cực', 'Suối nước nóng', 'View thung lũng'],
            goldenReview: 'Dịch vụ hoàn hảo đến từng chi tiết nhỏ. Nhân viên lễ phép, không gian nghỉ dưỡng cực kỳ yên tĩnh và riêng tư.',
            images: [
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
            ]
          };

          setResorts(prev => [newResort, ...prev]);
          setSelectedResort(newResort);
          setShowScraperModal(false);
          setScraperInput('');
          alert(`Đã cào thành công dữ liệu cho: ${cleanName}`);
        }
      }, (index + 1) * 800);
    });
  };

  const generateDramaScript = (resort, theme) => {
    let scriptScenes = [];
    if (theme === 'mystery') {
      scriptScenes = [
        {
          id: 1,
          title: 'Tọa Độ Kỳ Bí',
          time: '0 - 5s (Hook)',
          text: `Định vị ${resort.lat}° Bắc, ${resort.lng}° Đông. Ẩn sâu trong ${resort.vibe}, có một quy tắc ngầm mà quản gia ở ${resort.name} luôn dặn khách: Không bao giờ mở cửa sau 12 giờ đêm.`,
          visualPrompt: `Aerial drone shot zooming into ${resort.name}, surrounded by mystical mist and ancient trees, moody dramatic lighting, 9:16 vertical format`,
          videoUrl: '',
          isRendering: false
        },
        {
          id: 2,
          title: 'Bí Mật Từ Review 5 Sao',
          time: '5 - 18s (Bối cảnh)',
          text: `Hàng nghìn người đánh giá 5 sao ca ngợi ${resort.features[0] || 'không gian'}. Nhưng ở bài review gần nhất, một người khách đã ghi lại bức ảnh kỳ lạ phản chiếu dưới mặt nước.`,
          visualPrompt: `Slow cinematic camera movement over a pristine luxury pool reflecting deep shadows, dark elegant ambiance, hyperrealistic 4k`,
          videoUrl: '',
          isRendering: false
        },
        {
          id: 3,
          title: 'Nút Thắt Bất Ngờ',
          time: '18 - 44s (Cao trào)',
          text: `Không phải ma mị, mà đó là món quà bí mật từ chính người quản lý resort gửi lại cho một cặp đôi sau 10 năm họ quay lại đúng căn phòng này.`,
          visualPrompt: `Cinematic close up of a handwritten vintage letter and warm candle light on a polished marble table inside a luxury resort suite`,
          videoUrl: '',
          isRendering: false
        },
        {
          id: 4,
          title: 'Hạ Màn & Lời Mời',
          time: '44 - 60s (Call To Action)',
          text: `Một trải nghiệm 5 sao với giá từ ${resort.priceTier}. Bạn có muốn một lần đặt chân tới tọa độ này để tự viết nên câu chuyện của riêng mình không?`,
          visualPrompt: `Golden hour panoramic view of the entire resort glowing with warm lights against twilight sky, cinematic beauty, 4k`,
          videoUrl: '',
          isRendering: false
        }
      ];
    } else {
      scriptScenes = [
        {
          id: 1,
          title: 'Chuyến Đi Chữa Lành',
          time: '0 - 5s (Hook)',
          text: `Nếu đang cảm thấy kiệt sức với nhịp sống thành phố, hãy nhìn vào tọa độ này trên Google Maps: ${resort.name}, nơi chỉ có tiếng gió và sự tĩnh lặng.`,
          visualPrompt: `First person view walking onto a wooden deck overlooking a boundless ocean or mountain sea of clouds, peaceful morning breeze, 9:16 format`,
          videoUrl: '',
          isRendering: false
        },
        {
          id: 2,
          title: 'Không Gian Độc Bản',
          time: '5 - 18s (Bối cảnh)',
          text: `Đạt trọn vẹn ${resort.rating} sao với ${resort.reviewsCount} lời khen ngợi. Nơi đây gây thương nhớ bởi ${resort.goldenReview}`,
          visualPrompt: `Slow smooth gimbal shot showing luxurious interior blending seamlessly with wild nature, sunlight streaming through curtains`,
          videoUrl: '',
          isRendering: false
        },
        {
          id: 3,
          title: 'Cuộc Hẹn Với Chính Mình',
          time: '18 - 44s (Cao trào)',
          text: `Người ta đến đây không chỉ để check-in, mà để tìm lại những rung cảm nguyên sơ nhất bên tách trà chiều và bữa tối lãng mạn dưới ánh nến.`,
          visualPrompt: `Warm aesthetic tea set on an outdoor table overlooking natural landscape, soft bokeh, cinematic depth of field`,
          videoUrl: '',
          isRendering: false
        },
        {
          id: 4,
          title: 'Hạ Màn & Địa Điểm',
          time: '44 - 60s (Call To Action)',
          text: `Lưu ngay tọa độ ${resort.name} cho chuyến đi sắp tới của bạn. Cuộc đời quá ngắn để bỏ lỡ những hoàng hôn tuyệt đẹp như thế này.`,
          visualPrompt: `Spectacular sunset painting the sky in violet and gold over the resort villas, cinematic 4k masterpiece`,
          videoUrl: '',
          isRendering: false
        }
      ];
    }
    setScenes(scriptScenes);
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert('Trình duyệt không hỗ trợ Web Speech API!');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.lang = 'vi-VN';

    const vnVoice = voiceList.find(v => v.lang === 'vi-VN' || v.lang.includes('vi') || v.name.includes('Vietnamese'));
    if (vnVoice) {
      utterance.voice = vnVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const runAutopilot = async () => {
    setIsAutopilotRunning(true);
    setAutopilotProgress(10);
    setAutopilotStatus('Đang phóng tác kịch bản & phân tích review...');

    generateDramaScript(selectedResort, dramaTheme);
    await new Promise(r => setTimeout(r, 800));

    setAutopilotProgress(30);
    setAutopilotStatus('Đang nạp ảnh Google Maps & tạo Prompt điện ảnh...');
    await new Promise(r => setTimeout(r, 600));

    for (let i = 0; i < scenes.length; i++) {
      setAutopilotProgress(30 + (i + 1) * 15);
      setAutopilotStatus(`Đang render Phân cảnh ${i + 1}/${scenes.length} qua Fal.ai GPU (${aspectRatio})...`);
      
      await new Promise(r => setTimeout(r, 1200));
      setScenes(prev => prev.map((sc, idx) => {
        if (idx === i) {
          return {
            ...sc,
            videoUrl: selectedResort.images[i % selectedResort.images.length],
            isRendering: false
          };
        }
        return sc;
      }));
    }

    setAutopilotProgress(100);
    setAutopilotStatus('Hoàn tất toàn bộ Pipeline! Đang lưu vào bộ nhớ máy...');
    await new Promise(r => setTimeout(r, 500));
    setIsAutopilotRunning(false);
    setActiveTab('timeline');
  };

  const filteredResorts = resorts.filter(r => {
    const dist = calculateDistance(radarCenter.lat, radarCenter.lng, r.lat, r.lng);
    const matchesRadius = dist <= geoRadius;
    const matchesRating = r.rating >= minRatingFilter;
    const matchesKeyword = searchKeyword === '' || 
      r.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      r.region.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesRadius && matchesRating && matchesKeyword;
  });

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* HEADER */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide flex items-center gap-2">
              MapDrama Studio <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">Live Radar</span>
            </h1>
            <p className="text-[11px] text-slate-400">Google Maps 5-Star Resort Scraper & Storyteller</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-0.5 rounded-lg flex items-center border border-slate-700">
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
                aspectRatio === '9:16' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> 9:16
            </button>
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
                aspectRatio === '16:9' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> 16:9
            </button>
          </div>

          <button
            onClick={runAutopilot}
            disabled={isAutopilotRunning}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-lg ${
              isAutopilotRunning 
                ? 'bg-amber-600 animate-pulse text-white' 
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/20'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            {isAutopilotRunning ? 'Đang Xử Lý...' : 'Autopilot 1-Click'}
          </button>
        </div>
      </header>

      {/* SUB-NAV */}
      <div className="h-10 bg-slate-900 border-b border-slate-800/80 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'radar' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" /> Live Radar & Bản Đồ
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'studio' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Phóng Tác Drama
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'timeline' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" /> Timeline Player ({aspectRatio})
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              activeTab === 'vault' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" /> Thư Viện Máy ({savedVaultProjects.length})
          </button>
        </div>

        <button
          onClick={() => setShowScraperModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 rounded text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" /> Cào Thêm Từ Google Maps
        </button>
      </div>

      {/* AUTOPILOT STATUS BANNER */}
      {isAutopilotRunning && (
        <div className="bg-emerald-950/80 border-b border-emerald-800/60 px-4 py-2 flex items-center justify-between text-xs text-emerald-200 shrink-0">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
            <span>{autopilotStatus}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
              <div 
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${autopilotProgress}%` }}
              />
            </div>
            <span className="font-mono text-emerald-400 font-bold">{autopilotProgress}%</span>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="flex-1 overflow-hidden">
        
        {/* RADAR TAB */}
        {activeTab === 'radar' && (
          <div className="h-full flex flex-col md:flex-row overflow-hidden">
            <div className="flex-1 relative bg-slate-900 border-r border-slate-800 flex flex-col">
              <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
                <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-1.5 flex items-center gap-2 text-xs shadow-xl">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <button
                    onClick={() => setMapTileMode('satellite')}
                    className={`px-2 py-0.5 rounded ${mapTileMode === 'satellite' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300'}`}
                  >
                    Vệ Tinh 4K
                  </button>
                  <button
                    onClick={() => setMapTileMode('street')}
                    className={`px-2 py-0.5 rounded ${mapTileMode === 'street' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300'}`}
                  >
                    Giao Thông
                  </button>
                  <button
                    onClick={() => setMapTileMode('terrain')}
                    className={`px-2 py-0.5 rounded ${mapTileMode === 'terrain' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-300'}`}
                  >
                    Địa Hình 3D
                  </button>
                </div>

                <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-1.5 flex items-center gap-2 text-xs shadow-xl">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Tâm:</span>
                  <select
                    value={radarCenter.name}
                    onChange={(e) => {
                      const presets = {
                        'Hà Nội & Miền Bắc': { lat: 21.0285, lng: 105.8542, name: 'Hà Nội & Miền Bắc' },
                        'Sa Pa & Tây Bắc': { lat: 22.3364, lng: 103.8438, name: 'Sa Pa & Tây Bắc' },
                        'Quảng Ninh & Vịnh Hạ Long': { lat: 20.9500, lng: 107.0833, name: 'Quảng Ninh & Vịnh Hạ Long' },
                        'Đà Nẵng & Hội An': { lat: 16.0544, lng: 108.2022, name: 'Đà Nẵng & Hội An' },
                        'Khánh Hòa & Vĩnh Hy': { lat: 11.9000, lng: 109.1500, name: 'Khánh Hòa & Vĩnh Hy' },
                        'Đà Lạt & Tây Nguyên': { lat: 11.9404, lng: 108.4583, name: 'Đà Lạt & Tây Nguyên' },
                        'Phú Quốc & Miền Tây': { lat: 10.2289, lng: 103.9572, name: 'Phú Quốc & Miền Tây' }
                      };
                      setRadarCenter(presets[e.target.value]);
                    }}
                    className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-0.5 outline-none font-medium"
                  >
                    <option value="Hà Nội & Miền Bắc">Hà Nội & Miền Bắc</option>
                    <option value="Sa Pa & Tây Bắc">Sa Pa & Tây Bắc</option>
                    <option value="Quảng Ninh & Vịnh Hạ Long">Quảng Ninh & Vịnh Hạ Long</option>
                    <option value="Đà Nẵng & Hội An">Đà Nẵng & Hội An</option>
                    <option value="Khánh Hòa & Vĩnh Hy">Khánh Hòa & Vĩnh Hy</option>
                    <option value="Đà Lạt & Tây Nguyên">Đà Lạt & Tây Nguyên</option>
                    <option value="Phú Quốc & Miền Tây">Phú Quốc & Miền Tây</option>
                  </select>
                </div>
              </div>

              <div 
                className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center cursor-crosshair select-none"
                style={{
                  backgroundImage: mapTileMode === 'satellite' 
                    ? `radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, rgba(2, 6, 23, 0.95) 75%), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')` 
                    : `radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, rgba(2, 6, 23, 0.95) 80%), url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xRatio = (e.clientX - rect.left) / rect.width;
                  const yRatio = (e.clientY - rect.top) / rect.height;
                  const newLat = Number((23 - yRatio * 14).toFixed(4));
                  const newLng = Number((102 + xRatio * 8).toFixed(4));
                  setRadarCenter({ lat: newLat, lng: newLng, name: `Tọa độ ${newLat}, ${newLng}` });
                }}
              >
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-20 border border-slate-700/50">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="border border-slate-700/30"></div>
                  ))}
                </div>

                <div 
                  className="absolute rounded-full border-2 border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center pointer-events-none transition-all duration-300"
                  style={{
                    width: `${Math.min(geoRadius * 1.5, 480)}px`,
                    height: `${Math.min(geoRadius * 1.5, 480)}px`
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                  <div className="absolute top-2 text-[10px] text-emerald-400 font-mono font-bold bg-slate-900/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Bán kính: {geoRadius} km
                  </div>
                </div>

                {filteredResorts.map((r) => {
                  const isSelected = selectedResort.id === r.id;
                  const topPercent = Math.max(15, Math.min(85, 50 + (radarCenter.lat - r.lat) * 12));
                  const leftPercent = Math.max(15, Math.min(85, 50 + (r.lng - radarCenter.lng) * 12));

                  return (
                    <div
                      key={r.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedResort(r);
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform ${
                        isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                      }`}
                      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
                    >
                      <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold shadow-2xl backdrop-blur-md border ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 border-white ring-2 ring-emerald-400' 
                          : 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-emerald-400'
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950 fill-current' : 'text-emerald-400'}`} />
                        <span>{r.name}</span>
                        <span className="text-[10px] bg-slate-950/30 px-1 rounded font-mono">⭐ {r.rating}</span>
                      </div>
                    </div>
                  );
                })}

                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur border border-slate-800 rounded px-2.5 py-1 text-[11px] text-slate-400 flex items-center gap-3">
                  <span>Tâm quét: <strong className="text-emerald-400 font-mono">{radarCenter.lat}°N, {radarCenter.lng}°E</strong></span>
                  <span>•</span>
                  <span>Tìm thấy: <strong className="text-white">{filteredResorts.length}</strong> tọa độ phù hợp</span>
                </div>
              </div>
            </div>

            {/* DANH SÁCH RESORT */}
            <div className="w-full md:w-96 bg-slate-950 border-l border-slate-800 flex flex-col h-full overflow-hidden">
              <div className="p-3 border-b border-slate-800 bg-slate-900/60 flex flex-col gap-2.5">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Tìm tên resort, tỉnh thành, tiện ích..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Khoanh vùng bán kính</span>
                    <span className="font-mono font-bold text-emerald-400">{geoRadius} km</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="25"
                    value={geoRadius}
                    onChange={(e) => setGeoRadius(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">Đánh giá tối thiểu:</span>
                  <div className="flex gap-1">
                    {[4.7, 4.8, 4.9, 5.0].map(star => (
                      <button
                        key={star}
                        onClick={() => setMinRatingFilter(star)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                          minRatingFilter === star 
                            ? 'bg-emerald-600 text-white border-emerald-500' 
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        {star}★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {filteredResorts.map((r) => {
                  const isSelected = selectedResort.id === r.id;
                  const dist = calculateDistance(radarCenter.lat, radarCenter.lng, r.lat, r.lng);

                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedResort(r)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                        isSelected 
                          ? 'bg-slate-900/90 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg' 
                          : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex gap-3">
                        <img 
                          src={r.images[0]} 
                          alt={r.name} 
                          className="w-20 h-20 rounded-lg object-cover border border-slate-800 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h3 className="text-xs font-bold text-white truncate">{r.name}</h3>
                            <span className="text-[11px] font-mono font-bold text-amber-400 shrink-0">⭐ {r.rating}</span>
                          </div>
                          <p className="text-[11px] text-emerald-400 font-medium truncate mt-0.5">{r.vibe}</p>
                          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                            <span>Cách tâm: <strong className="text-slate-300 font-mono">{dist} km</strong></span>
                            <span>•</span>
                            <span>{r.reviewsCount} review</span>
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{r.priceTier}</p>
                        </div>
                      </div>

                      <div className="bg-slate-950/60 p-2 rounded border border-slate-800/60 text-[11px] text-slate-300 italic line-clamp-2">
                        "{r.goldenReview}"
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex flex-wrap gap-1">
                          {r.features.slice(0, 2).map((feat, fidx) => (
                            <span key={fidx} className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/60">
                              {feat}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedResort(r);
                            generateDramaScript(r, dramaTheme);
                            setActiveTab('studio');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition flex items-center gap-1 shadow-sm"
                        >
                          <Sparkles className="w-3 h-3" /> Phóng Tác
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STUDIO TAB */}
        {activeTab === 'studio' && (
          <div className="h-full flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-80 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 overflow-y-auto">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Resort Đang Phóng Tác</span>
                <h2 className="text-base font-bold text-white mt-1">{selectedResort.name}</h2>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedResort.lat}°N, {selectedResort.lng}°E ({selectedResort.region})
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300">Thể loại kịch bản phóng tác:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => {
                      setDramaTheme('mystery');
                      generateDramaScript(selectedResort, 'mystery');
                    }}
                    className={`p-2 rounded-lg text-xs font-bold border text-left transition ${
                      dramaTheme === 'mystery' 
                        ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    Bí Ẩn Tọa Độ
                  </button>
                  <button
                    onClick={() => {
                      setDramaTheme('romance');
                      generateDramaScript(selectedResort, 'romance');
                    }}
                    className={`p-2 rounded-lg text-xs font-bold border text-left transition ${
                      dramaTheme === 'romance' 
                        ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500 ring-1 ring-emerald-500' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    Chữa Lành & Ký Ức
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                    ⭐ Đánh Giá Thực Tế (Google Maps)
                  </span>
                  <span className="text-[10px] text-slate-500">{selectedResort.rating} / 5.0</span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{selectedResort.goldenReview}"
                </p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                  Dữ liệu trích xuất từ hơn {selectedResort.reviewsCount} phản hồi đã xác minh.
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Tốc độ đọc Voice A.I:</span>
                  <span className="font-mono font-bold text-emerald-400">{speechRate}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <button
                onClick={saveCurrentProjectToVault}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold border border-slate-700 flex items-center justify-center gap-1.5 transition mt-auto"
              >
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> Lưu Toàn Bộ Vào Máy (Offline)
              </button>
            </div>

            <div className="flex-1 bg-slate-950 p-4 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Phân Cảnh Kịch Bản (Chuẩn 60 Giây - Khung {aspectRatio})
                </h3>
                <button
                  onClick={() => {
                    const fullText = scenes.map(s => s.text).join(' ');
                    speakText(fullText);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    isSpeaking 
                      ? 'bg-rose-600 text-white animate-pulse' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  {isSpeaking ? 'Dừng Giọng Đọc' : 'Nghe Thử Toàn Bộ Voice'}
                </button>
              </div>

              {scenes.map((scene, idx) => (
                <div 
                  key={scene.id}
                  className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-col md:flex-row gap-4"
                >
                  <div className="w-full md:w-44 h-32 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative shrink-0 flex items-center justify-center">
                    <img
                      src={selectedResort.images[idx % selectedResort.images.length]}
                      alt={scene.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 left-1.5 bg-slate-950/80 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-400 font-bold border border-emerald-500/30">
                      {scene.time}
                    </div>
                  </div>

                  <div className="flex-1 flex-col gap-2 flex">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-100 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                          {idx + 1}
                        </span>
                        {scene.title}
                      </h4>
                      <button
                        onClick={() => speakText(scene.text)}
                        className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Đọc cảnh này
                      </button>
                    </div>

                    <textarea
                      value={scene.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        setScenes(prev => prev.map(s => s.id === scene.id ? { ...s, text: newText } : s));
                      }}
                      rows={2}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />

                    <div className="bg-slate-950/40 p-2 rounded border border-slate-800/60">
                      <span className="text-[10px] font-mono font-bold text-slate-400 block mb-0.5">
                        Fal.ai Video Prompt ({aspectRatio}):
                      </span>
                      <p className="text-[11px] font-mono text-emerald-300/80 line-clamp-1">
                        {scene.visualPrompt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 'timeline' && (
          <div className="h-full flex items-center justify-center p-4 bg-slate-950 overflow-y-auto">
            <div className={`transition-all duration-300 flex flex-col items-center ${
              aspectRatio === '9:16' ? 'w-full max-w-[340px]' : 'w-full max-w-3xl'
            }`}>
              <div 
                className={`relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 bg-black flex flex-col justify-between ${
                  aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'
                }`}
                style={{
                  backgroundImage: `url(${selectedResort.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

                <div className="relative z-10 p-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur px-2 py-1 rounded-full border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold font-mono">{selectedResort.lat}°N, {selectedResort.lng}°E</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                    5★ Verified
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <button 
                    onClick={() => {
                      const fullText = scenes.map(s => s.text).join(' ');
                      speakText(fullText);
                    }}
                    className="w-12 h-12 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition"
                  >
                    {isSpeaking ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                  </button>
                </div>

                <div className="relative z-10 p-4 flex flex-col gap-2">
                  <div className="bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-center">
                    <p className="text-xs text-amber-300 font-bold mb-1">{selectedResort.name}</p>
                    <p className="text-xs text-white leading-relaxed font-medium">
                      "{scenes[0].text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-300 px-1">
                    <span>Độ dài: 60s Full HD</span>
                    <span>Format: {aspectRatio}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-3">
                <button
                  onClick={saveCurrentProjectToVault}
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" /> Lưu Vào Máy
                </button>
                <button
                  onClick={() => {
                    const srtContent = scenes.map((s, idx) => {
                      return `${idx + 1}\n00:00:${idx * 15},000 --> 00:00:${(idx + 1) * 15},000\n${s.text}\n`;
                    }).join('\n');
                    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${selectedResort.id}_subtitle.srt`;
                    link.click();
                  }}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Download className="w-3.5 h-3.5" /> Xuất File Phụ Đề (.SRT)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VAULT TAB */}
        {activeTab === 'vault' && (
          <div className="h-full p-4 bg-slate-950 overflow-y-auto">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    Thư Viện Video & Kịch Bản Đã Lưu (IndexedDB Offline)
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Lưu trữ vĩnh viễn trên máy của bạn. Thoát trình duyệt hoặc mở lại không bao giờ bị mất video.
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30">
                  {savedVaultProjects.length} Dự Án
                </span>
              </div>

              {savedVaultProjects.length === 0 ? (
                <div className="py-16 text-center text-slate-500 flex flex-col items-center gap-2">
                  <Database className="w-10 h-10 text-slate-700" />
                  <p className="text-xs">Chưa có dự án nào được lưu. Hãy bấm "Lưu Vào Máy" sau khi tạo kịch bản!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedVaultProjects.map((proj) => (
                    <div 
                      key={proj.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-col justify-between gap-3"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={proj.resort?.images[0]} 
                          alt={proj.name} 
                          className="w-16 h-16 rounded-lg object-cover border border-slate-800 shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{proj.name}</h4>
                          <p className="text-[11px] text-emerald-400 mt-0.5">Khung hình: {proj.aspectRatio || '9:16'}</p>
                          <p className="text-[10px] text-slate-500 mt-1">Lưu lúc: {proj.savedAt}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <button
                          onClick={() => {
                            setSelectedResort(proj.resort);
                            setScenes(proj.scenes);
                            if (proj.aspectRatio) setAspectRatio(proj.aspectRatio);
                            setActiveTab('timeline');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1 transition"
                        >
                          <Play className="w-3 h-3" /> Mở Xem Lại
                        </button>
                        <button
                          onClick={() => deleteProjectFromVault(proj.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition"
                          title="Xóa khỏi máy"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL CÀO GOOGLE MAPS */}
      {showScraperModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-5 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" /> Cào Dữ Liệu Chi Tiết Từ Google Maps
              </h3>
              <button 
                onClick={() => setShowScraperModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dán bất kỳ <strong>Link chia sẻ Google Maps</strong> hoặc <strong>Tên resort + Tỉnh thành</strong> để tự động bóc tách tọa độ vệ tinh, ảnh 4K và các đánh giá 5 sao đắt giá nhất.
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-slate-400">Link hoặc Từ khóa:</label>
              <input
                type="text"
                value={scraperInput}
                onChange={(e) => setScraperInput(e.target.value)}
                placeholder="VD: https://maps.app.goo.gl/... hoặc Legacy Yên Tử"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {scraperLogs.length > 0 && (
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[10px] space-y-1 text-slate-300 max-h-28 overflow-y-auto">
                {scraperLogs.map((log, i) => (
                  <div key={i} className="text-emerald-400">{log}</div>
                ))}
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowScraperModal(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={handleScrapeGoogleMaps}
                disabled={isScraping}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                {isScraping ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                {isScraping ? 'Đang Cào...' : 'Bắt Đầu Cào'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
