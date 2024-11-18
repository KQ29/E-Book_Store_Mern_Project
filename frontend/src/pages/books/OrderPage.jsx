// components/OrderPage.jsx

import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi';
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-red-500">Error retrieving orders</div>
      </div>
    );

  return (
    <div className="bg-gray-100 py-16 min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="text-gray-600 text-center">No orders found!</div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">
                    Order #{index + 1}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">Order ID:</span> {order._id}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Name:</span> {order.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {order.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span> {order.phone}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Total Price:</span> $
                      {order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium mb-1">Address:</p>
                    <p className="text-gray-700">{order.address.street}</p>
                    <p className="text-gray-700">
                      {order.address.city}, {order.address.state} {order.address.zipcode}
                    </p>
                    <p className="text-gray-700">{order.address.country}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-medium mb-2">Products:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {order.productIds.map((product) => (
                      <li key={product._id} className="text-gray-700">
                        {product.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
