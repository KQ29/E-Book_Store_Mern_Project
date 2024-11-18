import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">Error getting orders data</div>
      </div>
    );

  return (
    <div className="bg-gray-100 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        <p className="text-gray-700 mb-8">
          Welcome, {currentUser?.name || 'User'}! Here are your recent orders:
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-6">
              {orders.map((order) => (
                <li
                  key={order._id}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-lg">
                      Order ID: {order._id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-700">
                    <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                  </p>
                  <div>
                    <h3 className="font-semibold mt-4">Products:</h3>
                    <ul className="list-disc list-inside">
                      {order.productIds.map((product) => (
                        <li key={product._id} className="text-gray-700">
                          {product.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no recent orders.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
