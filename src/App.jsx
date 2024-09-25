import  { useState, useEffect } from "react";
import "./App.css";
import { AiFillCheckCircle } from "react-icons/ai";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import axios from "axios"; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const API_BASE_URL = "https://66f3268171c84d805877fb81.mockapi.io/estoque/bebidas";

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const addTask = (newTask) => {
    if (editingTask !== null) {
      const taskToEdit = tasks[editingTask];
      const updatedTask = { ...taskToEdit, ...newTask };
      const taskUrl = `${API_BASE_URL}/${taskToEdit.id}`;

      axios
        .put(taskUrl, updatedTask)
        .then((response) => {
          const updatedTasks = [...tasks];
          updatedTasks[editingTask] = response.data;
          setTasks(updatedTasks);
          setEditingTask(null); 
        })
        .catch((error) => console.error(error));
    } else {
     
      axios
        .post(API_BASE_URL, newTask)
        .then((response) => {
          setTasks([...tasks, response.data]);
        })
        .catch((error) => console.error(error));
    }
  };

  const removeTask = (index) => {
    const taskToRemove = tasks[index];
    const taskUrl = `${API_BASE_URL}/${taskToRemove.id}`;

    axios
      .delete(taskUrl)
      .then(() => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
        if (editingTask === index) {
          setEditingTask(null); 
        }
      })
      .catch((error) => console.error(error));
  };

  const updateTask = (index) => {
    setEditingTask(index);
  };

  return (
    <div className="app">
      <h1 className="app-title">
        <AiFillCheckCircle className="app-icon" /> Estoque de Bebidas
      </h1>
      <TaskForm addTask={addTask} editingTask={editingTask} tasks={tasks} />
      <div className="task-list-container">
        <TaskList
          tasks={tasks}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default App;
