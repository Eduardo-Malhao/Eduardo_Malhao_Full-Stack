import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import AuthProvider from './Provider/Auth.Provider.tsx'
import ToastProvider from './Provider/Toast.Provider.tsx'
import SidebarProvider from './Provider/Sidebar.Provider.tsx'
import AppRoutes from './Routes/app.routes.tsx'
import { APIProvider } from './Client/APIProvider.tsx'

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <APIProvider>
      <AuthProvider>
        <ToastProvider>
          <SidebarProvider>
            <AppRoutes />
          </SidebarProvider>
        </ToastProvider>
      </AuthProvider>
    </APIProvider>
  </StrictMode>,
)
