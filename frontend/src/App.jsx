import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/authStore';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import RoleBasedRoute from './components/RoleBasedRoute';
import { ROLES } from './constants/roles';

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import EmployeeDashboard from './pages/employee/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import SubmitExpense from './pages/employee/SubmitExpense';
import MyExpenses from './pages/employee/MyExpenses';
import Approvals from './pages/manager/Approvals';
import AdminRules from './pages/admin/ApprovalRules';
import ManageUsers from './pages/admin/ManageUsers';
import AllExpenses from './pages/admin/AllExpenses';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route index element={<Navigate to="login" replace />} />
          </Route>

          {/* Employee Routes */}
          <Route path="/employee" element={<DashboardLayout />}>
             <Route element={<RoleBasedRoute allowedRoles={[ROLES.EMPLOYEE, ROLES.MANAGER, ROLES.ADMIN]} />}>
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="submit-expense" element={<SubmitExpense />} />
                <Route path="my-expenses" element={<MyExpenses />} />
                <Route index element={<Navigate to="dashboard" replace />} />
             </Route>
          </Route>

          {/* Manager Routes */}
          <Route path="/manager" element={<DashboardLayout />}>
             <Route element={<RoleBasedRoute allowedRoles={[ROLES.MANAGER, ROLES.ADMIN]} />}>
                <Route path="dashboard" element={<ManagerDashboard />} />
                <Route path="approvals" element={<Approvals />} />
                <Route index element={<Navigate to="dashboard" replace />} />
             </Route>
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
             <Route element={<RoleBasedRoute allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="manage-rules" element={<AdminRules />} />
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="all-expenses" element={<AllExpenses />} />
                <Route index element={<Navigate to="dashboard" replace />} />
             </Route>
          </Route>

          {/* Fallback */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
