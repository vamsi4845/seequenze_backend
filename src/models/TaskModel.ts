import mongoose, { Schema } from 'mongoose';

export interface ITask  {
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  assignedTo: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['todo', 'in-progress', 'completed'], 
    default: 'todo',
    required: true,
  },
  priority:{
    type:String,
    enum:['low','medium','high'],
    default:'medium',
    required:true,
  },
  deadline: { type: Date, required: false },
  assignedTo: { type: String, required: false },
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
