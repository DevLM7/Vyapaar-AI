import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Mic, Plus, Search, Filter, Edit, Trash2, AlertTriangle, TrendingUp, Package, MicIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  lastUpdated: string;
  threshold: number;
}
const Inventory = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [voiceText, setVoiceText] = useState("");
  const [products, setProducts] = useState<Product[]>([{
    id: "1",
    name: "Maggi 2-Minute Noodles",
    price: 12,
    quantity: 45,
    category: "Food",
    lastUpdated: "2 hours ago",
    threshold: 10
  }, {
    id: "2",
    name: "Tata Tea Gold",
    price: 145,
    quantity: 8,
    category: "Beverages",
    lastUpdated: "1 day ago",
    threshold: 15
  }, {
    id: "3",
    name: "Amul Milk 1L",
    price: 56,
    quantity: 25,
    category: "Dairy",
    lastUpdated: "3 hours ago",
    threshold: 20
  }, {
    id: "4",
    name: "Parle-G Biscuits",
    price: 5,
    quantity: 3,
    category: "Snacks",
    lastUpdated: "1 hour ago",
    threshold: 10
  }, {
    id: "5",
    name: "Surf Excel Detergent",
    price: 89,
    quantity: 12,
    category: "Household",
    lastUpdated: "5 hours ago",
    threshold: 8
  }]);
  const handleVoiceInput = () => {
    setIsListening(true);
    setVoiceText("");

    // Simulate voice recognition
    const voiceResponses = ["Add 20 packets of Maggi noodles at 12 rupees each", "Stock 15 Tata Tea Gold at 145 rupees per pack", "Add 30 Parle-G biscuits at 5 rupees each", "Stock 25 Surf Excel detergent at 89 rupees per piece"];
    setTimeout(() => {
      const randomResponse = voiceResponses[Math.floor(Math.random() * voiceResponses.length)];
      setVoiceText(randomResponse);
    }, 1000);
    setTimeout(() => {
      setIsListening(false);
      // Process the voice command
      processVoiceCommand(voiceText || voiceResponses[0]);
    }, 3000);
  };
  const processVoiceCommand = (command: string) => {
    // Simple parser for demo purposes
    const match = command.match(/add (\d+) (.+?) at (\d+) rupees/i);
    if (match) {
      const [, quantity, productName, price] = match;

      // Check if product exists
      const existingProduct = products.find(p => p.name.toLowerCase().includes(productName.toLowerCase().split(' ')[0]));
      if (existingProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => p.id === existingProduct.id ? {
          ...p,
          quantity: p.quantity + parseInt(quantity),
          lastUpdated: "Just now"
        } : p));
        toast({
          title: "Stock Updated!",
          description: `Added ${quantity} units of ${existingProduct.name}`
        });
      } else {
        // Add new product
        const newProduct: Product = {
          id: Date.now().toString(),
          name: productName,
          price: parseInt(price),
          quantity: parseInt(quantity),
          category: "General",
          lastUpdated: "Just now",
          threshold: 10
        };
        setProducts(prev => [...prev, newProduct]);
        toast({
          title: "New Product Added!",
          description: `Added ${quantity} units of ${productName}`
        });
      }
    }
  };
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const lowStockProducts = products.filter(product => product.quantity <= product.threshold);
  const getStockStatus = (product: Product) => {
    if (product.quantity <= product.threshold) {
      return {
        status: "Low Stock",
        variant: "destructive" as const
      };
    } else if (product.quantity <= product.threshold * 1.5) {
      return {
        status: "Medium",
        variant: "secondary" as const
      };
    } else {
      return {
        status: "In Stock",
        variant: "default" as const
      };
    }
  };
  return <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white border-b border-border p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Inventory Management</h1>
                  <p className="text-muted-foreground">Manage your stock with AI-powered voice commands</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary-muted text-primary">
                  {products.length} Products
                </Badge>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Voice Input Card */}
            <Card className={`${isListening ? 'border-primary bg-primary-muted' : 'border-dashed border-2'} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isListening ? 'bg-primary animate-pulse' : 'bg-gradient-primary'}`}>
                    <Mic className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {isListening ? "Listening..." : "Voice Inventory Management"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isListening ? "Speak clearly. Say something like 'Add 10 Maggi packets at 12 rupees each'" : "Click the button and tell me what to add to your inventory"}
                    </p>
                  </div>

                  {voiceText && <div className="p-3 bg-white rounded-lg border">
                      <p className="text-sm text-muted-foreground">Recognized:</p>
                      <p className="font-medium">{voiceText}</p>
                    </div>}

                  <Button variant={isListening ? "outline" : "hero"} size="lg" onClick={handleVoiceInput} disabled={isListening} className="min-w-[200px]">
                    <MicIcon className="w-5 h-5 mr-2" />
                    {isListening ? "Listening..." : "Start Voice Input"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Low Stock Items</p>
                      <p className="text-2xl font-bold text-destructive">{lowStockProducts.length}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                      <p className="text-2xl font-bold">₹{products.reduce((sum, p) => sum + p.price * p.quantity, 0).toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts.length > 0 && <Card className="border-destructive bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    Low Stock Alert
                  </CardTitle>
                  <CardDescription>
                    {lowStockProducts.length} products are running low and need restocking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {lowStockProducts.map(product => <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-inherit">
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Only {product.quantity} left</p>
                        </div>
                        <Button size="sm" variant="destructive">
                          Restock
                        </Button>
                      </div>)}
                  </div>
                </CardContent>
              </Card>}

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="gradient" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Manually add a new product to your inventory
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input id="productName" placeholder="Enter product name" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (₹)</Label>
                          <Input id="price" type="number" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input id="quantity" type="number" placeholder="0" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" placeholder="Enter category" />
                      </div>
                      <Button className="w-full" variant="hero">
                        Add Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Product Inventory</CardTitle>
                <CardDescription>
                  Showing {filteredProducts.length} of {products.length} products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map(product => {
                      const stockStatus = getStockStatus(product);
                      return <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>₹{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>
                              <Badge variant={stockStatus.variant}>
                                {stockStatus.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{product.lastUpdated}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>;
                    })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default Inventory;