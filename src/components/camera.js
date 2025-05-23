import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
 
const tasks = {
  1: {
    title: "A Sweet Surprise",
    task: "Someone gave you your favorite snack",
    emotion: "happy",
  },
  2: {
    title: "The Lost Toy",
    task: "Someone took your treat",
    emotion: "sad",
  },
  3: {
    title: "An Unexpected Sound",
    task: "Someone gave you a gift",
    emotion: "surprise",
  },
  4: {
    title: "The Ruined Book",
    task: "Friends are busy and no one can meet",
    emotion: "sad",
  },
  5: {
    title: "An Unexpected Gift of Time",
    task: "Hug a friend you haven’t seen for a long time",
    emotion: "happy",
  },
};

const PROCESSING_INTERVAL = 300;

export default function Module2Camera({ initialStoryIndex = 1 }) {
  const navigate = useNavigate();
  const [localStoryIndex, setLocalStoryIndex] = useState(initialStoryIndex);
  const [answerState, setAnswerState] = useState("neutral");
  const [camEnabled, setCamEnabled] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const wsRef = useRef(null);
  const lastProcessedRef = useRef(0);
  const isProcessingRef = useRef(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (camEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "user" } })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setCamEnabled(false);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [camEnabled]);

  useEffect(() => {
    if (!camEnabled) return;

    const ws = new WebSocket(
      "wss://romaniabackws-production.up.railway.app/ws"
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(
        JSON.stringify({
          emotion: tasks[localStoryIndex].emotion,
          confidence: 0.3,
        })
      );
      setAnswerState("neutral");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.status === "detected" &&
        data.emotion === tasks[localStoryIndex].emotion
      ) {
        console.log("Correct emotion detected:", data.emotion);
        setAnswerState("correct");
        setTimeout(() => {
          const nextIndex = localStoryIndex + 1;
          if (tasks[nextIndex]) {
            setLocalStoryIndex(nextIndex);
            setAnswerState("neutral");
            ws.send(
              JSON.stringify({
                emotion: tasks[nextIndex].emotion,
                confidence: 0.3,
              })
            );
          } else {
            ws.close();
          }
        }, 2000);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    wsRef.current = ws;

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [camEnabled, localStoryIndex]);

  const captureAndSendFrame = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    if (!videoRef.current || !canvasRef.current) return;

    const now = Date.now();
    if (
      now - lastProcessedRef.current < PROCESSING_INTERVAL ||
      isProcessingRef.current
    )
      return;

    lastProcessedRef.current = now;
    isProcessingRef.current = true;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (blob && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(blob);
      }
      isProcessingRef.current = false;
    }, "image/jpeg");
  };

  useEffect(() => {
    if (!camEnabled) return;

    const intervalId = setInterval(() => {
      captureAndSendFrame();
    }, PROCESSING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [camEnabled]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <nav className="container">
        <img
          src="/images/logo1.png"
          alt="Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <ul>
          <li>How does it work?</li>
          <li>Mobile application</li>
          <li>Start learning</li>
        </ul>
      </nav>
      <button style={{ textAlign: "left", marginLeft: "250px", }} className="back-button" onClick={() => navigate(-1)}>
          ←
      </button>
      <div style={{ flex: 1, padding: 20 }}>
        <div style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "10px" }}>
            {tasks[localStoryIndex]?.title}
          </h2>
          <p style={{ fontSize: "20px", marginBottom: "8px" }}>
            {tasks[localStoryIndex]?.task}
          </p>
          <p style={{ fontSize: "18px", color: "#555" }}>
            Expected emotion:{" "}
            <b style={{ color: "#0077cc" }}>{tasks[localStoryIndex]?.emotion}</b>
          </p>
        </div>

        <div
          style={{
            width: 550,
            height: 400,
            border: "5px solid",
            borderColor:
              answerState === "correct"
                ? "#83DA40"
                : answerState === "wrong"
                ? "#E85E40"
                : "#C5C5C5",
            margin: "0 auto",
            position: "relative",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <video
            className="video"
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={() => setCamEnabled(!camEnabled)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#0077cc",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {camEnabled ? "Close camera" : "Open camera"}
          </button>
        </div>

        {answerState === "correct" && (
          <p
            style={{
              color: "#83DA40",
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            The correct emotion has been recognized!
          </p>
        )}
      </div>

      <footer
        className="container footer"
        style={{
          position: "relative",
          backgroundColor: "#4b1235",
        }}
      >
        <div className="footer_text">
          <p>© 2025 EmoPuzzle. Усі права захищено.</p>
          <p>Допомагаємо дітям відчувати світ серцем.</p>
          <p>
            Зв'яжіться з нами: email@example.com | Телефон: +380 ХХХ ХХХ ХХХХ
          </p>
        </div>
        <p className="background_text" style={{ marginTop: 10, opacity: 0.1 }}>
          EmoPuzzle
        </p>
      </footer>
    </div>
  );
}
