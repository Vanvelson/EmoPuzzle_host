import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/login.css";

const Login = () => {
  const translations = {
    ua: {
      navHowItWorks: "Як це працює?",
      navPhone: "Мобільний застосунок",
      navStartLearning: "Почати навчання",
      howItWorks: "Як це працює?",
      howItWorksText:
        "Наша система допомагає дітям із аутизмом, синдромом Дауна та іншими особливостями розвитку навчитися розпізнавати та виражати емоції у відповідних ситуаціях. Ми використовуємо три інтерактивні модулі навчання:",
      mobileApp: "Мобільний додаток",
      startLearning: "Почати навчання",
      helpingChildren: "Допомагаємо дітям відчувати світ серцем",
      readingWithVisualization: "Читання з візуалізацією",
      readingDescription:
        "дитина читає текст по абзацах, а система генерує зображення до кожного фрагмента. Після прочитання проходить тест на визначення емоцій, представлених у тексті.",
      expressingEmotions: "Вираження емоцій",
      expressingDescription:
        "дитина отримує ситуацію для аналізу та повинна зобразити відповідну емоцію за допомогою камери (наприклад, посміхнутися, висловити здивування чи смуток).",
      decisionMaking: "Прийняття рішень",
      decisionDescription:
        "після прочитання історії дитина обирає, як би вона вчинила в цій ситуації. Це допомагає зрозуміти, як правильно реагувати у повсякденному житті.",
      resultText:
        "У результаті дитина навчається розпізнавати емоції, реагувати на них та взаємодіяти з оточенням впевнено та природно.",
      mobileTitle: "Мобільний застосунок",
      mobileDescription:
        "Навчайтеся зручно будь-де! Наша система доступна як у веб-версії на сайті, так і в мобільному застосунку для смартфонів та планшетів.",
      footerText1: "© 2025 EmoPuzzle. Усі права захищено.",
      footerText2: "Допомагаємо дітям відчувати світ серцем.",
      contactUs:
        "Зв'яжіться з нами: [email@example.com] | [Телефон: +380 ХХХ ХХХ ХХХХ]",
    },
    en: {
      navHowItWorks: "How does it work?",
      navPhone: "Mobile application",
      navStartLearning: "Start learning",
      howItWorks: "How does it work?",
      howItWorksText:
        "Our system helps children with autism, Down syndrome, and other special needs learn to recognize and express emotions in appropriate situations. We use three interactive learning modules:",
      mobileApp: "Mobile application",
      startLearning: "Start learning",
      helpingChildren: "Helping children feel the world with their hearts",
      readingWithVisualization: "Reading with visualization",
      readingDescription:
        "The child reads the text paragraph by paragraph, and the system generates images for each fragment. After reading, the child takes a test to identify the emotions presented in the text.",
      expressingEmotions: "Expressing emotions",
      expressingDescription:
        "The child is given a situation to analyze and has to depict the appropriate emotion using the camera (for example, smile, express surprise or sadness).",
      decisionMaking: "Decision-making",
      decisionDescription:
        "After reading the story, the child chooses what he or she would do in this situation. This helps to understand how to react in everyday life.",
      resultText:
        "As a result, the child learns to recognize emotions, respond to them, and interact with the environment confidently and naturally.",
      mobileTitle: "Mobile application",
      mobileDescription:
        "Study conveniently from anywhere! Our system is available both in a web version on the website and in a mobile application for smartphones and tablets.",
      footerText1: "© 2025 EmoPuzzle. All rights reserved.",
      footerText2: "We help children feel the world with their hearts.",
      contactUs:
        "Contact us: [email@example.com] | [Phone: +380 XXX XXX XXX XXX]",
    },
  };
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const goToFirstLevel = () => {
    navigate("/module_1_first");
  };
  const goToSecondLevel = () => {
    navigate("/camera");
  };
  const goToHome = () => {
    navigate("/");
  }


  return (
    <div className="login">
      <header></header>

      <main className="container">
        <button className="back-button" onClick={goToHome}>
          ←
        </button>
        <h2>Learning modules</h2>
        <div className="level_block">
          <div className="item_block lvl_block1" onClick={goToFirstLevel}>
            <h3>Reading with visualization</h3>
            <img src="./images/level1_block.png"></img>
          </div>

          <div className="item_block lvl_block2" onClick={goToSecondLevel}>
            <h3>Expression of emotions</h3>
            <img src="./images/level2_block.png"></img>
          </div>
        </div>
      </main>

      <footer className="container footer">
        <div className="footer_text">
          <p>{translations[language].footerText1}</p>
          <p>{translations[language].footerText2}</p>
          <p>{translations[language].contactUs}</p>
        </div>
        <p className="background_text">EmoPuzzle</p>
      </footer>
    </div>
  );
};

export default Login;
