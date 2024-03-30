import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer/Footer';
import { MediaQueryContextProvider } from './context/MediaQueryContext';


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <MediaQueryContextProvider>
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
          <Footer />
          <div id="portal" />
        </QueryClientProvider>
      </MediaQueryContextProvider>
    </>
  );
}

export default App;
