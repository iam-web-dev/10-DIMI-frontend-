import React from "react";
import Welcome_main from "./Sections/Welcome/welcome_main";
import About_main from "./Sections/About/about_main";
import President_main from "../../Components/President/president_main";
import Team_main from "./Sections/Team/team_main";
import Feedbacks_main from "./Sections/Feedbacks/feedbacks_main";
import News_main from "./Sections/News/news_main";
import Achievements_main from "./Sections/Achievements/achievements_main";
import Form_main from "./Sections/Form/form_main";
import Sponsors_main from "./Sections/Sponsors/sponsors_main";

const Home_main = () => {
  return (
    <main>
      <section id="welcome">
        <Welcome_main />
      </section>
      <section id="about">
        <About_main />
      </section>
      <section id="president">
        <President_main />
      </section>
      <section id="team">
        <Team_main />
      </section>
      <section id="feedbacks">
        <Feedbacks_main />
      </section>
      <section id="news">
        <News_main />
      </section>
      <section id="achievements">
        <Achievements_main />
      </section>
      <section id="form">
        <Form_main />
      </section>
      <section id="sponsors">
        <Sponsors_main />
      </section>
    </main>
  );
};

export default Home_main;
