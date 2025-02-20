import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import Header from "./components/common/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Header />
        <main className="min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-results" element={<SearchResult />} />
          </Routes>
        </main>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
