import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Store, 
  Package, 
  DollarSign, 
  TrendingUp,
  ShoppingCart,
  BarChart3,
  QrCode,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Inventory {
  id: string;
  productName: string;
  farmer: string;
  quantity: string;
  purchasePrice: string;
  sellPrice: string;
  receivedDate: string;
  expiryDate: string;
  status: "fresh" | "expiring_soon" | "expired";
  qrGenerated: boolean;
}

const RetailerDashboard = () => {
  const [inventory, setInventory] = useState<Inventory[]>([
    {
      id: "INV001",
      productName: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      quantity: "200 kg",
      purchasePrice: "$3.50/kg",
      sellPrice: "$4.50/kg",
      receivedDate: "2024-01-17",
      expiryDate: "2024-01-24",
      status: "fresh",
      qrGenerated: true
    },
    {
      id: "INV002",
      productName: "Fresh Apples",
      farmer: "Mountain Orchards",
      quantity: "150 kg",
      purchasePrice: "$4.20/kg",
      sellPrice: "$5.50/kg",
      receivedDate: "2024-01-15",
      expiryDate: "2024-01-29",
      status: "fresh",
      qrGenerated: true
    },
    {
      id: "INV003",
      productName: "Baby Spinach",
      farmer: "Leafy Greens Co.",
      quantity: "50 kg",
      purchasePrice: "$6.00/kg",
      sellPrice: "$8.00/kg",
      receivedDate: "2024-01-12",
      expiryDate: "2024-01-19",
      status: "expiring_soon",
      qrGenerated: false
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { toast } = useToast();

  const generateQRCode = (productId: string) => {
    setInventory(inventory.map(item => 
      item.id === productId 
        ? { ...item, qrGenerated: true }
        : item
    ));
    
    toast({
      title: "QR Code Generated",
      description: `QR code generated for product ${productId}`,
    });
  };

  const updatePrice = (productId: string, newPrice: string) => {
    setInventory(inventory.map(item => 
      item.id === productId 
        ? { ...item, sellPrice: newPrice }
        : item
    ));
    
    toast({
      title: "Price Updated",
      description: `Price updated and recorded on blockchain`,
    });
  };

  const getStatusColor = (status: Inventory['status']) => {
    switch (status) {
      case "fresh": return "bg-success";
      case "expiring_soon": return "bg-warning";
      case "expired": return "bg-error";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: Inventory['status']) => {
    switch (status) {
      case "fresh": return <CheckCircle className="h-4 w-4" />;
      case "expiring_soon": return <Clock className="h-4 w-4" />;
      case "expired": return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const totalValue = inventory.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity.split(' ')[0]);
    const price = parseFloat(item.sellPrice.replace(/[$\/kg]/g, ''));
    return sum + (quantity * price);
  }, 0);

  const totalItems = inventory.length;
  const expiringItems = inventory.filter(item => item.status === 'expiring_soon').length;
  const avgMargin = inventory.reduce((sum, item) => {
    const purchase = parseFloat(item.purchasePrice.replace(/[$\/kg]/g, ''));
    const sell = parseFloat(item.sellPrice.replace(/[$\/kg]/g, ''));
    return sum + ((sell - purchase) / purchase * 100);
  }, 0) / inventory.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Store className="h-8 w-8 text-primary" />
            Retailer Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage inventory, pricing, and customer-facing QR codes
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Sales Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inventory Items</p>
                <p className="text-3xl font-bold text-primary">{totalItems}</p>
              </div>
              <Package className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inventory Value</p>
                <p className="text-3xl font-bold text-success">${totalValue.toFixed(0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Margin</p>
                <p className="text-3xl font-bold text-earth">{avgMargin.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-earth/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Expiring Soon</p>
                <p className="text-3xl font-bold text-warning">{expiringItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Management */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold">Current Inventory</h2>
        {inventory.map((item) => (
          <Card key={item.id} className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold">{item.productName}</h3>
                    <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                      {getStatusIcon(item.status)}
                      {item.status.replace('_', ' ')}
                    </Badge>
                    {item.qrGenerated ? (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <QrCode className="h-3 w-3" />
                        QR Ready
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        QR Pending
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">INVENTORY ID</Label>
                      <p className="font-mono">{item.id}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">SUPPLIER</Label>
                      <p>{item.farmer}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">QUANTITY</Label>
                      <p>{item.quantity}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">PURCHASE PRICE</Label>
                      <p>{item.purchasePrice}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">CURRENT PRICE</Label>
                      <p className="font-semibold text-success">{item.sellPrice}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">RECEIVED</Label>
                      <p>{item.receivedDate}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">EXPIRES</Label>
                      <p className={item.status === 'expiring_soon' ? 'text-warning font-semibold' : ''}>
                        {item.expiryDate}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">MARGIN</Label>
                      <p className="text-earth font-semibold">
                        {(((parseFloat(item.sellPrice.replace(/[$\/kg]/g, '')) - 
                           parseFloat(item.purchasePrice.replace(/[$\/kg]/g, ''))) / 
                           parseFloat(item.purchasePrice.replace(/[$\/kg]/g, ''))) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                  {!item.qrGenerated && (
                    <Button 
                      onClick={() => generateQRCode(item.id)}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <QrCode className="h-4 w-4" />
                      Generate QR
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Update Price
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Mark Sold
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="agri-card-elevated mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your store operations efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              <span>Process Sale</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <QrCode className="h-6 w-6" />
              <span>Bulk QR Generation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span>Price Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Sales Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RetailerDashboard;