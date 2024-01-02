import {Route, Routes, Outlet, Navigate} from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';
import ForgotPassword from './Components/forgotPassword';
import ResetPassword from './Components/resetPassword';

const AuthPage = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='forgot' element={<ForgotPassword />} />
      <Route path='reset/:token' element={<ResetPassword />} />
      <Route index element={<Login />} />
      {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
    </Route>
  </Routes>
)

export default AuthPage;
