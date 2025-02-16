import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, List, ListItem, ListItemText, TextField, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TodoData, TodoStatus, useTodo } from '@/services/todoService';
import { UserData, useUsers } from '@/services/usersService';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

interface TodoItemProps {
  todo: TodoData;
  onStatusChange: (updatedTodo: TodoData) => void;
  onDeleteChange: (deletedTodo: TodoData) => void;
  unassignedUsers: UserData[];
  assignedUsers: UserData[];
}

export default function TodoItem({ todo, onStatusChange, onDeleteChange, unassignedUsers, assignedUsers }: TodoItemProps) {
  const { updateTodo, assignTodo, deleteTodo } = useTodo();
  const { getUserById, getMe } = useUsers();
  const [ownername, setOwnername] = useState<string>('');
  const [myId, setMyId] = useState<string>('');
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [cookies] = useCookies(['todovea_auth_token'], {
    doNotParse: true,
  });
  const router = useRouter();

  useEffect(() => {
    if (!cookies["todovea_auth_token"]) {
      router.push('/');
    }

    const fetchOwner = async () => {
      const user = await getUserById(todo.owner);
      setOwnername(user.username);
    };

    const fetchMe = async () => {
      const user = await getMe();
      setMyId(user._id);
    };

    fetchOwner();
    fetchMe();
  }, []);

  const handleStatusChange = async (event: SelectChangeEvent<TodoStatus>) => {
    const updatedTodo: TodoData = await updateTodo(todo._id, {
      ...todo,
      status: event.target.value as TodoStatus,
    });
    onStatusChange(updatedTodo);
  };

  const handleAssignChange = async (event: SelectChangeEvent<string[]>) => {
    const updatedTodo: TodoData = await assignTodo(todo._id, event.target.value as string[]);
    onStatusChange(updatedTodo);
  };

  const handleUpdate = async () => {
    const updatedTodo: TodoData = await updateTodo(todo._id, {
      ...todo,
      title,
      description,
    });
    onStatusChange(updatedTodo);
  };

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    onDeleteChange(todo);
  };

  const menuProps = {
    PaperProps: {
      sx: {
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      },
    },
  };

  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 400, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6" component="div" sx={{ mr: 12 }}>
            Owner: {ownername}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          {todo.owner === myId && (
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
        />
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={todo.status}
            onChange={handleStatusChange}
            label="Status"
            MenuProps={menuProps}
          >
            <MenuItem value={TodoStatus.Todo}>Todo</MenuItem>
            <MenuItem value={TodoStatus.InProgress}>In Progress</MenuItem>
            <MenuItem value={TodoStatus.Completed}>Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Assign Users</InputLabel>
          <Select
            multiple
            value={todo.assignedUsers}
            onChange={handleAssignChange}
            label="Assign Users"
            MenuProps={menuProps}
          >
            {unassignedUsers.map(user => (
              <MenuItem key={user._id.toString() + todo._id.toString()} value={user._id}>
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography variant="h6" component="div" sx={{ mt: 2 }}>
          Assigned Users
        </Typography>
        <List>
          {assignedUsers.map(user => {
            return (
              <ListItem key={user._id.toString() + todo._id.toString()}>
                <ListItemText primary={user.username} />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
