import {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef
} from 'react';
import authHelper from '../utils/AuthHelpers';
import { getAdminByToken, getUserBalance } from './helpers';
// import LayoutSplashScreen from 'Core/CommonElements/Loader';

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentAdmin: undefined,
  setCurrentAdmin: () => {},
  balance: '',
  setBalance: () => {},
  logout: () => {},
}

const AuthContext = createContext(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(authHelper.getToken());
  const [currentAdmin, setCurrentAdmin] = useState(undefined);
  const [balance, setBalance] = useState('');
  const saveAuth = (auth) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.clearAppStorage();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentAdmin(undefined);
    setBalance('');
  }

  return (
    <AuthContext.Provider value={{auth, saveAuth, currentAdmin, setCurrentAdmin, balance, setBalance, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit = ({children}) => {
  const didRequest = useRef(false);
  const {auth, logout, setCurrentAdmin, setBalance} = useAuth();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestAdmin = async (accessToken) => {
      try {
        if (!didRequest.current) {

          const adminData = await getAdminByToken(accessToken);
          if (adminData) {
            setCurrentAdmin(adminData.details);
          }
          const balanceData = await getUserBalance();
          if (balanceData) {
            setBalance(balanceData.details);
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestAdmin(auth)
    } else {
      logout();
      setShowSplashScreen(false);
    }
  }, [])

  // return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
  return showSplashScreen ? 'Loading...' : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}