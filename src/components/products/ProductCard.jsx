import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product, index, handleAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="h-full"
    >
      <Link to={`/products/${product.id}`} className="h-full flex flex-col">
        <Card className="eco-card hover-lift h-full overflow-hidden flex flex-col">
          <div className="relative">
            <img 
              alt={product.name}
              className="w-full h-48 object-cover"
             src="https://images.unsplash.com/photo-1646193186132-7976c1670e81" />
            <Badge className="absolute top-2 right-2 bg-green-500 text-white">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {product.ecoRating}
            </Badge>
            {product.originalPrice && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Sale
              </Badge>
            )}
          </div>
          <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {(product.tags || []).slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-green-600">
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
                className="eco-gradient text-white shrink-0"
                onClick={(e) => handleAddToCart(product, e)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;