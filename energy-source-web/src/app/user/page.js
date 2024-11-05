// src/app/source/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import Layout from '@/components/Layout';
import { addUser, deleteUser, getRoles, getUser, updateUser } from '@/redux/api/userApi';
import UseAuthorization from '../utility/useAuthorization';

export default function User() {
  const dispatch = useDispatch();
  const { users, roles } = useSelector((state) => state.user);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ userName: '', email: '', password: '', roleId: '' });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const canEdit = UseAuthorization('EDIT_USER')
  const canDelete = UseAuthorization('DELETE_USER')
  useEffect(() => {
    dispatch(getUser());
    dispatch(getRoles())
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({ userName: '', email: '', password: '', roleId: '' });
    setOpenAddEditModal(true);
  };

  const handleEditUser = (user) => {
    setEditId(user.userId);
    setFormData({ userName: user.userName, email: user.email, password: user.password, roleId: user.roleId });
    setOpenAddEditModal(true);
  };

  const handleSaveUser = () => {
    if (editId) {
      dispatch(updateUser({ id: editId, ...formData }));
    } else {
      dispatch(addUser(formData));
    }
    setOpenAddEditModal(false);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(deleteId));
    setOpenDeleteModal(false);
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>User Management</h1>
        <Button variant="contained" color="primary" onClick={handleOpenAddModal}>Add User</Button>
      </div>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user, index) => (
              <TableRow key={user.userId || index}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roleName}</TableCell>
                <TableCell>
                  {canEdit && <Button variant="outlined" color="primary" onClick={() => handleEditUser(user)}>Edit</Button>}
                  {canDelete && <Button variant="outlined" color="secondary" onClick={() => handleOpenDeleteModal(user.userId)}>Delete</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <Dialog open={openAddEditModal} onClose={() => setOpenAddEditModal(false)}>
        <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="User Name"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={formData.roleId}
              onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
              label="Role"
            >
              {roles && roles.map((role, index) => (
                <MenuItem key={role.roleId || index} value={role.roleId}>
                  {role.roleName}
                </MenuItem>
              ))}
              {/* <MenuItem value="1">Admin</MenuItem>
                            <MenuItem value="2">User</MenuItem> */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEditModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveUser} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteUser} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
