import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer/Footer';


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
        <Footer />
        <div id="portal" />
      </QueryClientProvider>
    </>
  );
}

export default App;
