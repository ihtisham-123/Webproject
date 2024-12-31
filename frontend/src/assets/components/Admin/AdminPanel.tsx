import  { useState } from 'react';
import AdminLogin from './AdminLogin';
import SearchOrders from './SearchOrders';

const AdminPanel = () => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <div>
      {token ? (
        <SearchOrders  />
      ) : (
        <AdminLogin setToken={setToken} />
      )}
    </div>
  );
};

export default AdminPanel;