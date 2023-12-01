
import React, { useState, useEffect } from 'react';
interface Task { id: string; title: string; description: string };

interface TaskDetailsProps {
  task: { id: string; title: string; description: string, status: string };
  onClose: () => void;
  onUpdate: (Task) => void;
  onDelete: (id: string) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose, onUpdate, onDelete }) => {

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task])

  const handleUpdate = () => {
    console.log(task)
    onUpdate({...task, title, description, status});
  };

  const handleDelete = () => {
    console.log(task)
    onDelete(task.id);
  };

  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white p-8 shadow-lg">
      {/* Close button */}
      <button onClick={onClose} className="mb-4 border p-2 rounded float-right">&times;</button>
      <div className="font-semibold mt-8 block">
        {/* Task title input */}
        <label htmlFor="title" className="font-semibold mb-2 block">Task Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded font-normal"
        />

        {/* Task description input */}
        <label htmlFor="description" className="font-semibold mb-2 block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded font-normal"
        />
        <label htmlFor="status" className="font-semibold mb-2 block">Status </label>
         <select 
            className=" mb-4 p-2 border rounded font-normal"
            onChange={(e) => setStatus(e.target.value)}
            value={status}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Progress">In Review</option>
            <option value="Done">Done</option>
          </select>
          <div className='w-full'></div>
        {/* Update button */}
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Update</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
      </div>
      
    </div>
  );
};

export default TaskDetails;
    