// src/app/source/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Layout from '@/components/Layout';
import { addSource, deleteSource, getSourceList, updateSource } from '@/redux/api/sourceApi';

export default function Source() {
  const dispatch = useDispatch();
  const { sources, loading, error } = useSelector((state) => state.source);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', capacity: '' });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(getSourceList());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({ name: '', type: '', capacity: '' });
    setOpenAddEditModal(true);
  };

  const handleEditSource = (source) => {
    setEditId(source.sourcesId);
    setFormData({ name: source.name, type: source.type, capacity: source.capacity });
    setOpenAddEditModal(true);
  };

  const handleSaveSource = () => {
    if (editId) {
      dispatch(updateSource({ id: editId, ...formData }));
    } else {
      dispatch(addSource(formData));
    }
    setOpenAddEditModal(false);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteSource = () => {
    dispatch(deleteSource(deleteId));
    setOpenDeleteModal(false);
  };

  return (
    <Layout>
      <h1>Energy Source Content</h1>
      <Button variant="contained" color="primary" onClick={handleOpenAddModal}>Add Source</Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source, index) => (
              <TableRow key={source.sourcesId || index}>
                <TableCell>{source.name}</TableCell>
                <TableCell>{source.type}</TableCell>
                <TableCell>{source.capacity}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditSource(source)}>Edit</Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleOpenDeleteModal(source.sourcesId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Modal */}
      <Dialog open={openAddEditModal} onClose={() => setOpenAddEditModal(false)}>
        <DialogTitle>{editId ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} fullWidth margin="normal" />
          <TextField label="Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} fullWidth margin="normal" />
          <TextField label="Capacity" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} fullWidth margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddEditModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveSource} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Delete Source</DialogTitle>
        <DialogContent>Are you sure you want to delete this source?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteSource} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
