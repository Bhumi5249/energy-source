// src/app/source/page.js
'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Layout from '@/components/Layout';
import { getSourceList } from '@/redux/api/sourceApi';
import { addProduction, deleteProduction, getProductionList, updateProduction } from '@/redux/api/productionApi';
import UseAuthorization from '../utility/useAuthorization';

export default function Production() {
  const dispatch = useDispatch();
  const { productions } = useSelector((state) => state.production);
  const { sources } = useSelector((state) => state.source);
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ sourcesId: '', date: null, production: '' });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const canEdit = UseAuthorization('EDIT_PRODUCTION')
  const canDelete = UseAuthorization('DELETE_PRODUCTION')

  useEffect(() => {
    dispatch(getProductionList());
    dispatch(getSourceList());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditId(null);
    setFormData({ sourcesId: '', date: null, production: '' });
    setOpenAddEditModal(true);
  };

  const handleEditSource = (prod) => {
    setEditId(prod.productionId);
    setFormData({ sourcesId: prod.sourcesId, date: prod.date ? new Date(prod.date) : null, production: prod.production });
    setOpenAddEditModal(true);
  };

  const handleSaveSource = () => {
    if (editId) {
      dispatch(updateProduction({ id: editId, ...formData }));
    } else {
      dispatch(addProduction(formData));
    }
    setOpenAddEditModal(false);
  };

  const handleOpenDeleteModal = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const handleDeleteSource = () => {
    dispatch(deleteProduction(deleteId));
    setOpenDeleteModal(false);
  };

  return (
    <Layout>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1>Production Content</h1>
          <Button variant="contained" color="primary" onClick={handleOpenAddModal}>Add Production</Button>
        </div>

        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SourceName</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Production</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productions && productions.map((prod, index) => (
                <TableRow key={prod.productionId || index}>
                  <TableCell>{prod.sourceName}</TableCell>
                  <TableCell>{prod.date}</TableCell>
                  <TableCell>{prod.production}</TableCell>
                  <TableCell>
                    {canEdit && <Button variant="outlined" color="primary" onClick={() => handleEditSource(prod)}>Edit</Button>}
                    {canDelete && <Button variant="outlined" color="secondary" onClick={() => handleOpenDeleteModal(prod.productionId)}>Delete</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add/Edit Modal */}
        <Dialog open={openAddEditModal} onClose={() => setOpenAddEditModal(false)}>
          <DialogTitle>{editId ? 'Edit Production' : 'Add Production'}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Source</InputLabel>
              <Select
                value={formData.sourcesId}
                onChange={(e) => setFormData({ ...formData, sourcesId: e.target.value })}
                label="Source"
              >
                {sources && sources.map((source, index) => (
                  <MenuItem key={source.sourcesId || index} value={source.sourcesId}>
                    {source.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DatePicker
              sx={{ width: '100%' }}
              label="Date"
              value={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />

            <TextField
              label="Production"
              value={formData.production}
              onChange={(e) => setFormData({ ...formData, production: e.target.value })}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddEditModal(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSaveSource} color="primary">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <DialogTitle>Delete Production</DialogTitle>
          <DialogContent>Are you sure you want to delete this Production?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)} color="secondary">Cancel</Button>
            <Button onClick={handleDeleteSource} color="primary">Delete</Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Layout>
  );
}
