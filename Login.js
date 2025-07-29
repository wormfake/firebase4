import React, { useEffect, useState } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const Login = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoLoginTriggered, setAutoLoginTriggered] = useState(false);

  // Auto-check authentication state and trigger login popup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('UID:', currentUser.uid);
        console.log('JID:', `${currentUser.uid}@app.nextplus.me`);
        console.log("✅ Logged in:", currentUser.displayName, currentUser.email);
        setUser(currentUser);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
        
        // Tự động trigger login popup nếu chưa đăng nhập và chưa thử
        if (!autoLoginTriggered) {
          setAutoLoginTriggered(true);
          setTimeout(() => {
            loginWithGoogle();
          }, 1000); // Đợi 1 giây để trang load xong
        }
      }
    });

    return () => unsubscribe();
  }, [autoLoginTriggered]);

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log('🚀 Tự động mở popup đăng nhập Google...');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log('UID:', user.uid);
      console.log('JID:', `${user.uid}@app.nextplus.me`);
      console.log("✅ Logged in:", user.displayName, user.email);
      
    } catch (error) {
      console.error("❌ Login failed:", error.message);
      setIsLoading(false);
      setAutoLoginTriggered(false); // Reset để có thể thử lại
    }
  };

  if (user) {
    return (
      <div>
        <h2>🎉 Đăng nhập thành công!</h2>
        <p><strong>Tên:</strong> {user.displayName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>JID:</strong> {user.uid}@app.nextplus.me</p>
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e8', border: '1px solid #4caf50', borderRadius: '5px' }}>
          <p><strong>✅ Automation đã capture JID thành công!</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Đăng nhập bằng Google</h2>
      {isLoading ? (
        <div>
          <p>🔄 Đang tự động mở popup đăng nhập Google...</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Popup sẽ xuất hiện trong giây lát. Nếu bị chặn popup, hãy cho phép popup cho trang này.
          </p>
        </div>
      ) : (
        <div>
          <p>❌ Đăng nhập không thành công hoặc bị hủy.</p>
          <button onClick={() => {
            setAutoLoginTriggered(false);
            setIsLoading(true);
            setTimeout(loginWithGoogle, 500);
          }}>
            Thử lại
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;