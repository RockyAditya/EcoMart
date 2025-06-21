
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); 

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        setLoading(true);
        // In a real Supabase setup, you'd fetch cart items for the user
        // For now, we'll keep using localStorage but clear it on user change
        // to simulate user-specific carts.
        const savedCart = localStorage.getItem(`ecoShopCart_${user.id}`);
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        } else {
          setItems([]);
        }
        setLoading(false);
      } else {
        // No user, clear cart or load guest cart if implemented
        setItems([]); 
      }
    };
    loadCart();
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`ecoShopCart_${user.id}`, JSON.stringify(items));
    } else {
      // If no user, perhaps save to a generic guest cart or do nothing
      localStorage.removeItem('ecoShopCart_guest'); // Example
    }
  }, [items, user]);

  const addToCart = (product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({
          title: "Cart updated!",
          description: `${product.name} quantity increased.`,
        });
        return updatedItems;
      } else {
        toast({
          title: "Added to cart!",
          description: `${product.name} has been added to your cart.`,
        });
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        toast({
          title: "Item removed",
          description: `${item.name} has been removed from your cart.`,
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    loadingCart: loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
