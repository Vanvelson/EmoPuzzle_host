import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./module_1_first.css";

const TOTAL_QUESTIONS = 5;


const emotionGifs = {
  sadness: "../public/images/gif/module_1/Sadness.gif",
  surprise: "../public/images/gif/first_level/Surprise.gif",
  joy: "../public/images/gif/first_level/Joy.gif",
  anger: "../public/images/gif/first_level/Anger.gif",
  shame: "../public/images/gif/first_level/Shame.gif",
};

const getGifForEmotion = (label) => {
  const key = label.trim().toLowerCase();
  return emotionGifs[key] || null;
};

const Bella = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [transition, setTransition] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  const fetchNewTask = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://back-end-hazel-six.vercel.app/novel/create_novel?lang=Eng"
      );
      const data = await res.json();

      const { text, image, question, answers, explanation, emotion } = data;

      const options = answers.map((answer) => ({
        label: answer,
        isCorrect: answer.trim().toLowerCase() === emotion.trim().toLowerCase(),
      }));

      const shuffled = [...options].sort(() => Math.random() - 0.5);

      setTask({ text, image, question, explanation, emotion });
      setShuffledAnswers(shuffled);
      setSelectedEmotion(null);
      setShowModal(false);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Не вдалося завантажити дані.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (questionCount < TOTAL_QUESTIONS) {
      fetchNewTask();
    } else {
      navigate("/login");
    }
  }, [questionCount]);

  const handleEmotionClick = (option) => {
    if (selectedEmotion && selectedEmotion.isCorrect) return;

    setSelectedEmotion(option);

    if (option.isCorrect) {
      setTransition(true);
      setTimeout(() => {
        setTransition(false);
        setQuestionCount((prev) => prev + 1);
      }, 500);
    } else {
      setShowModal(true);
    }
  };

  if (loading || !task) return <div className="container">Завантаження...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className={transition ? "fade-out" : ""}>
      <nav className="container">
        <img
          src="/images/logo1.png"
          alt="Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <ul>
          <li>Як це працює?</li>
          <li>Мобільний застосунок</li>
          <li>Почати навчання</li>
        </ul>
      </nav>

      <main className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h3>{`${questionCount + 1} / ${TOTAL_QUESTIONS}`}</h3>

        <div className="first_story">
          <div className="text_block">
            <p>{task.text}</p>
          </div>
          <div className="image_wrapper">
            <img src={task.image} alt="Story visual" className="image_fox2" />
          </div>
        </div>

        <h2>{task.question}</h2>

        <div className="variables">
          {shuffledAnswers.map((option, idx) => {
            const gifSrc = getGifForEmotion(option.label);
            return (
              <button
                key={idx}
                className={`btn_variant ${
                  selectedEmotion?.label === option.label
                    ? option.isCorrect
                      ? "green"
                      : "wrong_btn"
                    : ""
                }`}
                onClick={() => handleEmotionClick(option)}
              >
                {gifSrc && (
                  <img
                    src={gifSrc}
                    style={{
                      width: "24px",
                      height: "24px",
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  />
                )}
                {option.label}
              </button>
            );
          })}
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <div className="inmodal">
                <h3 className="modal_h3">Чому має бути саме ця відповідь?</h3>
                <p>{task.explanation}</p>
                <button
                  className="close_btn"
                  onClick={() => setShowModal(false)}
                >
                  Закрити
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="container footer">
        <div className="footer_text">
          <p>© 2025 EmoPuzzle. Усі права захищено.</p>
          <p>Допомагаємо дітям відчувати світ серцем.</p>
          <p>
            Зв'яжіться з нами: email@example.com | Телефон: +380 ХХХ ХХХ ХХХХ
          </p>
        </div>
        <p className="background_text">EmoPuzzle</p>
      </footer>
    </div>
  );
};

export default Bella;
