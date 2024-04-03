import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './components/context/AuthContext';
import Footer from './components/Footer/Footer';
import { MediaQueryContextProvider } from './components/context/MediaQueryContext';


const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <MediaQueryContextProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
          <Footer />
          <div id="portal" />
        </QueryClientProvider>
      </MediaQueryContextProvider>
    </AuthContextProvider>
  );
}

export default App;
