// src/components/Navigation.js
import Link from 'next/link';
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/navigation';

const Navigation = ({ navigation }) => {
  const router = useRouter();

  return (
    <List>
      {navigation.map((item) => (
        <ListItem
          key={item.segment}
          button
          onClick={() => router.push(item.path)} // Navigate to path
          selected={router.pathname === item.path} // Highlight active path
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
