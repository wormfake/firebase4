import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Dashboard - UID:', currentUser.uid);
        console.log('Dashboard - JID:', `${currentUser.uid}@app.nextplus.me`);
        console.log("Dashboard - User:", currentUser.displayName, currentUser.email);
        setUser(currentUser);
      } else {
        // Redirect to login if not authenticated
        window.location.href = '/';
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("✅ Logged out successfully");
      window.location.href = '/';
    } catch (error) {
      console.error("❌ Logout failed:", error.message);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <h2>Redirecting to login...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Thông tin người dùng:</h2>
        <p><strong>Tên:</strong> {user.displayName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>UID:</strong> {user.uid}</p>
        <p><strong>JID:</strong> {user.uid}@app.nextplus.me</p>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <h3>🎉 Đăng nhập thành công!</h3>
        <p>Automation có thể phát hiện JID từ console logs.</p>
      </div>
    </div>
  );
};

export default Dashboard;