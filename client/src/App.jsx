import { BrowserRouter,Routes,Route } from "react-router-dom";
import { ToastProvider } from "./components/ui/Toast";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function App(){
  return(
    <ToastProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<AppLayout/>}>
          <Route path="/" element={<Dashboard/>}/>

          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App;