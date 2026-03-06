import { Route, Routes, useLocation } from "react-router";
import Home_main from "./Pages/Home/home_main";
import Courses_main from "./Pages/Courses/courses_main";
import News_page from "./Pages/News/news_main";
import NewsDetail from "./Pages/News/NewsDetail";
import Achievements_page from "./Pages/Achievements/achievements_page";
import Navbar_main from "./Components/Navbar/navbar_main";
import Footer_main from "./Components/Footer/footer_main";
import ScrollToTop from "./Components/ScrollToTop";
import { LanguageProvider } from "./Context/LanguageContext";
import { DataProvider } from "./Context/DataContext";
function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Navbar_main />
      <div className="pt-[75px]">
        <Routes>
          <Route path="/" element={<Home_main />} />
          <Route path="/courses" element={<Courses_main />} />
          <Route path="/news" element={<News_page />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/achievements" element={<Achievements_page />} />
        </Routes>
      </div>
      <Footer_main />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </LanguageProvider>
  );
}

export default App;
