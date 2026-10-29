import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/ui/Toast";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import TaskListPage from "./pages/TaskListPage";
import TaskDetails from "./pages/TaskDetails";
import KandanPage from "./pages/KandanPage";
import { TasksProvider } from "./context/TasksContext";

function App() {
  return (
    <ToastProvider>
    <TasksProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskListPage />} />
            <Route path="/tasks/:id" element={<TaskDetails />} />
            <Route path="/kandan" element={<KandanPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </TasksProvider>
    </ToastProvider>
  );
}

export default App;
