import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal,
  Grid,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/products/ProductCard';
import ProductListItem from '@/components/products/ProductListItem';
import ProductFilters from '@/components/products/ProductFilters';
import { useCart } from '@/contexts/CartContext';
import { categories as allCategories } from '@/data/products';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0', 10),
    parseInt(searchParams.get('maxPrice') || '200', 10)
  ]);
  const [ecoRating, setEcoRating] = useState([
    parseInt(searchParams.get('minEco') || '1', 10),
    parseInt(searchParams.get('maxEco') || '5', 10)
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('ecoShopProducts') || '[]');
    setProducts(savedProducts);
  }, []);

  const updateSearchParams = useCallback(() => {
    const newParams = new URLSearchParams();
    if (searchTerm) newParams.set('search', searchTerm);
    if (selectedCategory !== 'all') newParams.set('category', selectedCategory);
    if (priceRange[0] !== 0) newParams.set('minPrice', priceRange[0].toString());
    if (priceRange[1] !== 200) newParams.set('maxPrice', priceRange[1].toString());
    if (ecoRating[0] !== 1) newParams.set('minEco', ecoRating[0].toString());
    if (ecoRating[1] !== 5) newParams.set('maxEco', ecoRating[1].toString());
    if (sortBy !== 'name') newParams.set('sort', sortBy);
    setSearchParams(newParams);
  }, [searchTerm, selectedCategory, priceRange, ecoRating, sortBy, setSearchParams]);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    filtered = filtered.filter(product => 
      product.ecoRating >= ecoRating[0] && product.ecoRating <= ecoRating[1]
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.ecoRating - a.ecoRating;
        case 'name': default: return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
    updateSearchParams();
  }, [products, searchTerm, selectedCategory, priceRange, ecoRating, sortBy, updateSearchParams]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([0, 200]);
    setEcoRating([1, 5]);
    setSortBy('name');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Eco-Friendly Products
          </h1>
          <p className="text-xl text-gray-600">
            Discover sustainable products that make a difference for our planet.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters {showFilters ? '(Hide)' : '(Show)'}
            </Button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Eco Rating</option>
            </select>

            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showFilters && (
            <ProductFilters
              categories={allCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              ecoRating={ecoRating}
              setEcoRating={setEcoRating}
            />
          )}
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredProducts.map((product, index) => 
              viewMode === 'grid' 
                ? <ProductCard key={product.id} product={product} index={index} handleAddToCart={handleAddToCart} />
                : <ProductListItem key={product.id} product={product} index={index} handleAddToCart={handleAddToCart} />
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
            <Button
              onClick={clearAllFilters}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;