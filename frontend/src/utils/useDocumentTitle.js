import { useEffect } from 'react';

/**
 * Sets the document title for SEO.
 * @param {string} title - Page-specific title (appended with brand name)
 */
const useDocumentTitle = (title) => {
    useEffect(() => {
        const brandSuffix = ' | Pro.tein.bites';
        document.title = title ? `${title}${brandSuffix}` : 'Pro.tein.bites — Premium Protein Bowls | Healthy Food Delivery in Mumbai';
    }, [title]);
};

export default useDocumentTitle;
