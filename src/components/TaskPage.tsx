'use client'

import React, { useEffect, useState } from 'react';

import TaskList from './TaskList';
import CreateTaskModal from './CreateTaskModal';

const TasksPage = (params) => {
  
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter).filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.title.localeCompare(b.title);
    }
    return b.title.localeCompare(a.title);
  });
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchTasks(); // Refresh the list after adding a new task
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const updateTask = async (task) => {
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchTasks(); // Refresh the list after adding a new task
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      fetchTasks(); // Refresh the list after adding a new task
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleCreateTask = (title: string, description: string) => {
   
    createTask({title:title, description:description});
    setModalOpen(false);
  };

  return (
    <div className="container">
      
      <div className="flex flex-row justify-between items-center mb-4">
          <div className="sm:mb-0">
            <select className="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                onChange={(e) => setFilter(e.target.value)}
                >
              <option>All</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={() => setModalOpen(true)}
          >
          Create Task ✏️ 
          </button>
      </div>
      <div className="flex justify-between mb-4">
      <input 
        type="text" 
        placeholder="Search tasks..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded"
      />
      <select 
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="asc">Sort Ascending</option>
        <option value="desc">Sort Descending</option>
      </select>
    </div>

     
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateTask}
      />
      <TaskList tasks={filteredTasks}  onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
};



export default TasksPage;
