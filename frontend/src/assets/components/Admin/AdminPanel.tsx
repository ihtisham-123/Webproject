import  { useState } from 'react';
import AdminLogin from './AdminLogin';
import SearchOrders from './SearchOrders';
import Users from './Users';


const AdminPanel = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div>
      {token ? (
        
        <>
        <SearchOrders  />
        <Users />
        </>
      ) : (
        <AdminLogin setToken={setToken} />
      )}
    </div>
  );
};

export default AdminPanel;