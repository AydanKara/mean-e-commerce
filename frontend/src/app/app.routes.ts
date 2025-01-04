import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './shared/layouts/layout/layout.component';
import { AdminGuard } from './guards/admin.guard';
import { orderConfirmGuard } from './guards/order-confirm.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard], // Protect admin routes
    loadComponent: () =>
      import('./shared/layouts/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent
      ),
    children: [
      {
        path: 'products/edit/:id',
        loadComponent: () =>
          import(
            './pages/admin/products/product-create/product-create.component'
          ).then((m) => m.ProductCreateComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/admin/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'product/create',
        loadComponent: () =>
          import(
            './pages/admin/products/product-create/product-create.component'
          ).then((m) => m.ProductCreateComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/admin/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'user-lists',
        loadComponent: () =>
          import('./pages/admin/users/users.component').then(
            (m) => m.UsersComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/admin/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'order-details/:id',
        loadComponent: () =>
          import(
            './pages/admin/orders/order-details/order-details.component'
          ).then((m) => m.OrderDetailsComponent),
      },
    ],
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'login',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },

      {
        path: 'register',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './pages/profile/account-welcome/account-welcome.component'
              ).then((m) => m.AccountWelcomeComponent),
          },
          {
            path: 'account-orders',
            loadComponent: () =>
              import(
                './pages/profile/account-orders/account-orders.component'
              ).then((m) => m.AccountOrdersComponent),
          },
          {
            path: 'order-details/:id',
            loadComponent: () =>
              import(
                './pages/profile/account-orders/order-details/order-details.component'
              ).then((m) => m.OrderDetailsComponent),
          },
          {
            path: 'account-wishlist',
            loadComponent: () =>
              import(
                './pages/profile/account-wishlist/account-wishlist.component'
              ).then((m) => m.AccountWishlistComponent),
          },
          {
            path: 'account-personal-info',
            loadComponent: () =>
              import(
                './pages/profile/account-personal-info/account-personal-info.component'
              ).then((m) => m.AccountPersonalInfoComponent),
          },
          {
            path: 'account-address',
            loadComponent: () =>
              import(
                './pages/profile/account-address/account-address.component'
              ).then((m) => m.AccountAddressComponent),
          },
          {
            path: 'account-payment',
            loadComponent: () =>
              import(
                './pages/profile/account-payment/account-payment.component'
              ).then((m) => m.AccountPaymentComponent),
          },
        ],
      },
      {
        path: 'shop',
        loadComponent: () =>
          import('./pages/shop/shop.component').then((m) => m.ShopComponent),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
      },
      {
        path: 'shopping-cart',
        loadComponent: () =>
          import('./pages/shopping-cart/shopping-cart.component').then(
            (m) => m.ShoppingCartComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'order-confirmation/:id',
        loadComponent: () =>
          import(
            './pages/order-confirmation/order-confirmation.component'
          ).then((m) => m.OrderConfirmationComponent),
        canActivate: [AuthGuard, orderConfirmGuard],
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./shared/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
      {
        path: 'server-error',
        loadComponent: () =>
          import('./shared/server-error/server-error.component').then(
            (m) => m.ServerErrorComponent
          ),
      },
      {
        path: '**', // Wildcard Route for 404
        redirectTo: 'not-found',
        pathMatch: 'full',
      },
    ],
  },
];
