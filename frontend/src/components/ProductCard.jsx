import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, isInCart, justAdded } = useCart();
    const pid = product._id || product.id;
    const inCart = isInCart(pid);
    const wasJustAdded = justAdded === pid;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <div className="group">
            {/* Image Container */}
            <div className="relative overflow-hidden mb-3 bg-gray-50 rounded-xl">
                <Link to={`/product/${pid}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full aspect-[4/5] object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                    />
                </Link>
                {product.badge && (
                    <span
                        className={`absolute top-3 left-3 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md ${product.badgeColor === 'orange'
                                ? 'bg-orange-500'
                                : 'bg-olive-600'
                            }`}
                    >
                        {product.badge}
                    </span>
                )}

                {/* Add to Cart button — slides up on hover */}
                <motion.button
                    onClick={handleAddToCart}
                    whileTap={{ scale: 0.95 }}
                    className={`absolute bottom-0 left-0 right-0 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ease-out
                        ${wasJustAdded
                            ? 'bg-green-500 text-white translate-y-0'
                            : inCart
                                ? 'bg-[#1a1a1a] text-white translate-y-0'
                                : 'bg-[#1a1a1a]/90 text-white translate-y-full group-hover:translate-y-0'
                        } backdrop-blur-sm`}
                >
                    {wasJustAdded ? '✓ Added!' : inCart ? '+ Add More' : 'Add to Cart'}
                </motion.button>
            </div>

            {/* Info */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <Link to={`/product/${pid}`}>
                        <h3 className="font-semibold text-navy-900 text-[15px] leading-tight hover:text-[#d4912a] transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    {product.description && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.description}</p>
                    )}
                    <p className="text-navy-900 font-bold text-[15px] mt-1.5">
                        {product.sizes && product.sizes.length > 0
                            ? <>from ₹{Math.min(...product.sizes.map(s => s.price)).toFixed(2)}</>
                            : <>₹{product.price.toFixed(2)}</>
                        }
                    </p>
                </div>
                {product.rating && (
                    <div className="flex items-center gap-1 text-sm shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-gray-500 text-xs font-medium">{product.rating}</span>
                    </div>
                )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
            {/* Ingredients as tags (from API) */}
            {!product.tags && product.ingredients && product.ingredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {product.protein && (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">
                            {product.protein} PROTEIN
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductCard;
