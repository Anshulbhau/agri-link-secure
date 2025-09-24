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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Sprout className="h-8 w-8 text-primary" />
            Farmer Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your agricultural produce and track blockchain transactions
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Produce
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-3xl font-bold text-primary">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-success">$2,845</p>
              </div>
              <DollarSign className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Batches</p>
                <p className="text-3xl font-bold text-warning">
                  {products.filter(p => p.status !== "shipped").length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Farm Plots</p>
                <p className="text-3xl font-bold text-earth">12</p>
              </div>
              <MapPin className="h-8 w-8 text-earth/60" />
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