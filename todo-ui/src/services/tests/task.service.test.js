import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { getTasks, addTask, updateTask, deleteTask } from '../task.service';

vi.mock('axios');

describe('Task API functions', () => {
  
  it('should call getTasks and return data', async () => {
    const mockData = { data: [{ id: 1, task: 'Test Task' }] };
    axios.get.mockResolvedValue(mockData);
    
    const result = await getTasks();
    
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
    expect(result).toEqual(mockData);
  });

  it('should call addTask and return data', async () => {
    const newTask = { task: 'New Task' };
    const mockData = { data: { id: 2, task: 'New Task' } };
    axios.post.mockResolvedValue(mockData);
    
    const result = await addTask(newTask);
    
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/tasks', newTask);
    expect(result).toEqual(mockData);
  });

  it('should call updateTask and return updated data', async () => {
    const id = 1;
    const updates = { task: 'Updated Task' };
    const mockData = { data: { id: 1, task: 'Updated Task' } };
    axios.put.mockResolvedValue(mockData);
    
    const result = await updateTask(id, updates);
    
    expect(axios.put).toHaveBeenCalledWith(`http://localhost:3000/tasks/${id}`, updates);
    expect(result).toEqual(mockData);
  });

  it('should call deleteTask and return response', async () => {
    const id = 1;
    const mockData = { data: { message: 'Task deleted successfully' } };
    axios.delete.mockResolvedValue(mockData);
    
    const result = await deleteTask(id);
    
    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/tasks/${id}`);
    expect(result).toEqual(mockData);
  });

});
