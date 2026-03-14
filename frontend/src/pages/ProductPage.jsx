import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProductBySlug, getProducts } from '../services/api';

// SVG icon components
const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
    </svg>
);

const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4-4-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 8-8 12Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 13V7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6" />
    </svg>
);

const BoltIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
    </svg>
);

const TruckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
);

const StarIcon = ({ filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-gray-200'}`}
        viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart, isInCart, getQuantityInCart, justAdded } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const data = await getProductBySlug(id);
                if (data && data.name) {
                    setProduct({ ...data, id: data._id || data.slug });
                } else {
                    setProduct(null);
                }
            } catch {
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();

        // Related products from DB
        getProducts()
            .then(data => {
                if (data && data.length > 0) {
                    const filtered = data.filter(p => (p._id || p.slug) !== id).slice(0, 4);
                    if (filtered.length > 0) {
                        setRelatedProducts(filtered.map(p => ({ ...p, id: p._id || p.slug })));
                    }
                }
            })
            .catch(() => { });

        window.scrollTo(0, 0);
        setActiveImageIndex(0);
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 animate-pulse">
                    <div className="lg:w-1/2 bg-gray-100 aspect-square rounded-3xl" />
                    <div className="lg:w-1/2 space-y-4 pt-4">
                        <div className="bg-gray-100 h-4 w-20 rounded" />
                        <div className="bg-gray-100 h-8 w-3/4 rounded" />
                        <div className="bg-gray-100 h-5 w-32 rounded" />
                        <div className="bg-gray-100 h-8 w-24 rounded" />
                        <div className="bg-gray-100 h-24 w-full rounded-xl" />
                        <div className="bg-gray-100 h-12 w-full rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
                <SearchIcon />
                <h1 className="font-display text-2xl text-[#1a1a1a] mb-3">Product Not Found</h1>
                <p className="text-gray-400 text-sm mb-6">This product may have been removed or doesn't exist.</p>
                <Link to="/" className="text-sm text-[#d4912a] font-semibold hover:underline">
                    &larr; Back to Menu
                </Link>
            </div>
        );
    }

    const pid = product._id || product.id;
    const inCart = isInCart(pid);
    const qtyInCart = getQuantityInCart(pid);
    const wasJustAdded = justAdded === pid;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1);
    };

    return (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            {/* Breadcrumb */}
            <nav className="mb-8 text-xs text-gray-400 flex items-center gap-1.5">
                <Link to="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
                <span>/</span>
                <span className="text-[#1a1a1a] font-medium">{product.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                {/* Image Gallery + Video */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:w-1/2 flex-shrink-0"
                >
                    {(() => {
                        const allImages = [product.image, ...(product.images || [])].filter(Boolean);
                        const hasMultiple = allImages.length > 1;
                        const isYouTube = (url) => /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)/.test(url);
                        const getYouTubeId = (url) => {
                            const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                            return m ? m[1] : null;
                        };

                        return (
                            <>
                                {/* Main image with arrows */}
                                <div className="relative overflow-hidden rounded-3xl bg-gray-50 group">
                                    <img
                                        src={allImages[activeImageIndex] || product.image}
                                        alt={`${product.name} - Image ${activeImageIndex + 1}`}
                                        className="w-full aspect-square object-cover transition-opacity duration-300"
                                    />
                                    {product.isVegan && (
                                        <span className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                                            </svg>
                                            Vegan
                                        </span>
                                    )}
                                    {hasMultiple && (
                                        <>
                                            <button
                                                onClick={() => setActiveImageIndex(i => (i - 1 + allImages.length) % allImages.length)}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                                            </button>
                                            <button
                                                onClick={() => setActiveImageIndex(i => (i + 1) % allImages.length)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                                            </button>
                                            <span className="absolute bottom-4 right-4 bg-black/60 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                                {activeImageIndex + 1} / {allImages.length}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Thumbnail strip */}
                                {hasMultiple && (
                                    <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                                        {allImages.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveImageIndex(i)}
                                                className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImageIndex === i ? 'border-[#d4912a] ring-2 ring-[#d4912a]/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                            >
                                                <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Video section */}
                                {product.video && (
                                    <div className="mt-4">
                                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-2 flex items-center gap-1.5">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                            Product Video
                                        </p>
                                        <div className="rounded-2xl overflow-hidden bg-black">
                                            {isYouTube(product.video) ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${getYouTubeId(product.video)}`}
                                                    className="w-full aspect-video"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title={`${product.name} video`}
                                                />
                                            ) : (
                                                <video
                                                    src={product.video}
                                                    controls
                                                    className="w-full aspect-video"
                                                    preload="metadata"
                                                    playsInline
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </motion.div>

                {/* Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:w-1/2"
                >
                    {/* Category */}
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4912a] mb-2">
                        {product.category || 'Salad'}
                    </p>

                    {/* Name */}
                    <h1 className="font-display text-3xl sm:text-4xl text-[#1a1a1a] mb-3">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <StarIcon key={star} filled={star <= Math.round(Number(product.rating))} />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500 font-medium">{product.rating}</span>
                        </div>
                    )}

                    {/* Price */}
                    <p className="text-3xl font-black text-[#1a1a1a] mb-6">
                        ₹{product.price.toFixed(2)}
                    </p>

                    {/* Description */}
                    <div className="text-sm text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                        {product.longDescription || product.description}
                    </div>

                    {/* Nutrition Info Cards */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {product.proteinPer100g && (
                            <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
                                <FireIcon />
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 leading-none">Protein / 100g</p>
                                    <p className="font-bold text-sm text-[#1a1a1a] mt-0.5">{product.proteinPer100g}g</p>
                                </div>
                            </div>
                        )}
                        {product.fiberPer100g && (
                            <div className="flex items-center gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                                <FireIcon />
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 leading-none">Fiber / 100g</p>
                                    <p className="font-bold text-sm text-[#1a1a1a] mt-0.5">{product.fiberPer100g}g</p>
                                </div>
                            </div>
                        )}
                        {product.isVegan && (
                            <div className="flex items-center gap-2.5 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                                <LeafIcon />
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 leading-none">Diet</p>
                                    <p className="font-bold text-sm text-green-700 mt-0.5">Vegan</p>
                                </div>
                            </div>
                        )}
                        {product.tags && product.tags.some(t => t.toLowerCase().includes('protein')) && (
                            <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                                <BoltIcon />
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 leading-none">Protein</p>
                                    <p className="font-bold text-sm text-blue-700 mt-0.5">
                                        {product.tags.find(t => t.toLowerCase().includes('protein')) || 'High'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Ingredients */}
                    {product.ingredients && product.ingredients.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">Ingredients</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.ingredients.map((ing, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-medium bg-[#faf8f5] text-gray-600 border border-[#e8e3dc] px-3 py-1.5 rounded-lg"
                                    >
                                        {ing}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity + Add to Cart */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light"
                            >
                                &minus;
                            </button>
                            <span className="w-11 h-11 flex items-center justify-center font-bold text-[#1a1a1a] text-sm border-x border-gray-200">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="w-11 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-lg font-light"
                            >
                                +
                            </button>
                        </div>
                        <motion.button
                            onClick={handleAddToCart}
                            whileTap={{ scale: 0.97 }}
                            className={`flex-1 flex items-center justify-center gap-2 font-bold text-sm uppercase tracking-wider py-3.5 rounded-2xl transition-all duration-300 ${wasJustAdded
                                ? 'bg-green-600 text-white'
                                : 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                                }`}
                        >
                            {wasJustAdded ? (
                                <><CheckIcon /> Added to Cart</>
                            ) : (
                                <><CartIcon /> Add to Cart &mdash; ₹{(product.price * quantity).toFixed(2)}</>
                            )}
                        </motion.button>
                    </div>

                    {/* In-cart notice */}
                    {inCart && !wasJustAdded && (
                        <div className="flex items-center justify-between bg-[#faf8f5] border border-[#e8e3dc] rounded-xl px-4 py-3 mb-4">
                            <span className="text-sm text-gray-600">
                                Currently in cart: <strong className="text-[#1a1a1a]">{qtyInCart}</strong>
                            </span>
                            <Link to="/cart" className="text-xs font-bold text-[#d4912a] hover:underline">
                                View Cart &rarr;
                            </Link>
                        </div>
                    )}

                    {/* Quick Info */}
                    <div className="border-t border-gray-100 pt-6 mt-6 space-y-3.5">
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <TruckIcon />
                            <span>Free delivery in Malad East · Goregaon East: ₹20 (free above ₹1,000)</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <ClockIcon />
                            <span>Delivery within 24 hours of order</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <SparklesIcon />
                            <span>Freshly prepared with premium ingredients</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="mt-16 sm:mt-24">
                    <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a] mb-8">
                        You May Also <em className="italic">Like</em>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5">
                        {relatedProducts.map(p => {
                            const rpid = p._id || p.id || p.slug;
                            return (
                                <Link to={`/product/${rpid}`} key={rpid} className="group">
                                    <div className="relative overflow-hidden mb-3 bg-gray-50 rounded-xl">
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            loading="lazy"
                                            className="w-full aspect-[4/5] object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-navy-900 text-[15px] group-hover:text-[#d4912a] transition-colors">
                                        {p.name}
                                    </h3>
                                    <p className="text-sm text-gray-400 mt-0.5">{p.description}</p>
                                    <p className="font-bold text-[15px] text-navy-900 mt-1.5">₹{p.price.toFixed(2)}</p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductPage;
