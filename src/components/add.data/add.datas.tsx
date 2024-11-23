import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseAPI } from '../../utils/constants';
import { AddDataForm, ResponseType } from './type';
import { Container,AddToCartButton, Modal,ModalContent,CloseButton,Input,SubmitButton,ErrorMessage,Table,TableRow,TableData,DeleteButton } from './style';

const AddTodo: React.FC = () => {
  const [formData, setFormData] = useState<AddDataForm>({ title: '', desc: '', image: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<any[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('resize', () => {}); 
    return () => window.removeEventListener('resize', () => {});
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return setError('Iltimos, tizimga kiring.');

    setLoading(true);
    try {
      const { data } = await axios.post<ResponseType>(`${baseAPI}/todo/add`, formData, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        const updatedTodos = [data.new_todo, ...todos];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setFormData({ title: '', desc: '', image: '' });
      } else {
        setError(data.message || 'Xatolik yuz berdi.');
      }
    } catch {
      setError('Xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Iltimos, tizimga kiring.');

    try {
      const { data } = await axios.delete<ResponseType>(`${baseAPI}/todo/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } else {
        setError('O\'chirishda xatolik.');
      }
    } catch {
      setError('O\'chirishda xatolik.');
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <h2>Ma'lumot Qo'shish</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
      <AddToCartButton onClick={() => setShowModal(true)}>Add</AddToCartButton>
      {showModal && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
            <form onSubmit={handleSubmit}>
              <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
              <Input type="text" name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" required />
              <Input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
              <SubmitButton type="submit" disabled={loading}>{loading ? 'Yuborilmoqda...' : 'Qo\'shish'}</SubmitButton>
            </form>
          </ModalContent>
        </Modal>
      )}
      {todos.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <TableRow key={todo._id}>
                <TableData>{todo.title}</TableData>
                <TableData>{todo.desc}</TableData>
                <TableData>{todo.image ? <img src={todo.image} alt={todo.title} style={{ width: '50px', height: '50px' }} /> : 'No Image'}</TableData>
                <TableData>{new Date(todo.sana).toLocaleDateString()}</TableData>
                <TableData><DeleteButton onClick={() => handleDelete(todo._id)}>Delete</DeleteButton></TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AddTodo;

