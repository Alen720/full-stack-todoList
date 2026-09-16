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

  function createTodo(text) {
    fetch(`${API}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: text
      })
    }).then(() => getTodos())
  }

  function toggleCheck(id, checked) {
    fetch(`${API}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        "Checked": checked
      })
    }).then(() => getTodos())
  }

  function deleteTodo(id) {
    fetch(`${API}/todos/${id}`, {
      method: "DELETE"
    }).then(() => getTodos())
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
