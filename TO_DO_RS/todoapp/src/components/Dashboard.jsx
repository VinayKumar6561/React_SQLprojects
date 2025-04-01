import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [formData, setFormData] = useState({ taskName: '', dueDate: '', status: 'Pending' });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/task/user/${userId}`);
      if (response.status === 200) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (!formData.taskName || !formData.dueDate) {
      alert('Please enter task name and due date.');
      return;
    }

    const newTask = { ...formData, userId };

    try {
      const response = await axios.post('http://localhost:8080/task/add', newTask);
      if (response.status === 200) {
        fetchTasks();
        setFormData({ taskName: '', dueDate: '', status: 'Pending' });
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async () => {
    if (!editTask) return;

    try {
      await axios.put(`http://localhost:8080/task/update/${editTask.taskId}`, formData);
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/task/delete/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2 id='title-todo'>To-Do List</h2>

      {/* Add Task Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Enter task..."
          value={formData.taskName}
          onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
        />
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
        <button onClick={editTask ? updateTask : addTask}>
          {editTask ? <FaSave /> : <FaPlus />} {editTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.taskId} className="task-item">
            {editTask && editTask.taskId === task.taskId ? (
              <>
                <input
                  type="text"
                  value={formData.taskName}
                  onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
                
                <button onClick={updateTask}><FaSave /> Save</button>
                <button onClick={() => setEditTask(null)}><FaTimes /> Cancel</button>
              </>
            ) : (
              <>
                <span id='task_name'>{task.taskName}</span>
                <span className={task.status === 'Completed' ? 'completed' : 'pending'}>
                  {task.status === 'Completed' ? '✅' : '⏳'} {task.status}
                </span>
                <span>{task.dueDate}</span>
                <button className="edit-btn" onClick={() => setEditTask(task) & setFormData(task)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => deleteTask(task.taskId)}>
                  <FaTrash /> Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
