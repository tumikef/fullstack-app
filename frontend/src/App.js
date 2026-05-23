import { useEffect, useState } from "react";

function App() {
  const [ping, setPing] = useState("");
  const [visits, setVisits] = useState(0);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const backend = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${backend}/ping`)
      .then(res => res.json())
      .then(data => setPing(data.message));

    fetch(`${backend}/visits`)
      .then(res => res.json())
      .then(data => setVisits(data.visits));

    loadMessages();
  }, []);

  const loadMessages = () => {
    fetch(`${backend}/messages`)
      .then(res => res.json())
      .then(data => setMessages(data));
  };

  const saveMessage = async () => {
    await fetch(`${backend}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    loadMessages();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Docker Fullstack App</h1>

      <p>Backend status: {ping}</p>

      <p>Total visits: {visits}</p>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={saveMessage}>
        Save
      </button>

      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
