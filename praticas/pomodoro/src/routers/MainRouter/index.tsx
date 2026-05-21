import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import { AboutPomodoro } from '../../pages/AboutPomodoro';
import { NotFound } from '../../pages/NotFound';
import { Home } from '../../pages/Home';
import { useEffect } from 'react';
import { History } from '../../pages/History';
import { Settings } from '../../pages/Settings'; 
import { Login } from '../../pages/Login'; 
import { ProtectedRoute } from '../../components/ProtectedRoute'; 
import { PublicOnlyRoute } from '../../components/PublicOnlyRoute'; 
import { AuthContextProvider } from '../../contexts/AuthContext'; // 👈 Envolver o roteador com o contexto

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <AuthContextProvider> {/* ✨ Garante o estado de login ativo para todas as rotas */}
      <BrowserRouter>
        <Routes>
          {/* Rota raiz controlada */}
          <Route 
            path='/' 
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            } 
          />

          {/* Blindagem total de todas as páginas construídas da prática 1 a 82 */}
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/history/' element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path='/settings/' element={<ProtectedRoute><Settings /></ProtectedRoute>} /> 
          <Route path='/about-pomodoro/' element={<ProtectedRoute><AboutPomodoro /></ProtectedRoute>} />
          
          <Route path='*' element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </AuthContextProvider>
  );
}