import React, { useState } from 'react';
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

const AdminProductManagement = ({ productsData, setProductsData, searchTerm, loadData }) => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    ecoRating: 5,
    images: ['https://images.unsplash.com/photo-1679590988942-82d1575a83ae'],
    tags: []
  });

  const handleOpenAddModal = () => {
    setProductForm({ name: '', price: '', category: '', description: '', ecoRating: 5, images: ['https://images.unsplash.com/photo-1679590988942-82d1575a83ae'], tags: [] });
    setCurrentProduct(null);
    setIsAddProductOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setCurrentProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description || '',
      ecoRating: product.ecoRating || 5,
      images: product.images || ['https://images.unsplash.com/photo-1679590988942-82d1575a83ae'],
      tags: product.tags || []
    });
    setIsEditProductOpen(true);
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProductTagsChange = (e) => {
    setProductForm(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }));
  };

  const handleSaveProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.category) {
      toast({ title: "Error", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    const productPayload = {
      ...productForm,
      price: parseFloat(productForm.price),
      ecoRating: parseInt(productForm.ecoRating),
    };

    let updatedProducts;
    if (currentProduct) { // Editing existing product
      updatedProducts = productsData.map(p => p.id === currentProduct.id ? { ...p, ...productPayload, id: currentProduct.id } : p);
      toast({ title: "Success!", description: "Product updated successfully." });
    } else { // Adding new product
      const newProduct = {
        ...productPayload,
        id: Date.now().toString(),
        rating: 4 + Math.random(), // Placeholder
        inStock: true // Placeholder
      };
      updatedProducts = [...productsData, newProduct];
      toast({ title: "Success!", description: "Product added successfully." });
    }
    
    setProductsData(updatedProducts);
    localStorage.setItem('ecoShopProducts', JSON.stringify(updatedProducts));
    setIsAddProductOpen(false);
    setIsEditProductOpen(false);
    setCurrentProduct(null);
    loadData(); // Reload stats and other data
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = productsData.filter(p => p.id !== productId);
    setProductsData(updatedProducts);
    localStorage.setItem('ecoShopProducts', JSON.stringify(updatedProducts));
    toast({ title: "Product deleted", description: "Product has been removed successfully." });
    loadData(); // Reload stats and other data
  };

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const ProductFormFields = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
      <div>
        <Label htmlFor="productName">Product Name</Label>
        <Input id="productName" name="name" value={productForm.name} onChange={handleProductFormChange} />
      </div>
      <div>
        <Label htmlFor="productPrice">Price</Label>
        <Input id="productPrice" name="price" type="number" step="0.01" value={productForm.price} onChange={handleProductFormChange} />
      </div>
      <div>
        <Label htmlFor="productCategory">Category</Label>
        <Input id="productCategory" name="category" value={productForm.category} onChange={handleProductFormChange} />
      </div>
      <div>
        <Label htmlFor="productDescription">Description</Label>
        <Input id="productDescription" name="description" value={productForm.description} onChange={handleProductFormChange} />
      </div>
      <div>
        <Label htmlFor="ecoRating">Eco Rating (1-5)</Label>
        <Input id="ecoRating" name="ecoRating" type="number" min="1" max="5" value={productForm.ecoRating} onChange={handleProductFormChange} />
      </div>
      <div>
        <Label htmlFor="productTags">Tags (comma-separated)</Label>
        <Input id="productTags" name="tags" value={productForm.tags.join(', ')} onChange={handleProductTagsChange} />
      </div>
      <Button onClick={handleSaveProduct} className="w-full eco-gradient text-white">
        {currentProduct ? 'Save Changes' : 'Add Product'}
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleOpenAddModal}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <ProductFormFields />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <ProductFormFields />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eco Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800">{product.ecoRating}/5</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleOpenEditModal(product)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProductManagement;