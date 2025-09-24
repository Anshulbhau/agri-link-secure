import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  RefreshCw,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Shipment {
  id: string;
  productName: string;
  farmer: string;
  quantity: string;
  origin: string;
  destination: string;
  status: "received" | "in-transit" | "delivered";
  receivedDate: string;
  estimatedDelivery: string;
}

const DistributorDashboard = () => {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "SH001",
      productName: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      quantity: "500 kg",
      origin: "Farm Plot A-12",
      destination: "City Market Hub",
      status: "in-transit",
      receivedDate: "2024-01-15",
      estimatedDelivery: "2024-01-17"
    },
    {
      id: "SH002", 
      productName: "Fresh Apples",
      farmer: "Mountain Orchards",
      quantity: "300 kg",
      origin: "Orchard B-5",
      destination: "Retail Chain Store",
      status: "delivered",
      receivedDate: "2024-01-10",
      estimatedDelivery: "2024-01-12"
    }
  ]);

  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const { toast } = useToast();

  const updateShipmentStatus = (id: string, newStatus: Shipment['status']) => {
    setShipments(shipments.map(shipment => 
      shipment.id === id 
        ? { ...shipment, status: newStatus }
        : shipment
    ));
    
    toast({
      title: "Status Updated",
      description: `Shipment ${id} status updated to ${newStatus}`,
    });
  };

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case "received": return "bg-warning";
      case "in-transit": return "bg-primary";
      case "delivered": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: Shipment['status']) => {
    switch (status) {
      case "received": return <Package className="h-4 w-4" />;
      case "in-transit": return <Truck className="h-4 w-4" />;
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            Distributor Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage shipments and update product journey status
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Blockchain
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Shipments</p>
                <p className="text-3xl font-bold text-primary">
                  {shipments.filter(s => s.status !== "delivered").length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                <p className="text-3xl font-bold text-success">
                  {shipments.filter(s => s.status === "delivered").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                <p className="text-3xl font-bold text-earth">800 kg</p>
              </div>
              <Package className="h-8 w-8 text-earth/60" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="agri-card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Partner Farms</p>
                <p className="text-3xl font-bold text-fresh">8</p>
              </div>
              <MapPin className="h-8 w-8 text-fresh/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipments List */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold">Active Shipments</h2>
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl font-semibold">{shipment.productName}</h3>
                    <Badge className={`${getStatusColor(shipment.status)} flex items-center gap-1`}>
                      {getStatusIcon(shipment.status)}
                      {shipment.status}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">SHIPMENT ID</Label>
                      <p className="font-mono">{shipment.id}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">FARMER</Label>
                      <p>{shipment.farmer}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">QUANTITY</Label>
                      <p>{shipment.quantity}</p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">ORIGIN</Label>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {shipment.origin}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">DESTINATION</Label>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {shipment.destination}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground">ETA</Label>
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {shipment.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                  {shipment.status === "received" && (
                    <Button 
                      onClick={() => updateShipmentStatus(shipment.id, "in-transit")}
                      size="sm"
                    >
                      Mark In Transit
                    </Button>
                  )}
                  {shipment.status === "in-transit" && (
                    <Button 
                      onClick={() => updateShipmentStatus(shipment.id, "delivered")}
                      size="sm"
                    >
                      Mark Delivered
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Update Location
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

export default DistributorDashboard;