// src/_mock/return.js

export const _returnRequests = [
  {
    id: 1,
    orderId: '#ORD-2024-001',
    amount: 299.99,
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      avatar: '/assets/avatar/avatar_1.jpg',
    },
    product: {
      name: 'MacBook Pro 13"',
      category: 'Electronics',
    },
    reason: 'Defective product',
    status: 'Pending',
    date: 'Jan 15, 2024',
  },
  {
    id: 2,
    orderId: '#ORD-2024-002',
    amount: 89.99,
    customer: {
      name: 'Mike Chen',
      email: 'mike@email.com',
      avatar: '/assets/avatar/avatar_2.jpg',
    },
    product: {
      name: 'Cotton T-Shirt',
      category: 'Clothing',
    },
    reason: 'Wrong size',
    status: 'Approved',
    date: 'Jan 14, 2024',
  },
  {
    id: 3,
    orderId: '#ORD-2024-003',
    amount: 149.99,
    customer: {
      name: 'Emma Wilson',
      email: 'emma@email.com',
      avatar: '/assets/avatar/avatar_3.jpg',
    },
    product: {
      name: 'Wireless Headphones',
      category: 'Electronics',
    },
    reason: 'Not as described',
    status: 'Rejected',
    date: 'Jan 13, 2024',
  },
];
