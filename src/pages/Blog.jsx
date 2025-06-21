
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Leaf, Recycle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Simple Ways to Reduce Your Carbon Footprint Today",
      excerpt: "Discover practical and easy steps you can take right now to live more sustainably and help protect our planet for future generations.",
      author: "Sarah Green",
      date: "2024-01-15",
      category: "Sustainability Tips",
      readTime: "5 min read",
      featured: true
    },
    {
      id: 2,
      title: "The Complete Guide to Zero Waste Living",
      excerpt: "Learn how to minimize waste in your daily life with our comprehensive guide to zero waste principles and practices.",
      author: "Mike Earth",
      date: "2024-01-12",
      category: "Zero Waste",
      readTime: "8 min read",
      featured: false
    },
    {
      id: 3,
      title: "Sustainable Fashion: Building an Eco-Friendly Wardrobe",
      excerpt: "Transform your closet with sustainable fashion choices that look great and help reduce environmental impact.",
      author: "Emma Style",
      date: "2024-01-10",
      category: "Fashion",
      readTime: "6 min read",
      featured: false
    },
    {
      id: 4,
      title: "Renewable Energy at Home: Solar Power Basics",
      excerpt: "Everything you need to know about installing solar panels and transitioning to renewable energy at home.",
      author: "David Solar",
      date: "2024-01-08",
      category: "Energy",
      readTime: "10 min read",
      featured: false
    },
    {
      id: 5,
      title: "Organic Gardening: Growing Your Own Food Sustainably",
      excerpt: "Start your journey to self-sufficiency with organic gardening techniques that work for any space.",
      author: "Lisa Garden",
      date: "2024-01-05",
      category: "Gardening",
      readTime: "7 min read",
      featured: false
    },
    {
      id: 6,
      title: "Plastic-Free Kitchen: Essential Swaps for Eco-Living",
      excerpt: "Transform your kitchen into a plastic-free zone with these simple and effective product swaps.",
      author: "Tom Clean",
      date: "2024-01-03",
      category: "Home & Kitchen",
      readTime: "4 min read",
      featured: false
    }
  ];

  const categories = [
    { name: "All", icon: Globe, count: blogPosts.length },
    { name: "Sustainability Tips", icon: Leaf, count: 2 },
    { name: "Zero Waste", icon: Recycle, count: 1 },
    { name: "Fashion", icon: Leaf, count: 1 },
    { name: "Energy", icon: Globe, count: 1 },
    { name: "Gardening", icon: Leaf, count: 1 }
  ];

  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sustainable Living Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover tips, guides, and inspiration for living a more sustainable and eco-friendly lifestyle
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((category, index) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center gap-2 ${
                selectedCategory === category.name 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'hover:bg-green-50'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.name}
              <Badge variant="secondary" className="ml-1">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {selectedCategory === "All" && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto">
                  <img  
                    className="w-full h-full object-cover"
                    alt={featuredPost.title}
                   src="https://images.unsplash.com/photo-1616791151653-a84311a1ae75" />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-green-100 text-green-800">
                    Featured Post
                  </Badge>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button className="w-fit bg-green-600 hover:bg-green-700">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === "All" ? regularPosts : filteredPosts).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img  
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={post.title}
                   src="https://images.unsplash.com/photo-1575741767874-e4475fa34d71" />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Stay Updated with Sustainable Living Tips
              </h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Get the latest eco-friendly tips, product recommendations, and sustainability guides delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
                <Button className="bg-white text-green-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
