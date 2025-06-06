import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import Instrumento from '../models/Instrumento';

interface CartContextType {
  cart: Instrumento[];
  addCarrito: (product: Instrumento) => void;
  removeCarrito: (product: Instrumento) => void;
  removeItemCarrito: (product: Instrumento) => void;
  limpiarCarrito: () => void;
}

export const CartContext = createContext<CartContextType>({
  cart: [],
  addCarrito: () => {},
  removeCarrito: () => {},
  removeItemCarrito: () => {},
  limpiarCarrito: () => {}
});

export function CarritoContextProvider({ children }: { children: ReactNode }) {

  const [cart, setCart] = useState<Instrumento[]>([]);

  const addCarrito = (product: Instrumento) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const nuevoCart = cart.map(item =>
        item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCart(nuevoCart);
    } else {
      setCart(prev => [...prev, { ...product, cantidad: 1 }]);
    }
  };

  const removeItemCarrito = (product: Instrumento) => {
    const index = cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      const item = cart[index];
      if (item.cantidad > 1) {
        const nuevoCart = cart.map(i =>
          i.id === product.id ? { ...i, cantidad: i.cantidad - 1 } : i
        );
        setCart(nuevoCart);
      } else {
        setCart(cart.filter(item => item.id !== product.id));
      }
    }
  };

  const removeCarrito = (product: Instrumento) => {
    setCart(prev => prev.filter(item => item.id !== product.id));
  };

  const limpiarCarrito = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addCarrito, limpiarCarrito, removeCarrito, removeItemCarrito }}>
      {children}
    </CartContext.Provider>
  );
}
