"use client";
import React, { useState, useEffect } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]); // Stores the list of tasks
  const [task, setTask] = useState(""); // Tracks the current input value

  // Load tasks from session storage on component mount
  useEffect(() => {
    const storedTasks = sessionStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Load and parse tasks
    }
  }, []);

  // Save tasks to session storage whenever they are updated
  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask(""); // Clear the input after adding the task
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Tasks</h1>

      <div className="flex w-full max-w-md gap-2">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-grow px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addTask}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          aria-label="Add Task"
        >
          +
        </button>
      </div>

      <ul className="mt-6 w-full max-w-md">
        {tasks.length === 0 ? (
          <li className="text-gray-500 text-center mt-4">No tasks added yet!</li>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow mb-2"
            >
              <span className="text-gray-800">{task}</span>
              <button
                onClick={() => deleteTask(index)}
                className="text-gray-400 hover:text-gray-600 transition"
                aria-label="Delete Task"
              >
                &times;
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;
