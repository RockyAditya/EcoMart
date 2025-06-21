import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProductListItem = ({ product, index, handleAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="eco-card hover-lift overflow-hidden">
          <div className="flex">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
              <img 
                alt={product.name}
                className="w-full h-full object-cover"
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
              <Badge className="absolute top-1 right-1 bg-green-500 text-white text-xs">
                <Star className="h-2 w-2 mr-1 fill-current" />
                {product.ecoRating}
              </Badge>
            </div>
            <CardContent className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {(product.tags || []).slice(0, 4).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto">
                <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                  <span className="text-xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="eco-gradient text-white self-start sm:self-auto"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductListItem;