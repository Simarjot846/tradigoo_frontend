// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from '@/lib/auth-context';
// import { toast } from 'sonner';

// interface CartContextType {
//   cartCount: number;
//   refreshCart: () => Promise<void>;
//   addToCart: (productId: string, quantity: number) => Promise<boolean>;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   const [cartCount, setCartCount] = useState(0);

//   // This will later call Spring Boot: GET /cart
//   const refreshCart = async () => {
//     if (!user) {
//       setCartCount(0);
//       return;
//     }

//     try {
//       console.log('refreshCart → will connect to backend later');
//       // Placeholder until backend is ready
//       setCartCount(0);
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//     }
//   };

//   // This will later call Spring Boot: POST /cart/add
//   const addToCart = async (productId: string, quantity: number) => {
//     if (!user) {
//       toast.error('Please login to add items to cart');
//       return false;
//     }

//     try {
//       console.log('addToCart →', productId, quantity);
//       toast.success('Added to cart (demo)');
//       await refreshCart();
//       return true;
//     } catch (error) {
//       toast.error('Failed to add item to cart');
//       console.error(error);
//       return false;
//     }
//   };

//   useEffect(() => {
//     refreshCart();
//   }, [user]);

//   return (
//     <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }



// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from '@/lib/auth-context';
// import { toast } from 'sonner';

// interface CartContextType {
//     cartCount: number;
//     refreshCart: () => Promise<void>;
//     addToCart: (productId: string, quantity: number) => Promise<boolean>;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export function CartProvider({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   const [cartCount, setCartCount] = useState(0);

//   // This will later call Spring Boot: GET /cart
//   const refreshCart = async () => {
//     if (!user) {
//       setCartCount(0);
//       return;
//     }

//     try {
//       console.log('refreshCart → will connect to backend later');
//       // Placeholder until backend is ready
//       setCartCount(0);
//     } catch (error) {
//       console.error('Error fetching cart count:', error);
//     }
//   };
//     const addToCart = async (productId: string, quantity: number) => {
//         if (!user) {
//             toast.error('Please login to add items to cart');
//             return false;
//         }
//         try {
//             const res = await fetch('/api/cart', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ product_id: productId, quantity }),
//             });

//             if (!res.ok) throw new Error('Failed to add to cart');

//             await refreshCart();
//             toast.success('Added to cart');
//             return true;
//         } catch (error) {
//             toast.error('Failed to add item to cart');
//             console.error(error);
//             return false;
//         }
//     };

//     useEffect(() => {
//         refreshCart();
//     }, [user]);

//     return (
//         <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
//             {children}
//         </CartContext.Provider>
//     );
// }

// export function useCart() {
//   const context = useContext(CartContext);
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// }



'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface CartContextType {
  cartCount: number;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<boolean>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  // 🔹 Refresh cart count (safe placeholder)
  const refreshCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartCount(0);
        return;
      }

      // TODO: replace with GET /cart/count
      console.log('refreshCart → backend pending');
      setCartCount(0);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  };

  // 🔹 Add to cart (Spring Boot)
  const addToCart = async (productId: string, quantity: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login to add items to cart');
      return false;
    }

    try {
      const res = await fetch('http://localhost:8080/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || 'Failed to add to cart');
      }

      await refreshCart();
      toast.success('Added to cart');
      return true;
    } catch (error) {
      console.error(error);
      toast.error('Failed to add item to cart');
      return false;
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, refreshCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
