import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";

import "./App.css";

function App() {
  const [text, setText] = useState([]);

  const initialValues = {
    text: "",
  };

  const API = "http://127.0.0.1:8000";

  function getTodos() {
    fetch(`${API}/todos`)
      .then((res) => res.json())
      .then((data) => setText(data));
  }

  function createTodo(text) {
    fetch(`${API}/todos`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    }).then(() => getTodos());
  }

  function toggleCheck(id, checked) {
    fetch(`${API}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        checked: checked,
      }),
    }).then(() => getTodos());
  }

  function deleteTodo(id) {
    fetch(`${API}/todos/${id}`, {
      method: "DELETE",
    }).then(() => getTodos());
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <Formik
          initialValues={initialValues}
          onSubmit={(value, { resetForm }) => {
            createTodo(value.text);
            resetForm();
          }}
        >
          <Form>
            <Field
              name="text"
              placeholder="What you need to do?"
              autoComplete="off"
            ></Field>
          </Form>
        </Formik>

        {text.length > 0 && (
          <div className="content">
            {text.map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => toggleCheck(item.id, e.target.checked)}
                />
                <span>{item.text}</span>
                <button type="button" onClick={() => deleteTodo(item.id)}>
                  DELETE
                </button>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
