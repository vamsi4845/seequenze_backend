import { ITask } from '../models/taskModel'; 
import { Task } from '../models/taskModel';
export async function getAllTasks() {
  return await Task.find();
}

export async function getTaskById(id: string) {
  return await Task.findById(id);
}

export async function createTask(taskData:Partial<ITask>) {
  const newTask = new Task(taskData);
  return await newTask.save();
}

export async function updateTask(id: string, updatedData: Partial<ITask>) {
  return await Task.findByIdAndUpdate(id, updatedData, { new: true });
}

export async function deleteTask(id: string) {
  return await Task.findByIdAndDelete(id);
}
