'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid2';
import { Skeleton } from '@mui/material';


export default function Dashboard(props) {

  return (
    <Grid container spacing={1}>
      <Grid size={12}>
        <Skeleton height={14} />
      </Grid>
      <Grid size={4}>
        <Skeleton height={100} />
      </Grid>
      <Grid size={8}>
        <Skeleton height={100} />
      </Grid>
    </Grid>
  );
}
