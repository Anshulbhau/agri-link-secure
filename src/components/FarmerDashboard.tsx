import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Package, 
  MapPin, 
  DollarSign, 
  Calendar,
  TrendingUp,
  Sprout
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: string;
  price: string;
  location: string;
  harvestDate: string;
  status: "harvested" | "processed" | "shipped";
}

const FarmerDashboard = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Organic Tomatoes",
      category: "Vegetables",
      quantity: "500 kg",
      price: "$3.50/kg",
      location: "Farm Plot A-12",
      harvestDate: "2024-01-15",
      status: "harvested"
    },
    {
      id: "2", 
      name: "Fresh Apples",
      category: "Fruits",
      quantity: "300 kg",
      price: "$4.20/kg", 
      location: "Orchard B-5",
      harvestDate: "2024-01-10",
      status: "shipped"
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    location: "",
    harvestDate: ""
  });

  const { toast } = useToast();

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.quantity || !newProduct.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      status: "harvested"
    };

    setProducts([product, ...products]);
    setNewProduct({
      name: "",
      category: "",
      quantity: "",
      price: "",
      location: "",
      harvestDate: ""
    });
    setShowAddForm(false);
    
    toast({
      title: "Success",
      description: "Product added successfully to blockchain",
    });
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case "harvested": return "bg-fresh";
      case "processed": return "bg-warning";
      case "shipped": return "bg-primary";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold flex items-center gap-3 animate-scale-in">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-white shadow-lg animate-float">
              <Sprout className="h-8 w-8" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Farmer Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Manage your agricultural produce and track blockchain transactions with real-time transparency
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)} 
          variant="gradient"
          size="lg"
          className="flex items-center gap-2 animate-slide-in-right shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add New Produce
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card border-0 hover:scale-105 transition-all duration-300 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80">Total Products</p>
                <p className="text-3xl font-bold text-white animate-pulse-slow">{products.length}</p>
                <div className="flex items-center text-xs text-emerald-300">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12% from last month
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm">
                <Package className="h-8 w-8 text-primary animate-float" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: "0.1s"}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80">Total Revenue</p>
                <p className="text-3xl font-bold text-emerald-300 animate-pulse-slow">$2,845</p>
                <div className="flex items-center text-xs text-emerald-300">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 backdrop-blur-sm">
                <DollarSign className="h-8 w-8 text-emerald-400 animate-float" style={{animationDelay: "0.5s"}} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: "0.2s"}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80">Active Batches</p>
                <p className="text-3xl font-bold text-amber-300 animate-pulse-slow">
                  {products.filter(p => p.status !== "shipped").length}
                </p>
                <div className="flex items-center text-xs text-amber-300">
                  <Package className="h-3 w-3 mr-1" />
                  In processing
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 backdrop-blur-sm">
                <TrendingUp className="h-8 w-8 text-amber-400 animate-float" style={{animationDelay: "1s"}} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-0 hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: "0.3s"}}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-white/80">Farm Plots</p>
                <p className="text-3xl font-bold text-orange-300 animate-pulse-slow">12</p>
                <div className="flex items-center text-xs text-orange-300">
                  <MapPin className="h-3 w-3 mr-1" />
                  All active
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-400/10 backdrop-blur-sm">
                <MapPin className="h-8 w-8 text-orange-400 animate-float" style={{animationDelay: "1.5s"}} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <Card className="agri-card-elevated mb-8">
          <CardHeader>
            <CardTitle>Add New Produce</CardTitle>
            <CardDescription>
              Register new agricultural produce on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  placeholder="e.g., Vegetables"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
                  placeholder="e.g., 500 kg"
                />
              </div>
              <div>
                <Label htmlFor="price">Price per Unit *</Label>
                <Input
                  id="price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="e.g., $3.50/kg"
                />
              </div>
              <div>
                <Label htmlFor="location">Farm Location</Label>
                <Input
                  id="location"
                  value={newProduct.location}
                  onChange={(e) => setNewProduct({...newProduct, location: e.target.value})}
                  placeholder="e.g., Farm Plot A-12"
                />
              </div>
              <div>
                <Label htmlFor="harvestDate">Harvest Date</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  value={newProduct.harvestDate}
                  onChange={(e) => setNewProduct({...newProduct, harvestDate: e.target.value})}
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button onClick={handleAddProduct}>Add Product</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products List */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold">Your Products</h2>
        {products.map((product) => (
          <Card key={product.id} className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <Badge className={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {product.category} • {product.quantity}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {product.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {product.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Harvested: {product.harvestDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate QR
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FarmerDashboard;