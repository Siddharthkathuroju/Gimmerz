"use client";
import React, { useState, useEffect } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]); // Stores the list of tasks
  const [task, setTask] = useState(""); // Tracks the current input value
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Position for the movable container
  const [isDragging, setIsDragging] = useState(false); // Tracks dragging state
  const [isPinned, setIsPinned] = useState(false); // Tracks pinning status

  // Load tasks and pinning status from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    const storedPinned = localStorage.getItem("isPinned");

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks)); // Load and parse tasks
    }

    if (storedPinned) {
      setIsPinned(JSON.parse(storedPinned)); // Load pinning status
    }
  }, []);

  // Save tasks and pinning status to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("isPinned", JSON.stringify(isPinned));
  }, [tasks, isPinned]);

  // Function to add a new task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]); // Add new task with `completed` false
      setTask(""); // Clear the input after adding the task
    }
  };

  // Function to toggle task completion
  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Handlers for dragging
  const startDrag = (e) => {
    setIsDragging(true);
  };

  const onDrag = (e) => {
    if (isDragging && !isPinned) {
      setPosition((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // Toggle pinning state
  const togglePin = () => {
    setIsPinned(!isPinned);
  };

  return (
    <div
      className={`fixed z-50 ${isPinned ? "top-10 left-10" : ""}`} // Pin the list if isPinned is true
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={startDrag}
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <div className="h-[calc(100vh-300px)] min-h-[300px] w-[400px] bg-gradient-to-b from-blue-100 to-blue-50 flex flex-col items-center py-10 shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Tasks</h1>

        <div className="flex w-full max-w-md gap-2 px-4">
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

        <ul className="mt-6 w-full max-w-md px-4 overflow-y-auto h-[calc(100%-160px)]">
          {tasks.length === 0 ? (
            <li className="text-gray-500 text-center mt-4">No tasks added yet!</li>
          ) : (
            tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow mb-2 cursor-pointer transition ${
                  task.completed ? "bg-gray-300" : ""
                }`}
                onClick={() => toggleCompletion(index)} // Toggle completion on click
              >
                {task.completed && (
                  <span className="text-white text-xl mr-3">&#10003;</span>
                )}

                <span
                  className={`text-gray-800 ${
                    task.completed ? "line-through text-black" : ""
                  }`}
                >
                  {task.text}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering toggleCompletion
                    deleteTask(index);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                  aria-label="Delete Task"
                >
                  &times;
                </button>
              </li>
            ))
          )}
        </ul>

        <button
          onClick={togglePin}
          className="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-full"
          aria-label={isPinned ? "Unpin Todo List" : "Pin Todo List"}
        >
          {isPinned ? "Unpin" : "Pin"}
        </button>
      </div>
    </div>
  );
};

export default Todo;
