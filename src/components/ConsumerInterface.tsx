import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  QrCode, 
  Scan, 
  MapPin, 
  Calendar, 
  User, 
  Truck,
  Store,
  Leaf,
  CheckCircle,
  ArrowRight,
  Camera
} from "lucide-react";

interface ProductJourney {
  id: string;
  productName: string;
  category: string;
  farmer: {
    name: string;
    location: string;
    certification: string;
  };
  harvest: {
    date: string;
    method: string;
    quality: string;
  };
  distribution: {
    company: string;
    pickupDate: string;
    deliveryDate: string;
  };
  retail: {
    store: string;
    receivedDate: string;
    price: string;
  };
  blockchain: {
    transactionId: string;
    verified: boolean;
  };
}

const ConsumerInterface = () => {
  const [qrCode, setQrCode] = useState("");
  const [productData, setProductData] = useState<ProductJourney | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Mock product data
  const mockProduct: ProductJourney = {
    id: "AGC001",
    productName: "Organic Tomatoes",
    category: "Vegetables",
    farmer: {
      name: "Green Valley Farm",
      location: "California, USA",
      certification: "USDA Organic"
    },
    harvest: {
      date: "2024-01-15",
      method: "Hand-picked",
      quality: "Grade A"
    },
    distribution: {
      company: "Fresh Logistics Co.",
      pickupDate: "2024-01-15",
      deliveryDate: "2024-01-17"
    },
    retail: {
      store: "Organic Market",
      receivedDate: "2024-01-17",
      price: "$3.50/kg"
    },
    blockchain: {
      transactionId: "0x1a2b3c4d5e6f...",
      verified: true
    }
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      setProductData(mockProduct);
      setQrCode("AGC001");
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (qrCode.trim()) {
      setProductData(mockProduct);
    }
  };

  const journeySteps = [
    {
      icon: Leaf,
      title: "Farm Origin",
      description: productData?.farmer.name || "Farm information",
      date: productData?.harvest.date || "",
      status: "completed",
      details: productData ? [
        `Location: ${productData.farmer.location}`,
        `Certification: ${productData.farmer.certification}`,
        `Harvest Method: ${productData.harvest.method}`,
        `Quality Grade: ${productData.harvest.quality}`
      ] : []
    },
    {
      icon: Truck,
      title: "Distribution",
      description: productData?.distribution.company || "Distribution company",
      date: productData?.distribution.deliveryDate || "",
      status: "completed",
      details: productData ? [
        `Pickup: ${productData.distribution.pickupDate}`,
        `Delivery: ${productData.distribution.deliveryDate}`,
        `Cold chain maintained`
      ] : []
    },
    {
      icon: Store,
      title: "Retail Store",
      description: productData?.retail.store || "Retail location",
      date: productData?.retail.receivedDate || "",
      status: "completed",
      details: productData ? [
        `Received: ${productData.retail.receivedDate}`,
        `Current Price: ${productData.retail.price}`,
        `Fresh stock available`
      ] : []
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <QrCode className="h-8 w-8 text-primary" />
            Product Traceability
          </h1>
          <p className="text-muted-foreground mt-2">
            Scan or enter product code to view complete supply chain journey
          </p>
        </div>

        {/* QR Scanner Section */}
        <Card className="agri-card-elevated mb-8">
          <CardHeader>
            <CardTitle>Scan Product QR Code</CardTitle>
            <CardDescription>
              Use your camera to scan the QR code on your product or enter the code manually
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter product code (e.g., AGC001)"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleScan} disabled={isScanning} className="flex items-center gap-2">
                  {isScanning ? (
                    <>
                      <Scan className="h-4 w-4 animate-pulse" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4" />
                      Scan QR
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleManualEntry}>
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Information */}
        {productData && (
          <div className="space-y-8">
            {/* Product Overview */}
            <Card className="agri-card-elevated">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{productData.productName}</h2>
                    <p className="text-muted-foreground">{productData.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-success flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Product ID</p>
                    <p className="font-mono">{productData.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Blockchain Transaction</p>
                    <p className="font-mono text-primary">{productData.blockchain.transactionId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain Journey */}
            <Card className="agri-card-elevated">
              <CardHeader>
                <CardTitle>Supply Chain Journey</CardTitle>
                <CardDescription>
                  Complete transparency from farm to your table
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {journeySteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === journeySteps.length - 1;
                    
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          {!isLast && <div className="w-px h-16 bg-border mt-2"></div>}
                        </div>
                        
                        <div className="flex-1 pb-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold">{step.title}</h3>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                            {step.date && (
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {step.date}
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            {step.details.map((detail, i) => (
                              <p key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                <ArrowRight className="h-3 w-3" />
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                View on Map
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Farmer
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                Share Product Info
              </Button>
            </div>
          </div>
        )}

        {/* Demo Instructions */}
        {!productData && (
          <Card className="agri-card-elevated">
            <CardContent className="p-6 text-center">
              <QrCode className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">Try Demo</h3>
              <p className="text-muted-foreground mb-4">
                Enter "AGC001" or click "Scan QR" to see a sample product journey
              </p>
              <Button onClick={handleScan}>
                View Demo Product
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConsumerInterface;