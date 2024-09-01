import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import WelcomePage from './Pages/WelcomePage';
import SearchPage from './Pages/SearchPage';
import SavedJobsPage from './Pages/SavedJobsPage';
import SignInPage from './Pages/SignInPage';
import AppliedJobsPage from './Pages/AppliedJobsPage';
import RegisterPage from './Pages/RegisterPage';
import './App.css';
import EmployeeReferalsPage from './Pages/EmployeeReferalsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route index element={<WelcomePage />}/>
    <Route path="/search" element={<SearchPage />} />
    <Route path="/saved-jobs" element={<SavedJobsPage />} />
    <Route path="/applied-jobs" element={<AppliedJobsPage />} />
    <Route path="/employee-referals" element={<EmployeeReferalsPage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Route>
)
);

function App() {
  return (
    <RouterProvider router={router} ></RouterProvider>
  );
}

export default App
