import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer/Footer';
import { AuthContextProvider } from './context/AuthContext';
import { MediaQueryContextProvider } from './context/MediaQueryContext';
import { ModalContextProvider } from './context/ModalContext';
import TopButton from './components/TopButton/TopButton';

const queryClient = new QueryClient();


function App() {
  return (
    <AuthContextProvider>
      <MediaQueryContextProvider>
        <QueryClientProvider client={queryClient}>
          <ModalContextProvider>
            <Header />
            <Outlet />
            <Footer />
            <TopButton />
            <div id="portal" />
          </ModalContextProvider>
        </QueryClientProvider>
      </MediaQueryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
