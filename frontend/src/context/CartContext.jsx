import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};

// Helper to get consistent product ID (works with both MongoDB _id and slug-based id)
const getProductId = (product) => product._id || product.id;

// Composite cart key: productId + selectedSize (so each size is a separate entry)
const getCartKey = (product) => {
    const pid = getProductId(product);
    const size = product.selectedSize || '';
    return size ? `${pid}|${size}` : pid;
};

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
        const cartKey = getCartKey(product);
        setCartItems(prev => {
            const existing = prev.find(item => getCartKey(item) === cartKey);
            if (existing) {
                return prev.map(item =>
                    getCartKey(item) === cartKey
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, cartKey }];
        });
        // Show "Added!" feedback
        setJustAdded(cartKey);
        setTimeout(() => setJustAdded(null), 1500);
    };

    // cartKey can be a composite "productId|size" key or a plain productId
    const removeFromCart = (cartKey) => {
        setCartItems(prev => prev.filter(item => getCartKey(item) !== cartKey));
    };

    const updateQuantity = (cartKey, quantity) => {
        if (quantity <= 0) {
            removeFromCart(cartKey);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                getCartKey(item) === cartKey ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    // isInCart / getQuantityInCart accept a plain productId (matches any size of that product)
    const isInCart = (productId) => cartItems.some(item => getProductId(item) === productId);
    const getQuantityInCart = (productId) => {
        return cartItems
            .filter(item => getProductId(item) === productId)
            .reduce((sum, item) => sum + item.quantity, 0);
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    // Expose getCartKey so CartPage can use the composite key for removeFromCart/updateQuantity
    const getItemCartKey = (item) => getCartKey(item);

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
                getItemCartKey,
                justAdded,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
