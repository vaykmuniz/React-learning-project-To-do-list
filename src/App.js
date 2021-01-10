import React, {useState, useEffect } from "react";
import './App.css';

//import components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //functions

  const filterHandler = () => {
    switch(status){
      case "completed":
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    };
  };

  const saveLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
    localStorage.setItem("todos", JSON.stringify(todos)) //save local todos
    }
  };

  const getLocalTodos = () => {
    if(localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  //useEffect

  useEffect(() => {
    getLocalTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, status]);


  return (
    <div className="App">
      <header>
        <h1>To Do List</h1>
      </header>
      <Form todos={todos} 
            setTodos={setTodos}
            inputText={inputText} 
            setInputText={setInputText}
            setStatus={setStatus} />
      <TodoList setTodos={setTodos}
                todos={todos} 
                filteredTodos={filteredTodos} />
    </div>
  );
}

export default App;
