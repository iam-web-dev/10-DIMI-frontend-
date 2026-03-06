import React, { useState } from "react";
import {
  LayoutDashboard,
  Newspaper,
  Trophy,
  Users,
  GraduationCap,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Search,
  ChevronRight,
  Image,
  Save,
  X,
  Menu,
  Upload,
  Play,
  Calendar,
  Video,
  AlertTriangle,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import { useData } from "../../Context/DataContext";
import { useLanguage } from "../../Context/LanguageContext";

const Admin_main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_logged_in") === "true";
  });
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    news,
    addNews,
    updateNews,
    deleteNews,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    achievementsCategories,
    addAchievementsCategory,
    updateAchievementsCategory,
    deleteAchievementsCategory,
    team,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    feedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback,
    settings,
    updateSettings,
  } = useData();

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      login === (settings?.adminLogin || "admin") &&
      password === (settings?.adminPassword || "admin777")
    ) {
      setIsLoggedIn(true);
      sessionStorage.setItem("admin_logged_in", "true");
      setError("");
    } else {
      setError("Login yoki parol noto'g'ri!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("admin_logged_in");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#04142C] flex items-center justify-center px-6">
        <div className="w-full max-w-[400px] bg-white rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-montserrat font-bold text-[#04142C] mb-2">
              10-DIMI
            </h1>
            <p className="text-[#04142C]/50 text-sm uppercase tracking-widest font-bold">
              Admin Panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#04142C] ml-1">
                Login
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className={`w-full bg-[#04142C]/5 border-2 ${error ? "border-red-500" : "border-transparent focus:border-[#04142C]/20"} px-6 py-4 rounded-2xl outline-none transition-all font-medium`}
                placeholder="Admin"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#04142C] ml-1">
                Maxfiy parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-[#04142C]/5 border-2 ${error ? "border-red-500" : "border-transparent focus:border-[#04142C]/20"} px-6 py-4 rounded-2xl outline-none transition-all font-medium`}
                placeholder="••••••••"
                required
              />
              {error && (
                <p className="text-red-500 text-xs font-bold ml-1 animate-pulse">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#04142C] text-white h-[55px] rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#04142C]/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#04142C]/20"
            >
              Kirish
              <ChevronRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // useData() call moved to the top

  const sidebarItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "news", name: "Yangiliklar", icon: Newspaper },
    { id: "achievements", name: "Yutuqlarimiz", icon: Trophy },
    { id: "team", name: "Bizning jamoa", icon: Users },
    { id: "courses", name: "To’garaklar", icon: GraduationCap },
    { id: "feedbacks", name: "Fikrlar", icon: MessageSquare },
    { id: "settings", name: "Sozlamalar", icon: Settings },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#F3F4F6] font-open-sans overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#04142C]/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
                fixed inset-y-0 left-0 w-80 bg-[#04142C] text-white flex flex-col shrink-0 z-[101] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                lg:relative lg:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="p-8 border-b border-white/10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-montserrat font-bold">10-DIMI</h1>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto mt-4 custom-scrollbar">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                activeTab === item.id
                  ? "bg-white text-[#04142C] shadow-lg scale-[1.02]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                size={20}
                className={
                  activeTab === item.id
                    ? "text-[#04142C]"
                    : "text-white/40 group-hover:text-white"
                }
              />
              <span className="font-semibold">{item.name}</span>
              {activeTab === item.id && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-2">
          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-3 text-white/60 hover:text-white transition-colors w-full px-4 text-sm font-medium h-12 rounded-xl hover:bg-white/5"
          >
            <LayoutDashboard size={18} />
            Saytga qaytish
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors w-full px-4 text-sm font-medium h-12 rounded-xl hover:bg-white/5"
          >
            <LogOut size={18} />
            Chiqish
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white h-16 px-6 flex items-center justify-between border-b border-[#04142C]/10 shrink-0">
          <button onClick={toggleSidebar} className="p-2 -ml-2 text-[#04142C]">
            <Menu size={24} />
          </button>
          <span className="font-montserrat font-bold text-[#04142C] text-lg uppercase tracking-tight">
            {sidebarItems.find((i) => i.id === activeTab)?.name}
          </span>
          <div className="w-10"></div> {/* Spacer for symmetry */}
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "news" && (
              <EntityManager
                title="Yangiliklar"
                data={news}
                onAdd={addNews}
                onUpdate={updateNews}
                onDelete={deleteNews}
                type="news"
              />
            )}
            {activeTab === "achievements" && <AchievementsManager />}
            {activeTab === "courses" && <CoursesManager />}
            {activeTab === "team" && (
              <EntityManager
                title="Bizning jamoa"
                data={team}
                onAdd={addTeamMember}
                onUpdate={updateTeamMember}
                onDelete={deleteTeamMember}
                type="team"
              />
            )}
            {activeTab === "feedbacks" && (
              <EntityManager
                title="Fikrlar"
                data={feedbacks}
                onAdd={addFeedback}
                onUpdate={updateFeedback}
                onDelete={deleteFeedback}
                type="feedbacks"
              />
            )}
            {activeTab === "settings" && <SettingsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { news, achievements, team, courses, feedbacks } = useData();
  const stats = [
    {
      name: "Yangiliklar",
      count: news.length,
      icon: Newspaper,
      color: "bg-blue-500",
    },
    {
      name: "Yutuqlar",
      count: achievements.length,
      icon: Trophy,
      color: "bg-yellow-500",
    },
    {
      name: "Xodimlar",
      count: team.length,
      icon: Users,
      color: "bg-green-500",
    },
    {
      name: "To’garaklar",
      count: courses.length,
      icon: GraduationCap,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-montserrat font-bold text-[#04142C] mb-8">
        Boshqaruv paneli
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-[24px] shadow-md border border-[#04142C]/5 flex items-center gap-5 hover:shadow-xl transition-all duration-300"
          >
            <div className={`${stat.color} p-4 rounded-2xl text-white`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[#04142C]/50 text-xs font-bold uppercase tracking-widest">
                {stat.name}
              </p>
              <p className="text-3xl font-montserrat font-bold text-[#04142C] mt-0.5">
                {stat.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#04142C] rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-4xl font-montserrat font-bold mb-4">
            10-DIMI Admin Paneliga xush kelibsiz!
          </h3>
          <p className="text-white/70 text-lg leading-relaxed mb-8">
            Bu yerda siz saytdagi barcha dinamik ma'lumotlarni osonlik bilan
            boshqarishingiz mumkin. Yangi yangiliklar qo'shing, yutuqlarni
            yangilang va jamoa ro'yxatiga o'zgartirishlar kiriting.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 px-6 py-3 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
              <span className="text-sm font-semibold">Tizim faol holatda</span>
            </div>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "DIQQAT! Barcha kiritilgan ma'lumotlar o'chib ketadi va tizim dastlabki holatiga qaytadi. Rozimisiz?",
                  )
                ) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="bg-red-500/20 hover:bg-red-500 text-red-100 px-6 py-3 rounded-full text-sm font-semibold transition-all border border-red-500/30"
            >
              Xotirani tozalash (Reset)
            </button>
          </div>
        </div>
        <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-10">
          <LayoutDashboard size={400} />
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ title, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
      <div
        className="absolute inset-0 bg-[#04142C]/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-2xl font-montserrat font-bold text-[#04142C] mb-2">
          O'chirishni tasdiqlaysizmi?
        </h3>
        <p className="text-[#04142C]/60 leading-relaxed mb-8">
          Ushbu ma'lumotni o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib
          bo'lmaydi.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold text-[#04142C]/60 hover:bg-gray-100 transition-all"
          >
            Bekor qilish
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3.5 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

const AchievementsManager = () => {
  const {
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    achievementsCategories,
    addAchievementsCategory,
    updateAchievementsCategory,
    deleteAchievementsCategory,
  } = useData();

  const [subTab, setSubTab] = useState("achievements");
  const [catToDelete, setCatToDelete] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [newCat, setNewCat] = useState({ key: "", uz: "", ru: "", en: "" });
  const [showCatForm, setShowCatForm] = useState(false);

  const handleSaveCat = () => {
    if (!newCat.key || !newCat.uz) return;
    if (editingCat) {
      updateAchievementsCategory(editingCat.key, newCat);
      setEditingCat(null);
    } else {
      // Make key URL-friendly
      const key = newCat.key
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
      addAchievementsCategory({ ...newCat, key });
    }
    setNewCat({ key: "", uz: "", ru: "", en: "" });
    setShowCatForm(false);
  };

  const startEditCat = (cat) => {
    setEditingCat(cat);
    setNewCat({ ...cat });
    setShowCatForm(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-montserrat font-bold text-[#04142C] mb-2">
            Yutuqlarimiz
          </h2>
          <p className="text-[#04142C]/40 text-sm font-medium">
            {subTab === "catalog"
              ? `${achievementsCategories.length} ta kategoriya`
              : `${achievements.length} ta yutuq`}
          </p>
        </div>
        <div className="flex bg-[#04142C]/5 p-1 rounded-2xl gap-1">
          <button
            onClick={() => setSubTab("achievements")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${subTab === "achievements" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40 hover:text-[#04142C]"}`}
          >
            <Trophy size={15} /> Yutuqlar
          </button>
          <button
            onClick={() => setSubTab("catalog")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${subTab === "catalog" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40 hover:text-[#04142C]"}`}
          >
            <Search size={15} /> Katalog
          </button>
        </div>
      </div>

      {subTab === "achievements" && (
        <EntityManager
          title=""
          data={achievements}
          onAdd={addAchievement}
          onUpdate={updateAchievement}
          onDelete={deleteAchievement}
          type="achievements"
          hideTitle
        />
      )}

      {subTab === "catalog" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setShowCatForm(true);
                setEditingCat(null);
                setNewCat({ key: "", uz: "", ru: "", en: "" });
              }}
              className="flex items-center gap-2 bg-[#04142C] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#04142C]/90 transition-all shadow-lg shadow-[#04142C]/20"
            >
              <Plus size={18} /> Yangi Kategoriya
            </button>
          </div>

          {/* Category Form */}
          {showCatForm && (
            <div className="bg-white rounded-[24px] p-8 mb-6 border border-[#04142C]/10 shadow-sm animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-xl font-montserrat font-bold text-[#04142C] mb-6">
                {editingCat
                  ? "Kategoriyani tahrirlash"
                  : "Yangi kategoriya qo'shish"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    Kalit so'z (Key) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCat.key}
                    disabled={!!editingCat}
                    onChange={(e) =>
                      setNewCat({ ...newCat, key: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-mono text-sm disabled:opacity-50"
                    placeholder="masalan: science"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    O'zbekcha nomi <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCat.uz}
                    onChange={(e) =>
                      setNewCat({ ...newCat, uz: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-medium text-sm"
                    placeholder="masalan: Fan"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    Ruscha nomi
                  </label>
                  <input
                    type="text"
                    value={newCat.ru}
                    onChange={(e) =>
                      setNewCat({ ...newCat, ru: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-medium text-sm"
                    placeholder="masalan: Наука"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    Inglizcha nomi
                  </label>
                  <input
                    type="text"
                    value={newCat.en}
                    onChange={(e) =>
                      setNewCat({ ...newCat, en: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-medium text-sm"
                    placeholder="masalan: Science"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowCatForm(false);
                    setEditingCat(null);
                    setNewCat({ key: "", uz: "", ru: "", en: "" });
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-[#04142C]/50 hover:bg-gray-100 transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSaveCat}
                  className="flex items-center gap-2 bg-[#04142C] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#04142C]/90 transition-all"
                >
                  <Save size={16} /> Saqlash
                </button>
              </div>
            </div>
          )}

          {/* Category List */}
          <div className="bg-white rounded-[24px] overflow-hidden border border-[#04142C]/5 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#04142C]/5">
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    Kalit so'z
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    O'zbekcha
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest hidden md:table-cell">
                    Ruscha
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest hidden lg:table-cell">
                    Inglizcha
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    Yutuqlar
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {achievementsCategories.map((cat) => {
                  const count = achievements.filter(
                    (a) => a.categoryKey === cat.key,
                  ).length;
                  const isProtected = cat.key === "all";
                  return (
                    <tr
                      key={cat.key}
                      className="hover:bg-gray-50/80 transition-colors border-b border-[#04142C]/5 last:border-0"
                    >
                      <td className="px-8 py-5">
                        <span className="font-mono text-sm bg-[#04142C]/5 px-3 py-1 rounded-lg text-[#04142C]">
                          {cat.key}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-[#04142C]">
                        {cat.uz}
                      </td>
                      <td className="px-8 py-5 text-[#04142C]/60 hidden md:table-cell">
                        {cat.ru}
                      </td>
                      <td className="px-8 py-5 text-[#04142C]/60 hidden lg:table-cell">
                        {cat.en}
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
                          {count} ta
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {isProtected ? (
                          <span className="text-[#04142C]/30 text-xs font-bold uppercase tracking-wider">
                            Himoyalangan
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => startEditCat(cat)}
                              className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                              title="Tahrirlash"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => setCatToDelete(cat)}
                              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                              title="O'chirish"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {catToDelete && (
        <DeleteModal
          onClose={() => setCatToDelete(null)}
          onConfirm={() => {
            deleteAchievementsCategory(catToDelete.key);
            setCatToDelete(null);
          }}
        />
      )}
    </div>
  );
};

const CoursesManager = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    coursesCategories,
    addCoursesCategory,
    updateCoursesCategory,
    deleteCoursesCategory,
  } = useData();

  const [subTab, setSubTab] = useState("courses");
  const [catToDelete, setCatToDelete] = useState(null);
  const [editingCat, setEditingCat] = useState(null);
  const [newCat, setNewCat] = useState({ key: "", uz: "", ru: "", en: "" });
  const [showCatForm, setShowCatForm] = useState(false);

  const handleSaveCat = () => {
    if (!newCat.key || !newCat.uz) return;
    if (editingCat) {
      updateCoursesCategory(editingCat.key, newCat);
      setEditingCat(null);
    } else {
      const key = newCat.key
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
      addCoursesCategory({ ...newCat, key });
    }
    setNewCat({ key: "", uz: "", ru: "", en: "" });
    setShowCatForm(false);
  };

  const startEditCat = (cat) => {
    setEditingCat(cat);
    setNewCat({ ...cat });
    setShowCatForm(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-montserrat font-bold text-[#04142C] mb-2">
            To'garaklar
          </h2>
          <p className="text-[#04142C]/40 text-sm font-medium">
            {subTab === "catalog"
              ? `${coursesCategories.length} ta kategoriya`
              : `${courses.length} ta to'garak`}
          </p>
        </div>
        <div className="flex bg-[#04142C]/5 p-1 rounded-2xl gap-1">
          <button
            onClick={() => setSubTab("courses")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${subTab === "courses" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40 hover:text-[#04142C]"}`}
          >
            <GraduationCap size={15} /> To'garaklar
          </button>
          <button
            onClick={() => setSubTab("catalog")}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${subTab === "catalog" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40 hover:text-[#04142C]"}`}
          >
            <Search size={15} /> Katalog
          </button>
        </div>
      </div>

      {subTab === "courses" && (
        <EntityManager
          title=""
          data={courses}
          onAdd={addCourse}
          onUpdate={updateCourse}
          onDelete={deleteCourse}
          type="courses"
          hideTitle
        />
      )}

      {subTab === "catalog" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
              onClick={() => {
                setShowCatForm(true);
                setEditingCat(null);
                setNewCat({ key: "", uz: "", ru: "", en: "" });
              }}
              className="flex items-center gap-2 bg-[#04142C] text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#04142C]/90 transition-all shadow-lg shadow-[#04142C]/20"
            >
              <Plus size={18} /> Yangi Kategoriya
            </button>
          </div>

          {showCatForm && (
            <div className="bg-white rounded-[24px] p-8 mb-6 border border-[#04142C]/10 shadow-sm animate-in slide-in-from-top-4 duration-300">
              <h3 className="text-xl font-montserrat font-bold text-[#04142C] mb-6">
                {editingCat
                  ? "Kategoriyani tahrirlash"
                  : "Yangi kategoriya qo'shish"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    Kalit so'z (Key) <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCat.key}
                    disabled={!!editingCat}
                    onChange={(e) =>
                      setNewCat({ ...newCat, key: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-mono text-sm disabled:opacity-50"
                    placeholder="masalan: math"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    O'zbekcha nomi <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCat.uz}
                    onChange={(e) =>
                      setNewCat({ ...newCat, uz: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-medium text-sm"
                    placeholder="masalan: Matematika"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    Ruscha nomi
                  </label>
                  <input
                    type="text"
                    value={newCat.ru}
                    onChange={(e) =>
                      setNewCat({ ...newCat, ru: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-medium text-sm"
                    placeholder="masalan: Математика"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-[#04142C]">
                    Inglizcha nomi
                  </label>
                  <input
                    type="text"
                    value={newCat.en}
                    onChange={(e) =>
                      setNewCat({ ...newCat, en: e.target.value })
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-5 py-3.5 rounded-xl outline-none transition-all font-medium text-sm"
                    placeholder="masalan: Mathematics"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowCatForm(false);
                    setEditingCat(null);
                    setNewCat({ key: "", uz: "", ru: "", en: "" });
                  }}
                  className="px-6 py-3 rounded-xl font-bold text-[#04142C]/50 hover:bg-gray-100 transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  onClick={handleSaveCat}
                  className="flex items-center gap-2 bg-[#04142C] text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-[#04142C]/90 transition-all"
                >
                  <Save size={16} /> Saqlash
                </button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-[24px] overflow-hidden border border-[#04142C]/5 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#04142C]/5">
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    Kalit so'z
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    O'zbekcha
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest hidden md:table-cell">
                    Ruscha
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest hidden lg:table-cell">
                    Inglizcha
                  </th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    To'garaklar
                  </th>
                  <th className="px-8 py-5 text-right text-xs font-bold text-[#04142C]/30 uppercase tracking-widest">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody>
                {coursesCategories.map((cat) => {
                  const count = courses.filter(
                    (c) => c.categoryKey === cat.key,
                  ).length;
                  const isProtected = cat.key === "all";
                  return (
                    <tr
                      key={cat.key}
                      className="hover:bg-gray-50/80 transition-colors border-b border-[#04142C]/5 last:border-0"
                    >
                      <td className="px-8 py-5">
                        <span className="font-mono text-sm bg-[#04142C]/5 px-3 py-1 rounded-lg text-[#04142C]">
                          {cat.key}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-[#04142C]">
                        {cat.uz}
                      </td>
                      <td className="px-8 py-5 text-[#04142C]/60 hidden md:table-cell">
                        {cat.ru}
                      </td>
                      <td className="px-8 py-5 text-[#04142C]/60 hidden lg:table-cell">
                        {cat.en}
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full">
                          {count} ta
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {isProtected ? (
                          <span className="text-[#04142C]/30 text-xs font-bold uppercase tracking-wider">
                            Himoyalangan
                          </span>
                        ) : (
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => startEditCat(cat)}
                              className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                              title="Tahrirlash"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => setCatToDelete(cat)}
                              className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                              title="O'chirish"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {catToDelete && (
        <DeleteModal
          onClose={() => setCatToDelete(null)}
          onConfirm={() => {
            deleteCoursesCategory(catToDelete.key);
            setCatToDelete(null);
          }}
        />
      )}
    </div>
  );
};

const EntityManager = ({
  title,
  data,
  onAdd,
  onUpdate,
  onDelete,
  type,
  hideTitle,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredData = data.filter((item) => {
    const name = (item.uz?.name || item.uz?.title || "").toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {!hideTitle && (
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-montserrat font-bold text-[#04142C] mb-2">
              {title}
            </h2>
            <p className="text-[#04142C]/50 font-medium">
              Jami: {data.length} ta element
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="bg-[#04142C] text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-[#04142C]/90 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <Plus size={20} />
            Yangi qo'shish
          </button>
        </div>
      )}
      {hideTitle && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className="bg-[#04142C] text-white px-8 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-[#04142C]/90 hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            <Plus size={20} />
            Yangi qo'shish
          </button>
        </div>
      )}

      <div className="bg-white rounded-[24px] shadow-lg border border-[#04142C]/5 overflow-hidden ring-1 ring-[#04142C]/5">
        <div className="p-6 border-b border-[#04142C]/5 bg-gray-50/50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#04142C]/30"
              size={18}
            />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#04142C]/10 rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#04142C]/10 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[#04142C]/40 text-[11px] uppercase font-bold tracking-widest border-b border-[#04142C]/5">
                <th className="px-8 py-5">Element</th>
                <th className="px-8 py-5">
                  {type === "achievements" || type === "courses"
                    ? "Kategoriya"
                    : "Turi / Holati"}
                </th>
                {type === "achievements" && (
                  <th className="px-8 py-5">Shakli</th>
                )}
                {type === "courses" && <th className="px-8 py-5">Xona</th>}
                <th className="px-8 py-5 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#04142C]/5">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden border border-[#04142C]/10 shrink-0">
                        <img
                          src={
                            item.image ||
                            (item.media && item.media[0]?.url) ||
                            `https://ui-avatars.com/api/?name=${item.uz?.name || item.uz?.title}&background=random`
                          }
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#04142C] text-lg leading-tight uppercase tracking-tight">
                          {item.uz?.name || item.uz?.title}
                        </p>
                        <p className="text-[#04142C]/50 text-sm mt-1 line-clamp-1 italic">
                          {type === "courses" &&
                            item.uz?.teacher &&
                            `O'qituvchi: ${item.uz.teacher}`}
                        </p>
                        <p className="text-[#04142C]/30 text-[11px] mt-0.5 font-medium">
                          {type === "courses" && item.uz?.time}
                          {type !== "courses" &&
                            (item.uz?.position ||
                              item.uz?.shortDescription ||
                              item.uz?.role ||
                              (type === "achievements" && "Sertifikat/Yutuq"))}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {type === "achievements" || type === "courses" ? (
                      <span
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${type === "courses" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}
                      >
                        {item.categoryKey || "Noma'lum"}
                      </span>
                    ) : (
                      <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[11px] font-bold uppercase tracking-wider">
                        Faol
                      </span>
                    )}
                  </td>
                  {type === "achievements" && (
                    <td className="px-8 py-5">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          item.type === "portrait"
                            ? "bg-purple-50 text-purple-600"
                            : item.type === "landscape"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-gray-50 text-gray-400"
                        }`}
                      >
                        {item.type === "portrait"
                          ? "Tik"
                          : item.type === "landscape"
                            ? "Yotiq"
                            : "Yo'q"}
                      </span>
                    </td>
                  )}
                  {type === "courses" && (
                    <td className="px-8 py-5">
                      <span className="text-[#04142C]/60 text-sm font-medium">
                        {item.uz?.room || "—"}
                      </span>
                    </td>
                  )}
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                        title="Tahrirlash"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm hover:shadow-md"
                        title="O'chirish"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing */}
      {(isAdding || editingItem) && (
        <EditorModal
          type={type}
          item={editingItem}
          onClose={() => {
            setIsAdding(false);
            setEditingItem(null);
          }}
          onSave={(newItem) => {
            if (editingItem) onUpdate(editingItem.id, newItem);
            else onAdd({ ...newItem, id: Date.now() });
            setIsAdding(false);
            setEditingItem(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <DeleteModal
          onClose={() => setItemToDelete(null)}
          onConfirm={() => {
            onDelete(itemToDelete.id);
            setItemToDelete(null);
          }}
        />
      )}
    </div>
  );
};

const EditorModal = ({ type, item, onClose, onSave }) => {
  const { achievementsCategories, coursesCategories } = useData();
  const [formData, setFormData] = useState(
    item || {
      image: "",
      media: [],
      date: new Date().toISOString().split("T")[0],
      views: 0,
      type:
        type === "achievements"
          ? "portrait"
          : type === "courses"
            ? "standard"
            : "",
      categoryKey:
        type === "achievements"
          ? achievementsCategories.filter((c) => c.key !== "all")[0]?.key || ""
          : type === "courses"
            ? coursesCategories.filter((c) => c.key !== "all")[0]?.key || ""
            : "",
      uz: {
        name: "",
        title: "",
        position: "",
        shortDescription: "",
        description: "",
        role: "",
        content: "",
        teacher: "",
        level: "",
        time: "",
        room: "",
      },
      ru: {
        name: "",
        title: "",
        position: "",
        shortDescription: "",
        description: "",
        role: "",
        content: "",
        teacher: "",
        level: "",
        time: "",
        room: "",
      },
      en: {
        name: "",
        title: "",
        position: "",
        shortDescription: "",
        description: "",
        role: "",
        content: "",
        teacher: "",
        level: "",
        time: "",
        room: "",
      },
    },
  );
  const [activeLang, setActiveLang] = useState("uz");
  const [mediaTab, setMediaTab] = useState("image");

  const handleChange = (lang, field, value) => {
    if (lang) {
      setFormData({
        ...formData,
        [lang]: { ...formData[lang], [field]: value },
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleMediaUpload = (e, mediaType = "image", isSingle = false) => {
    const file = e.target.files[0];
    if (file) {
      // Limit file size to 2MB to prevent localStorage quota issues
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(
          "Fayl hajmi juda katta (2MB dan oshmasligi kerak). Iltimos, kichikroq hajmdagi fayl tanlang yoki havola (URL) orqali qo'shing. Bu tizim barqaror ishlashi uchun zarur.",
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (isSingle) {
          handleChange(null, "image", base64String);
        } else if (type === "news") {
          const newMediaItem = { type: mediaType, url: base64String };
          handleChange(null, "media", [
            ...(formData.media || []),
            newMediaItem,
          ]);
        } else {
          handleChange(null, "image", base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addMediaUrl = (url, mediaType = "image") => {
    if (!url) return;
    if (type === "news") {
      const newMediaItem = { type: mediaType, url };
      handleChange(null, "media", [...(formData.media || []), newMediaItem]);
    } else {
      handleChange(null, "image", url);
    }
  };

  const removeMedia = (index) => {
    const newMedia = (formData.media || []).filter((_, i) => i !== index);
    handleChange(null, "media", newMedia);
  };

  const setAsMain = (url) => {
    handleChange(null, "image", url);
  };

  const currentPrimaryImage = formData.image || "";

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 md:p-12">
      <div
        className="absolute inset-0 bg-[#04142C]/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-4xl max-h-full rounded-[32px] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <div className="p-8 border-b border-[#04142C]/10 flex items-center justify-between bg-white relative z-10 shrink-0">
          <div>
            <h3 className="text-2xl font-montserrat font-bold text-[#04142C]">
              {item ? "Tahrirlash" : "Yangi qo'shish"}
            </h3>
            <p className="text-[#04142C]/40 font-medium text-sm mt-1 uppercase tracking-widest">
              {type} editor
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-[#04142C]/40"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
          {/* News Date Selection */}
          {type === "news" && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h4 className="text-sm font-bold text-[#04142C]/30 uppercase tracking-[4px] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#04142C]/10"></span>
                Sana va Vaqt
              </h4>
              <div className="flex flex-col gap-2 max-w-[300px]">
                <label className="text-sm font-bold text-[#04142C] ml-1 flex items-center gap-2">
                  <Calendar size={16} />
                  Yangilik sanasi
                </label>
                <input
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) => handleChange(null, "date", e.target.value)}
                  className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                />
              </div>
            </section>
          )}

          {/* Achievement Category Selection */}
          {type === "achievements" && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#04142C]/30 uppercase tracking-[4px] mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#04142C]/10"></span>
                    Kategoriya
                  </h4>
                  <label className="text-sm font-bold text-[#04142C] ml-1 flex items-center gap-2">
                    <Trophy size={16} />
                    Yutuq kategoriyasi
                  </label>
                  <select
                    value={formData.categoryKey || ""}
                    onChange={(e) =>
                      handleChange(null, "categoryKey", e.target.value)
                    }
                    className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium text-[#04142C] cursor-pointer"
                  >
                    <option value="">— Kategoriya tanlang —</option>
                    {(achievementsCategories || [])
                      .filter((c) => c.key !== "all")
                      .map((cat) => (
                        <option key={cat.key} value={cat.key}>
                          {cat.uz}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h4 className="text-sm font-bold text-[#04142C]/30 uppercase tracking-[4px] mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#04142C]/10"></span>
                    Ko'rinish turi
                  </h4>
                  <label className="text-sm font-bold text-[#04142C] ml-1 flex items-center gap-2">
                    <Image size={16} />
                    Sertifikat shakli
                  </label>
                  <div className="flex bg-[#04142C]/5 p-1 rounded-2xl">
                    <button
                      onClick={() => handleChange(null, "type", "portrait")}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${formData.type === "portrait" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40 hover:text-[#04142C]"}`}
                    >
                      Tik (Portrait)
                    </button>
                    <button
                      onClick={() => handleChange(null, "type", "landscape")}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${formData.type === "landscape" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40 hover:text-[#04142C]"}`}
                    >
                      Yotiq (Landscape)
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Courses Category Selection */}
          {type === "courses" && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-500">
              <h4 className="text-sm font-bold text-[#04142C]/30 uppercase tracking-[4px] mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#04142C]/10"></span>
                Kategoriya
              </h4>
              <div className="flex flex-col gap-2 max-w-[400px]">
                <label className="text-sm font-bold text-[#04142C] ml-1 flex items-center gap-2">
                  <GraduationCap size={16} />
                  To'garak kategoriyasi
                </label>
                <select
                  value={formData.categoryKey || ""}
                  onChange={(e) =>
                    handleChange(null, "categoryKey", e.target.value)
                  }
                  className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium text-[#04142C] cursor-pointer"
                >
                  <option value="">— Kategoriya tanlang —</option>
                  {(coursesCategories || [])
                    .filter((c) => c.key !== "all")
                    .map((cat) => (
                      <option key={cat.key} value={cat.key}>
                        {cat.uz}
                      </option>
                    ))}
                </select>
              </div>
            </section>
          )}

          {/* Basic Info & Image/Video Upload */}
          <section>
            <h4 className="text-sm font-bold text-[#04142C]/30 uppercase tracking-[4px] mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#04142C]/10"></span>
              Media Galereya {type === "news" && "(Rasm va Video)"}
            </h4>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-56 aspect-[3/4] md:aspect-square bg-gray-50 rounded-[28px] border-2 border-dashed border-[#04142C]/10 flex flex-col items-center justify-center overflow-hidden group hover:border-[#04142C]/30 transition-all relative">
                  {currentPrimaryImage ? (
                    <>
                      <img
                        src={currentPrimaryImage}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-xs font-bold uppercase tracking-widest">
                          Asosiy rasm
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-12 h-12 bg-[#04142C]/5 rounded-full flex items-center justify-center mx-auto mb-4 text-[#04142C]/30">
                        <Upload size={24} />
                      </div>
                      <p className="text-[#04142C]/40 text-[11px] font-bold uppercase tracking-wider">
                        Rasm yuklang
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleMediaUpload(e, "image", true)}
                  />
                </div>

                <div className="flex-1 space-y-6 w-full">
                  {type === "news" && (
                    <div className="flex bg-[#04142C]/5 p-1 rounded-xl w-fit mb-4">
                      <button
                        onClick={() => setMediaTab("image")}
                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${mediaTab === "image" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40"}`}
                      >
                        <Image size={14} /> Rasm
                      </button>
                      <button
                        onClick={() => setMediaTab("video")}
                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${mediaTab === "video" ? "bg-white text-[#04142C] shadow-sm" : "text-[#04142C]/40"}`}
                      >
                        <Video size={14} /> Video
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 p-5 bg-[#04142C]/5 rounded-2xl border border-[#04142C]/10 border-dashed">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#04142C] ml-1 flex items-center gap-2">
                        <Plus size={14} /> Havola (URL) orqali qo'shish
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1 group">
                          {mediaTab === "image" ? (
                            <Image
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#04142C]/20 group-focus-within:text-[#04142C] transition-colors"
                              size={20}
                            />
                          ) : (
                            <Video
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#04142C]/20 group-focus-within:text-[#04142C] transition-colors"
                              size={20}
                            />
                          )}
                          <input
                            type="text"
                            id="media-url-input"
                            className="w-full bg-white border border-[#04142C]/10 focus:border-[#04142C]/20 px-12 py-3 mr-4 rounded-xl outline-none transition-all font-medium font-mono text-xs"
                            placeholder={
                              mediaTab === "video"
                                ? "YouTube/Vimeo havolasi..."
                                : "Rasm havolasi..."
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                addMediaUrl(e.target.value, mediaTab);
                                e.target.value = "";
                              }
                            }}
                          />
                        </div>
                        <button
                          onClick={() => {
                            const input =
                              document.getElementById("media-url-input");
                            addMediaUrl(input.value, mediaTab);
                            input.value = "";
                          }}
                          className="bg-[#04142C] text-white px-6 rounded-xl font-bold text-xs hover:bg-[#04142C]/90 transition-all shadow-md shrink-0"
                        >
                          Havolani qo'shish
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 py-4 px-2 border-t border-[#04142C]/10">
                      <div className="relative">
                        <button className="bg-white border border-[#04142C]/20 text-[#04142C] px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#04142C] hover:text-white transition-all flex items-center gap-2 shadow-sm">
                          {mediaTab === "video" ? (
                            <Video size={14} />
                          ) : (
                            <Image size={14} />
                          )}
                          Faylni tanlash{" "}
                          {mediaTab === "video" ? "(Video)" : "(Rasm)"}
                          <input
                            type="file"
                            accept={
                              mediaTab === "video" ? "video/*" : "image/*"
                            }
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => handleMediaUpload(e, mediaTab)}
                          />
                        </button>
                      </div>
                      <p className="text-[#04142C]/40 text-[10px] leading-relaxed max-w-[200px]">
                        Kompyuteringizdan{" "}
                        {mediaTab === "video" ? "video" : "rasm"} faylini
                        yuklash uchun bosing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media List / Gallery */}
              {type === "news" && (formData.media || []).length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {formData.media.map((med, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-square rounded-2xl border border-[#04142C]/5 overflow-hidden group"
                    >
                      {med.type === "video" ? (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-[#04142C]/20">
                          <Play size={32} />
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            VIDEO
                          </div>
                        </div>
                      ) : (
                        <img
                          src={med.url}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      )}

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {med.type === "image" && (
                          <button
                            onClick={() => setAsMain(med.url)}
                            className="bg-white text-[#04142C] text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-[#04142C] hover:text-white transition-all"
                          >
                            ASOSIY QILISH
                          </button>
                        )}
                        <button
                          onClick={() => removeMedia(idx)}
                          className="bg-red-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-red-600 transition-all"
                        >
                          O'CHIRISH
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Language Tabs & Content */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-[#04142C]/10 pb-4">
              <h4 className="text-sm font-bold text-[#04142C]/30 uppercase tracking-[4px] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#04142C]/10"></span>
                Ma'lumotlar
              </h4>
              <div className="flex bg-[#04142C]/5 p-1 rounded-xl">
                {[
                  { id: "uz", name: "UZ" },
                  { id: "ru", name: "RU" },
                  { id: "en", name: "EN" },
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setActiveLang(lang.id)}
                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                      activeLang === lang.id
                        ? "bg-white text-[#04142C] shadow-sm"
                        : "text-[#04142C]/40 hover:text-[#04142C]"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(type === "team" || type === "feedbacks") && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#04142C] ml-1">
                        Ism sharifi
                      </label>
                      <input
                        type="text"
                        value={formData[activeLang]?.name || ""}
                        onChange={(e) =>
                          handleChange(activeLang, "name", e.target.value)
                        }
                        className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                        placeholder="Anvar Karimov"
                      />
                    </div>
                  )}
                  {(type === "news" ||
                    type === "achievements" ||
                    type === "courses") && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#04142C] ml-1">
                        Sarlavha
                      </label>
                      <input
                        type="text"
                        value={formData[activeLang]?.title || ""}
                        onChange={(e) =>
                          handleChange(activeLang, "title", e.target.value)
                        }
                        className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                        placeholder="Sarlavhani kiriting..."
                      />
                    </div>
                  )}
                  {type === "team" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#04142C] ml-1">
                        Lavozimi
                      </label>
                      <input
                        type="text"
                        value={formData[activeLang]?.position || ""}
                        onChange={(e) =>
                          handleChange(activeLang, "position", e.target.value)
                        }
                        className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                        placeholder="Informatika o'qituvchisi"
                      />
                    </div>
                  )}
                  {type === "feedbacks" && (
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-[#04142C] ml-1">
                        Lavozimi / Sinf
                      </label>
                      <input
                        type="text"
                        value={formData[activeLang]?.role || ""}
                        onChange={(e) =>
                          handleChange(activeLang, "role", e.target.value)
                        }
                        className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                        placeholder="11-sinf o'quvchisi"
                      />
                    </div>
                  )}
                  {type === "courses" && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#04142C] ml-1">
                          Ustoz ism-sharifi
                        </label>
                        <input
                          type="text"
                          value={formData[activeLang]?.teacher || ""}
                          onChange={(e) =>
                            handleChange(activeLang, "teacher", e.target.value)
                          }
                          className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                          placeholder="Anvar Karimov"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#04142C] ml-1">
                          Kurs darajasi
                        </label>
                        <input
                          type="text"
                          value={formData[activeLang]?.level || ""}
                          onChange={(e) =>
                            handleChange(activeLang, "level", e.target.value)
                          }
                          className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                          placeholder="Boshlang'ich / Murakkab"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#04142C] ml-1">
                          Dars kunlari va vaqti
                        </label>
                        <input
                          type="text"
                          value={formData[activeLang]?.time || ""}
                          onChange={(e) =>
                            handleChange(activeLang, "time", e.target.value)
                          }
                          className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                          placeholder="Dush-Chor-Jum | 15:00-17:00"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#04142C] ml-1">
                          Xona
                        </label>
                        <input
                          type="text"
                          value={formData[activeLang]?.room || ""}
                          onChange={(e) =>
                            handleChange(activeLang, "room", e.target.value)
                          }
                          className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                          placeholder="204-xona"
                        />
                      </div>
                    </>
                  )}
                </div>

                {type === "news" && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#04142C] ml-1">
                      Qisqa tavsif
                    </label>
                    <textarea
                      value={formData[activeLang]?.shortDescription || ""}
                      onChange={(e) =>
                        handleChange(
                          activeLang,
                          "shortDescription",
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium min-h-[120px] resize-none leading-relaxed"
                      placeholder="Qisqa ma'lumot..."
                    />
                  </div>
                )}

                {(type === "news" ||
                  type === "feedbacks" ||
                  type === "courses") && (
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-[#04142C] ml-1">
                      To'liq matn
                    </label>
                    <textarea
                      value={
                        formData[activeLang]?.content ||
                        formData[activeLang]?.description ||
                        ""
                      }
                      onChange={(e) =>
                        handleChange(
                          activeLang,
                          type === "feedbacks" ? "content" : "description",
                          e.target.value,
                        )
                      }
                      className="w-full bg-[#04142C]/5 border border-transparent focus:border-[#04142C]/20 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium min-h-[220px] resize-none leading-relaxed"
                      placeholder="Batafsil matnni kiriting..."
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="p-8 border-t border-[#04142C]/10 flex items-center justify-end gap-4 bg-gray-50/50 grow-0">
          <button
            onClick={onClose}
            className="px-8 py-3.5 rounded-full font-bold text-[#04142C]/60 hover:text-[#04142C] hover:bg-white transition-all border border-transparent hover:border-[#04142C]/10"
          >
            Bekor qilish
          </button>
          <button
            onClick={() => onSave(formData)}
            className="bg-[#04142C] text-white px-10 py-3.5 rounded-full font-bold flex items-center gap-2 hover:bg-[#04142C]/90 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Save size={20} />
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
};

const SettingsManager = () => {
  const { settings, updateSettings } = useData();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showBotToken, setShowBotToken] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (key, value) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    updateSettings(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-montserrat font-bold text-[#04142C] mb-8">
        Tizim sozlamalari
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-5">
        {/* Telegram Bot Settings */}
        <section className="bg-white rounded-[32px] p-8 border border-[#04142C]/5 shadow-md">
          <h3 className="text-xl font-montserrat font-bold text-[#04142C] mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            Telegram Bot Sozlamalari
          </h3>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#04142C] ml-1">
                Bot Token
              </label>
              <div className="relative">
                <input
                  type={showBotToken ? "text" : "password"}
                  value={localSettings.botToken}
                  onChange={(e) => handleChange("botToken", e.target.value)}
                  className="w-full bg-[#04142C]/5 border border-transparent focus:border-blue-200 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-mono text-sm pr-14"
                  placeholder="8632538695:AAGr..."
                />
                <button
                  onClick={() => setShowBotToken(!showBotToken)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#04142C]/30 hover:text-[#04142C] transition-colors"
                >
                  {showBotToken ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-[10px] text-gray-400 ml-1">
                @BotFather orqali olingan bot tokenini kiriting
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#04142C] ml-1">
                Chat ID lar (vergul bilan ajrating)
              </label>
              <input
                type="text"
                value={localSettings.chatId}
                onChange={(e) => handleChange("chatId", e.target.value)}
                className="w-full bg-[#04142C]/5 border border-transparent focus:border-blue-200 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-mono"
                placeholder="5046205739, -1001234567"
              />
              <p className="text-[10px] text-gray-400 ml-1">
                Xabarlar yuborilishi kerak bo'lgan ID lar. Bir nechta bo'lsa
                vergul bilan yozing (masalan: 123, 456).
              </p>
            </div>
          </div>
        </section>

        {/* Security Settings */}
        <section className="bg-white rounded-[32px] p-8 border border-[#04142C]/5 shadow-md">
          <h3 className="text-xl font-montserrat font-bold text-[#04142C] mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            Admin Panel Xavfsizligi
          </h3>
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#04142C] ml-1">
                Admin Logini
              </label>
              <input
                type="text"
                value={localSettings.adminLogin}
                onChange={(e) => handleChange("adminLogin", e.target.value)}
                className="w-full bg-[#04142C]/5 border border-transparent focus:border-red-200 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium"
                placeholder="admin"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[#04142C] ml-1">
                Admin Paroli
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? "text" : "password"}
                  value={localSettings.adminPassword}
                  onChange={(e) =>
                    handleChange("adminPassword", e.target.value)
                  }
                  className="w-full bg-[#04142C]/5 border border-transparent focus:border-red-200 focus:bg-white px-6 py-4 rounded-2xl outline-none transition-all font-medium pr-14"
                  placeholder="********"
                />
                <button
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#04142C]/30 hover:text-[#04142C] transition-colors"
                >
                  {showAdminPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-[10px] text-red-400 ml-1 font-bold">
                DIQQAT! Parolni o'zgartirgandan so'ng, yangi parol bilan qayta
                tizimga kiring.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-end mt-10">
        <button
          onClick={handleSave}
          className={`
            flex items-center gap-3 px-10 py-4 rounded-2xl font-bold transition-all shadow-xl
            ${isSaved ? "bg-green-500 text-white shadow-green-500/20" : "bg-[#04142C] text-white hover:bg-[#04142C]/90 hover:scale-[1.02] active:scale-[0.98] shadow-[#04142C]/20"}
          `}
        >
          {isSaved ? (
            <>Saqlandi!</>
          ) : (
            <>
              <Save size={20} />
              Sozlamalarni saqlash
            </>
          )}
        </button>
      </div>

      <div className="mt-10 bg-blue-50/50 border border-blue-100 p-8 rounded-[32px] flex items-start gap-4">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <LayoutDashboard size={20} />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 mb-1">Ma'lumot!</h4>
          <p className="text-blue-700/80 text-sm leading-relaxed">
            Bu yerda o'zgartirilgan sozlamalar darhol saqlanadi va saytning
            ishlashiga ta'sir qiladi. Telegram botingiz ishlamay qolsa, Token va
            Chat ID maydonlarini qayta tekshiring.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin_main;
