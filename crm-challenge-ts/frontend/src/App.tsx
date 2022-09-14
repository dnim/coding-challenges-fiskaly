import './App.css';
import { MainLayout } from "./components/MainLayout";
import { QueryClient, QueryClientProvider, } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <MainLayout/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
