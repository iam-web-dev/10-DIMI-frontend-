import React, { createContext, useContext, useState, useEffect } from "react";
import { newsData as initialNews } from "../Data/newsData";
import {
  achievementsData as initialAchievements,
  achievementsCategories as initialAchievementsCategories,
} from "../Data/achievementsData";
import { teamData as initialTeam } from "../Data/teamData";
import {
  coursesData as initialCourses,
  coursesCategories as initialCoursesCategories,
} from "../Data/coursesData";
import { feedbacksData as initialFeedbacks } from "../Data/feedbacksData";

const initialSettings = {
  botToken: "8632538695:AAGrBNDrqUPxpu5N7pzKK8Zpemd0M8kYlS4",
  chatId: "5046205739",
  phoneNumber: "+998 (90) 123 45 67",
  telegramLink: "https://t.me/10dimi",
  instagramLink: "https://instagram.com/10dimi",
  youtubeLink: "https://youtube.com/10dimi",
};

const DataContext = createContext();
const API_URL = "https://api.10-dimi.uz/api";

export const DataProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [achievementsCategories, setAchievementsCategories] = useState([]);
  const [team, setTeam] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesCategories, setCoursesCategories] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [settings, setSettings] = useState(initialSettings);

  const fetchData = async () => {
    try {
      const [
        newsRes,
        achRes,
        achCatRes,
        teamRes,
        coursesRes,
        coursesCatRes,
        feedbacksRes,
        settingsRes,
      ] = await Promise.all([
        fetch(`${API_URL}/news/`).then((r) => r.json()),
        fetch(`${API_URL}/achievements/`).then((r) => r.json()),
        fetch(`${API_URL}/achievements-categories/`).then((r) => r.json()),
        fetch(`${API_URL}/team/`).then((r) => r.json()),
        fetch(`${API_URL}/courses/`).then((r) => r.json()),
        fetch(`${API_URL}/courses-categories/`).then((r) => r.json()),
        fetch(`${API_URL}/feedbacks/`).then((r) => r.json()),
        fetch(`${API_URL}/settings/`).then((r) => r.json()),
      ]);

      setNews(newsRes);
      setAchievements(achRes);
      setAchievementsCategories(achCatRes);
      setTeam(teamRes);
      setCourses(coursesRes);
      setCoursesCategories(coursesCatRes);
      setFeedbacks(feedbacksRes);
      if (settingsRes.length > 0) setSettings(settingsRes[0]);
    } catch (error) {
      console.error("Backend ulanishda xatolik:", error);
      // Fallback to localStorage if API fails
      const loadLocal = (key, initial) => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initial;
      };
      setNews(loadLocal("dimi_news", initialNews));
      setAchievements(loadLocal("dimi_achievements", initialAchievements));
      setAchievementsCategories(
        loadLocal(
          "dimi_achievements_categories",
          initialAchievementsCategories,
        ),
      );
      setTeam(loadLocal("dimi_team", initialTeam));
      setCourses(loadLocal("dimi_courses", initialCourses));
      setCoursesCategories(
        loadLocal("dimi_courses_categories", initialCoursesCategories),
      );
      setFeedbacks(loadLocal("dimi_feedbacks", initialFeedbacks));
      setSettings(loadLocal("dimi_settings", initialSettings));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        alert(
          "LocalStorage xotirasi to'lib qoldi! Ma'lumotlarni saqlash uchun juda katta hajmdagi rasm yoki videolardan foydalanmang. Iltimos, ba'zi eski fayllarni o'chiring yoki havola (URL) orqali qo'shing.",
        );
      }
      console.error("Storage error:", e);
    }
  };

  useEffect(() => saveToLocalStorage("dimi_news", news), [news]);
  useEffect(
    () => saveToLocalStorage("dimi_achievements", achievements),
    [achievements],
  );
  useEffect(
    () =>
      saveToLocalStorage(
        "dimi_achievements_categories",
        achievementsCategories,
      ),
    [achievementsCategories],
  );
  useEffect(() => saveToLocalStorage("dimi_team", team), [team]);
  useEffect(() => saveToLocalStorage("dimi_courses", courses), [courses]);
  useEffect(
    () => saveToLocalStorage("dimi_courses_categories", coursesCategories),
    [coursesCategories],
  );
  useEffect(() => saveToLocalStorage("dimi_feedbacks", feedbacks), [feedbacks]);
  useEffect(() => saveToLocalStorage("dimi_settings", settings), [settings]);

  // API Helper
  const apiCall = async (endpoint, method = "GET", body = null) => {
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (body) options.body = JSON.stringify(body);
      const res = await fetch(
        `${API_URL}/${endpoint}${method === "GET" ? "/" : ""}`,
        options,
      );
      if (!res.ok) return null;
      return method === "DELETE" ? true : await res.json();
    } catch (e) {
      return null;
    }
  };

  // NEWS CRUD
  const addNews = async (item) => {
    const res = await apiCall("news/", "POST", item);
    if (res) setNews([res, ...news]);
    else setNews([item, ...news]); // Fallback
  };
  const updateNews = async (id, updatedItem) => {
    await apiCall(`news/${id}/`, "PUT", updatedItem);
    setNews(news.map((n) => (n.id === id ? updatedItem : n)));
  };
  const deleteNews = async (id) => {
    await apiCall(`news/${id}/`, "DELETE");
    setNews(news.filter((n) => n.id !== id));
  };

  // TEAM CRUD
  const addTeamMember = async (item) => {
    const res = await apiCall("team/", "POST", item);
    if (res) setTeam([res, ...team]);
    else setTeam([item, ...team]);
  };
  const updateTeamMember = async (id, updatedItem) => {
    await apiCall(`team/${id}/`, "PUT", updatedItem);
    setTeam(team.map((t) => (t.id === id ? updatedItem : t)));
  };
  const deleteTeamMember = async (id) => {
    await apiCall(`team/${id}/`, "DELETE");
    setTeam(team.filter((t) => t.id !== id));
  };

  // FEEDBACKS CRUD
  const addFeedback = async (item) => {
    const res = await apiCall("feedbacks/", "POST", item);
    if (res) setFeedbacks([res, ...feedbacks]);
    else setFeedbacks([item, ...feedbacks]);
  };
  const updateFeedback = async (id, updatedItem) => {
    await apiCall(`feedbacks/${id}/`, "PUT", updatedItem);
    setFeedbacks(feedbacks.map((f) => (f.id === id ? updatedItem : f)));
  };
  const deleteFeedback = async (id) => {
    await apiCall(`feedbacks/${id}/`, "DELETE");
    setFeedbacks(feedbacks.filter((f) => f.id !== id));
  };

  const incrementNewsViews = (id) => {
    // Optimistic local update
    setNews((prev) =>
      prev.map((n) => (n.id === id ? { ...n, views: (n.views || 0) + 1 } : n)),
    );
    // Silent API call
    apiCall(`news/${id}/`, "PATCH", {
      views: (news.find((n) => n.id === id)?.views || 0) + 1,
    });
  };

  // ACHIEVEMENTS CRUD
  const addAchievement = async (item) => {
    const res = await apiCall("achievements/", "POST", item);
    if (res) setAchievements([res, ...achievements]);
  };
  const updateAchievement = async (id, updatedItem) => {
    await apiCall(`achievements/${id}/`, "PUT", updatedItem);
    setAchievements(achievements.map((a) => (a.id === id ? updatedItem : a)));
  };
  const deleteAchievement = async (id) => {
    await apiCall(`achievements/${id}/`, "DELETE");
    setAchievements(achievements.filter((a) => a.id !== id));
  };

  // ACHIEVEMENTS CATEGORIES CRUD
  const addAchievementsCategory = async (item) => {
    const res = await apiCall("achievements-categories/", "POST", item);
    if (res) setAchievementsCategories([...achievementsCategories, res]);
  };
  const updateAchievementsCategory = async (id, updatedItem) => {
    await apiCall(`achievements-categories/${id}/`, "PUT", updatedItem);
    setAchievementsCategories(
      achievementsCategories.map((c) => (c.id === id ? updatedItem : c)),
    );
  };
  const deleteAchievementsCategory = async (id) => {
    await apiCall(`achievements-categories/${id}/`, "DELETE");
    setAchievementsCategories(
      achievementsCategories.filter((c) => c.id !== id),
    );
  };

  // COURSES CRUD
  const addCourse = async (item) => {
    const res = await apiCall("courses/", "POST", item);
    if (res) setCourses([res, ...courses]);
  };
  const updateCourse = async (id, updatedItem) => {
    await apiCall(`courses/${id}/`, "PUT", updatedItem);
    setCourses(courses.map((c) => (c.id === id ? updatedItem : c)));
  };
  const deleteCourse = async (id) => {
    await apiCall(`courses/${id}/`, "DELETE");
    setCourses(courses.filter((c) => c.id !== id));
  };

  // COURSES CATEGORIES CRUD
  const addCoursesCategory = async (item) => {
    const res = await apiCall("courses-categories/", "POST", item);
    if (res) setCoursesCategories([...coursesCategories, res]);
  };
  const updateCoursesCategory = async (id, updatedItem) => {
    await apiCall(`courses-categories/${id}/`, "PUT", updatedItem);
    setCoursesCategories(
      coursesCategories.map((c) => (c.id === id ? updatedItem : c)),
    );
  };
  const deleteCoursesCategory = async (id) => {
    await apiCall(`courses-categories/${id}/`, "DELETE");
    setCoursesCategories(coursesCategories.filter((c) => c.id !== id));
  };

  // SETTINGS CRUD
  const updateSettings = async (newSettings) => {
    const res = await apiCall(
      `settings/${newSettings.id || 1}/`,
      "PUT",
      newSettings,
    );
    if (res) setSettings(res);
  };

  const sendContactRequest = async (data) => {
    return await apiCall("contact/", "POST", data);
  };

  return (
    <DataContext.Provider
      value={{
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
        coursesCategories,
        addCoursesCategory,
        updateCoursesCategory,
        deleteCoursesCategory,
        feedbacks,
        addFeedback,
        updateFeedback,
        deleteFeedback,
        incrementNewsViews,
        settings,
        updateSettings,
        sendContactRequest,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
