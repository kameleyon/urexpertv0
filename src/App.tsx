import { useState, useEffect } from 'react';
import { LoginForm } from './components/login/form/LoginForm';
import { SignUpForm } from './components/login/form/SignUpForm';
import { LoginFeatures } from './components/login/features/LoginFeatures';
import { Logo } from './components/common/Logo';
import { useAuth } from './features/auth/context/AuthContext';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const { state: { isAuthenticated } } = useAuth();

  const toggleForm = () => setIsLogin(!isLogin);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Left side - Features */}
      <div className="hidden lg:block lg:w-1/2">
        <LoginFeatures />
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md mb-6">
          <Logo />
        </div>
        {isLogin ? (
          <LoginForm onSignUpClick={toggleForm} />
        ) : (
          <SignUpForm onSignInClick={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default App;