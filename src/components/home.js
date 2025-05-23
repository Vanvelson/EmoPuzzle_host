import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

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

const Home = () => {
  const [language, setLanguage] = useState("en");
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const openFirstModal = () => setIsFirstModalOpen(true);
  const closeFirstModal = () => setIsFirstModalOpen(false);

  const openSecondModal = () => setIsSecondModalOpen(true);
  const closeSecondModal = () => setIsSecondModalOpen(false);

  const openThirdModal = () => setIsThirdModalOpen(true);
  const closeThirdModal = () => setIsThirdModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleRegisterClick = () => {
    closeFirstModal();
    openSecondModal();
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    closeSecondModal();
    openThirdModal();
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLoginClickPage = () => {
    closeFirstModal();
    openLoginModal();
  };


  return (
    <div className="home">
      <header className="header container" id="header_puzzle">
        <nav>
          <img src="./images/logo1.png" alt="" className="logo" onClick={() => navigate("/")}/>
          <ul>
            <li><a href="#works">{translations[language].navHowItWorks}</a></li>
            <li><a href="#mobile">{translations[language].navPhone}</a></li>
            <li><a href="#header_puzzle">{translations[language].navStartLearning}</a></li>
          </ul>
          <select className="change-lang" onChange={handleLanguageChange}>
            <option value="ua" className="ua_flag">UA</option>
            <option value="en">EN</option>
          </select>
          <img src="./images/user (2).png" onClick={openFirstModal}></img>
        </nav>
        <div className="header-explore">
          <div className="explore-left">
            <h1>
              <span className="emo">Emo</span>
              <span className="puzzle">Puzzle</span>
            </h1>
            <p>{translations[language].helpingChildren}</p>
            <button onClick={openFirstModal}>
              <p className="button_text">
                {translations[language].startLearning}
              </p>
            </button>
          </div>
          <img src="./images/header.png" alt="" />
        </div>
      </header>
      <main className="container">
        {/* Перше модальне вікно */}
        {isFirstModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="bg"></div>
              <div className="inmodal">
                <img src="./images/logo1.png" alt="Logo" />
                <h2>Welcome to EmoPuzzle</h2>
                <button className="modal_btn_1" onClick={handleRegisterClick}>
                  Register
                </button>
                <button className="modal_btn_2" onClick={handleLoginClickPage}>
                  Log in
                </button>
                <button onClick={closeFirstModal} className="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Модальне вікно входу */}
        {isLoginModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="bg"></div>
              <div className="inmodal">
                <h2>Login</h2>
                <div className="mb-3">
                  <h3>E-mail</h3>
                  <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <h3>Password</h3>
                  <input type="password" className="form-control" />
                </div>
                <div className="checkbox_block">
                  <input type="checkbox" className="checkbox"></input>
                  <p>Privacy Policy</p>
                </div>
                <button className="btn btn-primary" onClick={handleLoginClick}>
                  Sign in
                </button>
                <button onClick={closeLoginModal} className="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Друге модальне вікно */}
        {isSecondModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="bg"></div>
              <div className="inmodal">
                <form id="registerForm">
                  <div class="modal-body">
                    <div class="mb-3">
                      <h3>Enter your work email address</h3>
                      <p className="paragraph_modal">You will need to confirm this email later</p>
                      <input
                        type="email"
                        class="form-control"
                        id="InputEmail"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div class="mb-3">
                      <h3>Create a password</h3>
                      <p>At least 8 characters</p>
                      <input
                        type="password"
                        class="form-control"
                        id="InputPassword1"
                      />
                    </div>
                    <div className="mb-3">
                      <h3>Repeat the password</h3>
                      <input
                        type="password"
                        className="form-control"
                        id="InputPassword1"
                      />
                    </div>
                    <div className="checkbox_block">
                      <input type="checkbox" className="checkbox"></input>
                      <p>Privacy Policy</p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={handleNextClick}
                    >
                      Далі
                    </button>
                  </div>
                </form>
                <button onClick={closeSecondModal} className="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Третє модальне вікно */}
        {isThirdModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div className="bg"></div>
              <div className="inmodal">
                <img src="./images/user_reg.png" />
                <div className="mb-3-3">
                  <h3>Create a password</h3>
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword1"
                  />
                  <p>This will be displayed on your profile</p>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary" onClick={handleLoginClick}

                >
                  Next
                </button>
                <button onClick={closeThirdModal} className="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="works container" id="works">
          <div className="works_title">
            <h2>{translations[language].howItWorks}</h2>
            <p>{translations[language].howItWorksText}</p>
          </div>
          <div className="works_block">
            <button className="circle_number">1</button>
            <p>
              <span className="color_blue">
                {translations[language].readingWithVisualization}
              </span>{" "}
              - {translations[language].readingDescription}
            </p>
            <img src="./images/works_photo1.png" alt="" />
          </div>
          <div className="works_block2">
            <button className="circle_number_2">2</button>
            <img src="./images/works_photo2.png" alt="" />
            <p>
              <span className="color_blue">
                {translations[language].expressingEmotions}
              </span>{" "}
              - {translations[language].expressingDescription}
            </p>
          </div>
          <div className="works_block3">
            <button className="circle_number_3">3</button>
            <p>
              <span className="color_blue">
                {translations[language].decisionMaking}
              </span>{" "}
              - {translations[language].decisionDescription}
            </p>
            <img src="./images/works_photo3.png" alt="" />
          </div>
          <p className="works_result">{translations[language].resultText}</p>
        </section>

        <section className="mobile_version container" id="mobile">
          <div className="application_title">
            <h2>{translations[language].mobileTitle}</h2>
            <p>{translations[language].mobileDescription}</p>
          </div>
          <div className="image_block">
            <img src="./images/application_phone.png" alt="" />
          </div>
        </section>
      </main>

      <footer className="container">
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

export default Home;
