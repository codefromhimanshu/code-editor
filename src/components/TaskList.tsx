// components/TaskList.tsx
import React, { useState }  from 'react';
import TaskDetails from './TaskDetails';

interface TaskListProps {
    tasks: any[];
    onUpdate?: (updatedData: any) => void;
    onDelete?: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate, onDelete }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  // const [filter, setFilter] = useState('All');

  
  // const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'In Review':
        return 'bg-yellow-500';
      case 'To Do':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    onUpdate(updatedTask)
    setSelectedTask(null);
  };

  const handleTaskDelete = (id) => {
    onDelete(id)
    setSelectedTask(null);
  };


  return (
    <>
     <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex justify-between items-center bg-white p-4 rounded shadow" onClick={e => handleTaskSelect(task)}>
          {/* <span className={`inline-block w-2 h-2 mr-2 rounded-full ${getStatusStyles(task.status)}`} aria-hidden="true"></span> */}
          <span className={`${task.status === 'Done' ? 'line-through' : ''} flex-grow font-semibold`}>
            {task.title}
          </span>
          <span className={`${task.status === 'Done' ? 'line-through' : ''} flex-grow`}>
            {task.description}
          </span>
          <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${getStatusStyles(task.status)} text-white`}>
            {task.status}
          </span>
        </div>
      ))}
      {
        tasks.length === 0 && (
          <div className='flex items-center"'>
            <span> No Task present</span>
          </div>
          
        )
      }
    </div>
    {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={handleTaskUpdate}
          onDelete={handleTaskDelete}
        />
      )}
    </>
  );
};

export default TaskList;
