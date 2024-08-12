import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { connectToDatabase } from './database';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from './tasks';
import { ITask } from './models/TaskModel';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToDatabase();

// GET /tasks: Fetch all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

// GET /tasks/:id: Fetch a single task by ID
app.get('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await getTaskById(taskId);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
});

// POST /tasks: Create a new task
app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { title, description, status, priority, deadline, assignedTo } = req.body;

    if (!title || !description || !status || !priority || !deadline || !assignedTo) {
      return res.status(400).json({ message: 'all fields are required' });
    }

    const taskData: ITask = { title, description, status, priority, deadline, assignedTo } as ITask;
    const newTask = await createTask(taskData);
    res.status(201).json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// PUT /tasks/:id: Update a task by ID
app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, priority, deadline, assignedTo } = req.body;

    const updatedTaskData = { title, description, status, priority, deadline, assignedTo };
    const updatedTask = await updateTask(taskId, updatedTaskData);

    if (updatedTask) {
      res.json({message:"Task updated successfully",task:updatedTask});
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
});

// DELETE /tasks/:id: Delete a task by ID
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await deleteTask(taskId);

    if (deletedTask) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 
      message: 'Error deleting task', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});