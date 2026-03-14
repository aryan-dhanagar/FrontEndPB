import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

// Helper to get consistent product ID (works with both MongoDB _id and slug-based id)
const getProductId = (product) => product._id || product.id;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [justAdded, setJustAdded] = useState(null); // For "Added!" feedback

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        const pid = getProductId(product);
        setCartItems(prev => {
            const existing = prev.find(item => getProductId(item) === pid);
            if (existing) {
                return prev.map(item =>
                    getProductId(item) === pid
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
        // Show "Added!" feedback
        setJustAdded(pid);
        setTimeout(() => setJustAdded(null), 1500);
    };

    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => getProductId(item) !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                getProductId(item) === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const isInCart = (productId) => cartItems.some(item => getProductId(item) === productId);
    const getQuantityInCart = (productId) => {
        const item = cartItems.find(item => getProductId(item) === productId);
        return item ? item.quantity : 0;
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                isInCart,
                getQuantityInCart,
                justAdded,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
