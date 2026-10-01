import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/vazirmatn'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = <BrowserRouter><App /></BrowserRouter>
// صفحات هنگام build پیش‌رندر شده‌اند؛ در این حالت فقط «فعال‌سازی» انجام می‌شود.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
