import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/first_level.css";


const FirstLevel = () => {
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

  const goToModule_1_first = () => {
    navigate("/module_1_first"); 
  };

  const goToModule_1_second = () => {
    navigate("/module_1_second"); 
  };

  const goToModule_1_third = () => {
    navigate("/module_1_third"); 
  };
  const goToModule_1_fourth = () => {
    navigate("/module_1_fourth"); 
  };

  return (
    <div>
      <nav className="container">
      <img src="./images/logo1.png" alt="" className="logo" onClick={() => navigate("/")}/>
        <ul>
          <li>{translations[language].navHowItWorks}</li>
          <li>{translations[language].navPhone}</li>
          <li>{translations[language].navStartLearning}</li>
        </ul>
        <select className="change-lang" onChange={handleLanguageChange}>
          <option value="ua">UA</option>
          <option value="en">EN</option>
        </select>
      </nav>

      <main className="container main">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2>Module 1</h2>
        <p className="paragraph_module1">
          Read the text and answer the questions.
        </p>
        <div className="all_block">
          <div className="left-side_block">
            <div className="module_block">
              <div className="first_block">
                <div className="block_number">1</div>
                <p onClick={goToModule_1_first}>Lost hat</p>
              </div>
            </div>
            <div className="module_block">
              <div className="first_block">
                <div className="block_number">2</div>
                <p onClick={goToModule_1_second}>Bella comes to the rescue</p>
              </div>
            </div>
            <div className="module_block">
              <div className="first_block">
                <div className="block_number">3</div>
                <p onClick={goToModule_1_third}>Spoiled picnic</p>
              </div>
            </div>
            <div className="module_block">
              <div className="first_block">
                <div className="block_number">4</div>
                <p onClick={goToModule_1_fourth}>Joy in the rain</p>
              </div>
            </div>
            <div className="module_block module_block_last">
              <div className="first_block">
                <div className="block_number">5</div>
                <p>A good word for Bella</p>
              </div>
            </div>
          </div>
          <img src="./images/total_points.png" className="points"/>
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

export default FirstLevel;
