import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, MessageCircle, Sparkles, Info, Phone, Rocket } from "lucide-react";
import { motion } from "framer-motion";

function App() {

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi 👋 I'm Qobo Assistant.\n\nAsk me about features, industries, pricing, or how to get started.",
      time: new Date().toLocaleTimeString()
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const importantQuestions = [
    { icon: <Info size={16} />, text: "What is Qobo?" },
    { icon: <Rocket size={16} />, text: "How do I start building?" },
    { icon: <Sparkles size={16} />, text: "What industries do you support?" },
    { icon: <Phone size={16} />, text: "How can I contact Qobo?" },
    { icon: <Sparkles size={16} />, text: "Tell me about success stories" }
  ];

  const sendMessage = async (customText) => {
    const text = customText || input;
    if (!text.trim()) return;

    const userMessage = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        question: text
      });

      const botMessage = {
        sender: "bot",
        text: res.data.answer,
        time: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "⚠ Unable to connect to backend.",
          time: new Date().toLocaleTimeString()
        }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div style={styles.page}>
      
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>QOBO</h2>
        <p style={styles.tagline}>
          AI-powered Website & App Builder
        </p>

        <div style={{ marginTop: "40px" }}>
          <p style={styles.sectionTitle}>Important Questions</p>

          {importantQuestions.map((q, i) => (
            <div
              key={i}
              style={styles.suggestion}
              onClick={() => sendMessage(q.text)}
            >
              {q.icon} {q.text}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div style={styles.chatWrapper}>

        <div style={styles.header}>
          <MessageCircle size={22} />
          <h3>Qobo Assistant</h3>
        </div>

        <div style={styles.chatArea}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  msg.sender === "user" ? "flex-end" : "flex-start"
              }}
            >
              <div
                style={
                  msg.sender === "user"
                    ? styles.userBubble
                    : styles.botBubble
                }
              >
                {msg.text.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <span style={styles.timestamp}>{msg.time}</span>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={styles.botBubble}
            >
              Typing...
            </motion.div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Section */}
        <div style={styles.inputSection}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Qobo..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button style={styles.sendBtn} onClick={() => sendMessage()}>
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    background: "#F5F7FA",
    fontFamily: "Inter, sans-serif"
  },

  sidebar: {
    width: "300px",
    background: "#ffffff",
    padding: "35px",
    boxShadow: "2px 0 30px rgba(0,0,0,0.05)"
  },

  logo: {
    color: "#FF7A30",
    fontSize: "26px",
    fontWeight: "700"
  },

  tagline: {
    fontSize: "13px",
    color: "#777",
    marginTop: "6px"
  },

  sectionTitle: {
    fontWeight: "600",
    marginBottom: "15px",
    fontSize: "14px",
    color: "#333"
  },

  suggestion: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    cursor: "pointer",
    background: "#F8FAFC",
    fontSize: "14px",
    transition: "0.3s",
    border: "1px solid transparent"
  },

  chatWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    padding: "20px",
    background: "linear-gradient(135deg, #FF7A30, #FF9F43)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },

  chatArea: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  userBubble: {
    background: "#FF7A30",
    color: "#fff",
    padding: "14px 20px",
    borderRadius: "22px",
    maxWidth: "70%"
  },

  botBubble: {
    background: "#E6F7F5",
    padding: "14px 20px",
    borderRadius: "22px",
    maxWidth: "70%"
  },

  timestamp: {
    fontSize: "11px",
    color: "#999",
    marginTop: "4px"
  },

  inputSection: {
    display: "flex",
    padding: "18px",
    borderTop: "1px solid #eee",
    background: "#fff"
  },

  input: {
    flex: 1,
    padding: "14px 18px",
    borderRadius: "40px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px"
  },

  sendBtn: {
    marginLeft: "12px",
    background: "#2BBBAD",
    border: "none",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  }
};

export default App;