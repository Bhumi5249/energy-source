// src/app/layout.js
'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../redux/store';
import './globals.css';
import { extendTheme, styled } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Analytics',
    path: '/dashboard',
    icon: <BarChartIcon />,
  },
  {
    segment: 'source',
    path: '/source',
    title: 'Energy Source',
    icon: <LayersIcon />,
  },
  {
    segment: 'production',
    path: '/production',
    title: 'Production',
    icon: <DescriptionIcon />,
  },
];

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function RootLayout({ children }) {
  const routing = useDemoRouter('/dashboard');
  const router = useRouter()
  useEffect(()=>{
   router.push(routing.pathname)
  },[routing])
console.log("router", router)
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppProvider navigation={NAVIGATION} router={routing}
              theme={demoTheme}>
              <DashboardLayout>
                <PageContainer>
                  {children}
                </PageContainer>
              </DashboardLayout>
            </AppProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
