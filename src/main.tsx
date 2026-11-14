import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ComponentePrincipal } from './Components/ComponentePrincipal'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <ComponentePrincipal />
  </StrictMode>,
)
