import './App.css';
import { MainLayout } from "./components/MainLayout";
import { QueryClient, QueryClientProvider, } from 'react-query'
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <MainLayout/>
        </ErrorBoundary>
      </QueryClientProvider>
    </div>
  );
}

export default App;
