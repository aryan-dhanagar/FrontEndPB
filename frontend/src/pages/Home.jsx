import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import PackagingSection from '../components/PackagingSection';
import useDocumentTitle from '../utils/useDocumentTitle';

const Home = () => {
    useDocumentTitle('Premium Protein Bowls — Healthy Food Delivery in Mumbai');
    return (
        <>
            <HeroSection />
            <ProductGrid />
            <PackagingSection />
        </>
    );
};

export default Home;
