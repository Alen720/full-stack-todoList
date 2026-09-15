import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState([])
  
  const initialValue = {
    userText: ""
  }

  const API = "http://127.0.0.1:8000"
  
  function getTodos() {
    fetch(`${API}/todos`)
    .then((res) => res.json())
    .then((data) => setText(data))
  }

  useEffect(() => {
    getTodos()
  })

  return (
    <div className="App">
      {text.length > 0 && (
          <div className="content">
            {text.map((item, index) => (
                <span key={index}>{item.text}</span>
            ))}
          </div>
        )}
    </div>
  );
}

export default App;
