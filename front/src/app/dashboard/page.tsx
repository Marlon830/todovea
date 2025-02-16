"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Grid2 } from '@mui/material';
import TodoItem from '@/components/TodoItem';
import { TodoData, TodoStatus, useTodo } from '@/services/todoService';
import { UserData, useUsers } from '@/services/usersService';
import { useAuth } from '@/services/authService';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function TodoListPage() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const { getTodos } = useTodo();
  const [users, setUsers] = useState<UserData[]>([]);
  const { getAllUsers } = useUsers();
  const { logout } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(['todovea_auth_token'], {
    doNotParse: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (!cookies["todovea_auth_token"]) {
      router.push('/');
    }

    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchTodos();
    fetchUsers();
  }, []);

  const handleCreateTodoButton = () => {
    router.push('/create-todo');
  };

  const todosByStatus = (status: TodoStatus) => todos.filter(todo => todo.status === status);

  const handleStatusChange = (updatedTodo: TodoData) => {
    setTodos(prevTodos => prevTodos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));
  };

  const handleDeleteChange = (deletedTodo: TodoData) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== deletedTodo._id));
  };

  const handleLogoutButton = () => {
    logout();
    router.push('/login');
  };

  return (
    <Container maxWidth={false} sx={{ padding: 0 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography variant="h3" gutterBottom>
          Todo List
        </Typography>
        <Grid2 container spacing={2} sx={{ width: '70%', justifyContent: 'space-between' }}>
          <Grid2 sx={{ width: '30%' }}>
            <Typography variant="h5" gutterBottom>
              Todo
            </Typography>
            {todosByStatus(TodoStatus.Todo).map(todo => (
              <div key={`div-todo-${todo._id}`} className='mb-3'>
                <TodoItem key={todo._id} todo={todo} onStatusChange={handleStatusChange} onDeleteChange={handleDeleteChange} assignedUsers={users.filter(user => todo.assignedUsers.includes(user._id))} unassignedUsers={users.filter(user => !todo.assignedUsers.includes(user._id))} />
              </div>
            ))}
          </Grid2>
          <Grid2 sx={{ width: '30%' }}>
            <Typography variant="h5" gutterBottom>
              In Progress
            </Typography>
            {todosByStatus(TodoStatus.InProgress).map(todo => (
              <div key={`div-todo-${todo._id}`} className='mb-3'>
                <TodoItem key={todo._id} todo={todo} onStatusChange={handleStatusChange} onDeleteChange={handleDeleteChange} assignedUsers={users.filter(user => todo.assignedUsers.includes(user._id))} unassignedUsers={users.filter(user => !todo.assignedUsers.includes(user._id))} />
              </div>
            ))}
          </Grid2>
          <Grid2 sx={{ width: '30%' }}>
            <Typography variant="h5" gutterBottom>
              Completed
            </Typography>
            {todosByStatus(TodoStatus.Completed).map(todo => (
              <div key={`div-todo-${todo._id}`} className='mb-3'>
                <TodoItem key={todo._id} todo={todo} onStatusChange={handleStatusChange} onDeleteChange={handleDeleteChange} assignedUsers={users.filter(user => todo.assignedUsers.includes(user._id))} unassignedUsers={users.filter(user => !todo.assignedUsers.includes(user._id))} />
              </div>
            ))}
          </Grid2>
        </Grid2>
        <Box mx={4} display="flex" gap={2}>
          <Button variant="contained" color="error" onClick={handleLogoutButton}>
            Logout
          </Button>
          <Button variant="contained" color="success" onClick={handleCreateTodoButton}>
            Create Todo
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
