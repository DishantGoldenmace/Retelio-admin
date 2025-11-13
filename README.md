# StockMate Marketplace - Admin Dashboard

Comprehensive React.js administrative dashboard for managing all aspects of the StockMate marketplace platform.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## 🛠️ Tech Stack

- **React.js 18+** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Professional admin components
- **React Router v6** - Advanced routing with nested layouts
- **React Query (TanStack Query)** - Server state management
- **Recharts** - Data visualization and analytics charts
- **React Hook Form** - Advanced form handling and validation
- **Zustand** - Lightweight state management
- **Socket.io Client** - Real-time updates and notifications
- **Date-fns** - Date manipulation and formatting
- **React DnD** - Drag and drop functionality
- **React Virtualized** - Performance optimization for large lists



## ⚙️ Configuration

### Environment Variables (.env.local)

```env
# API Configuration
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SOCKET_URL=http://localhost:3001

# Admin Configuration
REACT_APP_ADMIN_NAME=StockMate Admin
REACT_APP_VERSION=1.0.0
REACT_APP_SUPPORT_EMAIL=admin-support@stockmate.com

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_EXPORT=true
REACT_APP_ENABLE_NOTIFICATIONS=true

# External Services
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_SENTRY_DSN=your-sentry-dsn

# UI Configuration
REACT_APP_DEFAULT_THEME=light
REACT_APP_ITEMS_PER_PAGE=25
```

## 🎨 UI Design System

### Material-UI Theme Configuration

```typescript
// styles/theme.ts
import { createTheme } from '@mui/material/styles';

export const adminTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
        },
      },
    },
  },
});
```

### Dashboard Layout

```tsx
// components/layout/Layout.tsx
import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { adminTheme } from '../../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header 
          sidebarOpen={sidebarOpen} 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
        <Sidebar open={sidebarOpen} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            ml: sidebarOpen ? '240px' : '60px',
            transition: 'margin 0.3s',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
```

## 📊 Dashboard Features

### Key Performance Indicators

```tsx
// components/dashboard/StatsCards.tsx
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp, People, ShoppingCart, AttachMoney } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../../services/analytics.service';

export const StatsCards: React.FC = () => {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const cards = [
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue?.toLocaleString() || '0'}`,
      icon: AttachMoney,
      color: '#4caf50',
      change: `+${stats?.revenueGrowth || 0}%`,
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders?.toLocaleString() || '0',
      icon: ShoppingCart,
      color: '#2196f3',
      change: `+${stats?.orderGrowth || 0}%`,
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers?.toLocaleString() || '0',
      icon: People,
      color: '#ff9800',
      change: `+${stats?.userGrowth || 0}%`,
    },
    {
      title: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: TrendingUp,
      color: '#9c27b0',
      change: `+${stats?.conversionGrowth || 0}%`,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    {card.title}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {card.value}
                  </Typography>
                  <Typography variant="body2" style={{ color: card.color }}>
                    {card.change} from last month
                  </Typography>
                </Box>
                <card.icon style={{ fontSize: 40, color: card.color }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
```

### Data Table Component

```tsx
// components/common/DataTable.tsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: { label: string; onClick: (row: any) => void }[];
  onRowClick?: (row: any) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  actions,
  onRowClick,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, row: any) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleActionClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              {actions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format ? column.format(row[column.id]) : row[column.id]}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell align="center">
                      <IconButton onClick={(e) => handleActionClick(e, row)}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {actions && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleActionClose}
        >
          {actions.map((action, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                action.onClick(selectedRow);
                handleActionClose();
              }}
            >
              {action.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Paper>
  );
};
```

## 🔐 Permission System

### Role-Based Access Control

```typescript
// utils/permissions.ts
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  SUPPORT = 'support',
}

export enum Permission {
  // User management
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
  
  // Product management
  VIEW_PRODUCTS = 'view_products',
  CREATE_PRODUCTS = 'create_products',
  EDIT_PRODUCTS = 'edit_products',
  DELETE_PRODUCTS = 'delete_products',
  
  // Order management
  VIEW_ORDERS = 'view_orders',
  EDIT_ORDERS = 'edit_orders',
  CANCEL_ORDERS = 'cancel_orders',
  
  // Analytics
  VIEW_ANALYTICS = 'view_analytics',
  EXPORT_DATA = 'export_data',
  
  // Settings
  MANAGE_SETTINGS = 'manage_settings',
}

export const rolePermissions: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission),
  [UserRole.ADMIN]: [
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.EDIT_USERS,
    Permission.VIEW_PRODUCTS,
    Permission.CREATE_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.VIEW_ORDERS,
    Permission.EDIT_ORDERS,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
  ],
  [UserRole.MANAGER]: [
    Permission.VIEW_USERS,
    Permission.VIEW_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.VIEW_ORDERS,
    Permission.EDIT_ORDERS,
    Permission.VIEW_ANALYTICS,
  ],
  [UserRole.SUPPORT]: [
    Permission.VIEW_USERS,
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_ORDERS,
    Permission.EDIT_ORDERS,
  ],
};

export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return rolePermissions[userRole]?.includes(permission) || false;
};
```

### Permission Hook

```typescript
// hooks/usePermissions.ts
import { useAuthStore } from '../store/authStore';
import { hasPermission, Permission } from '../utils/permissions';

export const usePermissions = () => {
  const { user } = useAuthStore();

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user.role, permission);
  };

  const requirePermission = (permission: Permission): void => {
    if (!checkPermission(permission)) {
      throw new Error(`Access denied. Required permission: ${permission}`);
    }
  };

  return {
    can: checkPermission,
    require: requirePermission,
    user,
  };
};
```

## 🔄 Real-time Updates

### Socket.io Integration

```typescript
// hooks/useRealtime.ts
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';
import { useNotifications } from './useNotifications';

let socket: Socket | null = null;

export const useRealtime = () => {
  const { token } = useAuthStore();
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (token && !socket) {
      socket = io(process.env.REACT_APP_SOCKET_URL!, {
        auth: { token },
        transports: ['websocket'],
      });

      // Listen for real-time events
      socket.on('new-order', (order) => {
        addNotification({
          type: 'info',
          title: 'New Order',
          message: `Order #${order.orderNumber} received`,
        });
      });

      socket.on('order-updated', (update) => {
        addNotification({
          type: 'success',
          title: 'Order Updated',
          message: `Order #${update.orderNumber} status changed to ${update.status}`,
        });
      });

      socket.on('low-stock-alert', (product) => {
        addNotification({
          type: 'warning',
          title: 'Low Stock Alert',
          message: `${product.name} is running low (${product.stock} remaining)`,
        });
      });

      socket.on('user-registered', (user) => {
        addNotification({
          type: 'info',
          title: 'New User',
          message: `${user.firstName} ${user.lastName} just registered`,
        });
      });
    }

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [token, addNotification]);

  return { socket };
};
```

## 📈 Analytics and Reporting

### Sales Analytics Component

```tsx
// components/dashboard/SalesChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardContent, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getSalesAnalytics } from '../../services/analytics.service';

export const SalesChart: React.FC = () => {
  const [period, setPeriod] = React.useState('7d');
  const [chartType, setChartType] = React.useState('line');

  const { data: salesData } = useQuery({
    queryKey: ['sales-analytics', period],
    queryFn: () => getSalesAnalytics(period),
  });

  const Chart = chartType === 'line' ? LineChart : BarChart;
  const DataComponent = chartType === 'line' ? Line : Bar;

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            Sales Analytics
          </Typography>
          <Box>
            <ToggleButtonGroup
              value={period}
              exclusive
              onChange={(_, value) => value && setPeriod(value)}
              size="small"
            >
              <ToggleButton value="7d">7 Days</ToggleButton>
              <ToggleButton value="30d">30 Days</ToggleButton>
              <ToggleButton value="90d">90 Days</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={(_, value) => value && setChartType(value)}
              size="small"
              style={{ marginLeft: 8 }}
            >
              <ToggleButton value="line">Line</ToggleButton>
              <ToggleButton value="bar">Bar</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height={400}>
          <Chart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
            <DataComponent
              type="monotone"
              dataKey="sales"
              {...(chartType === 'line' ? { stroke: '#8884d8' } : { fill: '#8884d8' })}
            />
          </Chart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
```

## 🧪 Testing

### Component Testing

```typescript
// components/__tests__/StatsCards.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatsCards } from '../dashboard/StatsCards';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

describe('StatsCards', () => {
  it('renders stats cards correctly', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <StatsCards />
      </QueryClientProvider>
    );

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
  });
});
```

## 🚀 Development Scripts

```bash
# Development
npm start              # Start development server (port 3002)
npm run dev            # Alias for start

# Building
npm run build          # Build for production
npm run build:analyze  # Build with bundle analyzer

# Testing
npm test               # Run tests
npm run test:coverage  # Run tests with coverage
npm run test:e2e       # Run end-to-end tests

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format code with Prettier
npm run type-check     # Run TypeScript compiler check

# Utilities
npm run generate       # Generate component boilerplate
npm run storybook      # Start Storybook for component development
```

## 📱 Responsive Design

### Breakpoint System

```typescript
// utils/breakpoints.ts
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowSize < breakpoints.md,
    isTablet: windowSize >= breakpoints.md && windowSize < breakpoints.lg,
    isDesktop: windowSize >= breakpoints.lg,
    windowSize,
  };
};
```

## 🔧 Performance Optimization

### Virtual Scrolling for Large Lists

```tsx
// components/common/VirtualTable.tsx
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { TableCell, TableRow } from '@mui/material';

interface VirtualTableProps {
  items: any[];
  itemHeight: number;
  height: number;
  columns: any[];
}

export const VirtualTable: React.FC<VirtualTableProps> = ({
  items,
  itemHeight,
  height,
  columns,
}) => {
  const Row = ({ index, style }: any) => (
    <div style={style}>
      <TableRow>
        {columns.map((column, colIndex) => (
          <TableCell key={colIndex}>
            {column.render ? column.render(items[index]) : items[index][column.key]}
          </TableCell>
        ))}
      </TableRow>
    </div>
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      itemData={items}
    >
      {Row}
    </List>
  );
};
```

## 📦 Build and Deployment

### Production Build Configuration

```bash
# Build for production
npm run build

# Analyze bundle size
npm run build:analyze

# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

### Environment-Specific Builds

```typescript
// utils/config.ts
export const config = {
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  socketUrl: process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001',
  environment: process.env.NODE_ENV || 'development',
  version: process.env.REACT_APP_VERSION || '1.0.0',
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    export: process.env.REACT_APP_ENABLE_EXPORT === 'true',
    notifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  },
};
```

## 🐛 Error Handling

### Global Error Boundary

```tsx
// components/common/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, Button, Container, Typography } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" style={{ marginTop: 100 }}>
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" gutterBottom>
              {this.state.error?.message || 'An unexpected error occurred'}
            </Typography>
            <Button variant="contained" onClick={this.handleReload}>
              Reload Page
            </Button>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}
```

---

## 🤝 Contributing

Follow the project's contributing guidelines and maintain code quality standards.

### Admin-Specific Guidelines

- Use Material-UI components consistently
- Implement proper permission checks
- Follow accessibility best practices
- Optimize for performance with large datasets
- Test all administrative workflows

---

**For questions and support, refer to the main project documentation.**