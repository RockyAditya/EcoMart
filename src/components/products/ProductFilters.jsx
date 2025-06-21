import React from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

const ProductFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  ecoRating,
  setEcoRating
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-green-200 mt-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map(category => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  {category.name} ({category.count})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </h3>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={200}
            min={0}
            step={5}
            className="w-full"
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-3">
            Eco Rating: {ecoRating[0]} - {ecoRating[1]} stars
          </h3>
          <Slider
            value={ecoRating}
            onValueChange={setEcoRating}
            max={5}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFilters;