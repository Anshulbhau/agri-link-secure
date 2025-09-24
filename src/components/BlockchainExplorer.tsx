import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ExternalLink, 
  Clock, 
  Hash, 
  Users,
  Activity,
  TrendingUp,
  CheckCircle
} from "lucide-react";

interface Transaction {
  id: string;
  hash: string;
  timestamp: string;
  type: "harvest" | "transfer" | "delivery" | "quality_check";
  from: string;
  to: string;
  productId: string;
  productName: string;
  status: "confirmed" | "pending";
  gasUsed: string;
  blockNumber: string;
}

const BlockchainExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
      timestamp: "2024-01-17 14:30:25",
      type: "harvest",
      from: "0xFarmer...1234",
      to: "0xContract...5678",
      productId: "AGC001",
      productName: "Organic Tomatoes",
      status: "confirmed",
      gasUsed: "0.0023 ETH",
      blockNumber: "18734561"
    },
    {
      id: "2",
      hash: "0x2b3c4d5e6f7890a1bcdef234567890abcdef1234567890abcdef1234567890ab",
      timestamp: "2024-01-17 15:45:12",
      type: "transfer",
      from: "0xFarmer...1234",
      to: "0xDistrib...9012",
      productId: "AGC001",
      productName: "Organic Tomatoes",
      status: "confirmed",
      gasUsed: "0.0018 ETH",
      blockNumber: "18734587"
    },
    {
      id: "3",
      hash: "0x3c4d5e6f7890ab2cdef34567890abcdef1234567890abcdef1234567890abcd",
      timestamp: "2024-01-17 16:20:08",
      type: "delivery",
      from: "0xDistrib...9012",
      to: "0xRetail...3456",
      productId: "AGC001",
      productName: "Organic Tomatoes",
      status: "pending",
      gasUsed: "0.0021 ETH",
      blockNumber: "18734612"
    }
  ]);

  const getTransactionTypeColor = (type: Transaction['type']) => {
    switch (type) {
      case "harvest": return "bg-fresh";
      case "transfer": return "bg-primary";
      case "delivery": return "bg-warning";
      case "quality_check": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getTransactionTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case "harvest": return "Harvest Recorded";
      case "transfer": return "Ownership Transfer";
      case "delivery": return "Delivery Confirmed";
      case "quality_check": return "Quality Verified";
      default: return "Unknown";
    }
  };

  const filteredTransactions = transactions.filter(tx => 
    tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tx.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              Blockchain Explorer
            </h1>
            <p className="text-muted-foreground mt-2">
              View all agricultural supply chain transactions on the blockchain
            </p>
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                  <p className="text-3xl font-bold text-primary">1,247</p>
                </div>
                <Hash className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Products</p>
                  <p className="text-3xl font-bold text-success">89</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Network Participants</p>
                  <p className="text-3xl font-bold text-earth">156</p>
                </div>
                <Users className="h-8 w-8 text-earth/60" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="agri-card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Latest Block</p>
                  <p className="text-3xl font-bold text-warning">18734612</p>
                </div>
                <Activity className="h-8 w-8 text-warning/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="agri-card-elevated mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by transaction hash, product ID, or product name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                Advanced Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Transactions</h2>
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="agri-card-elevated">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className={getTransactionTypeColor(transaction.type)}>
                        {getTransactionTypeLabel(transaction.type)}
                      </Badge>
                      <Badge variant={transaction.status === "confirmed" ? "default" : "secondary"}>
                        {transaction.status === "confirmed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {transaction.status}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-muted-foreground">Transaction Hash</p>
                        <p className="font-mono text-xs break-all">
                          {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Product</p>
                        <p>{transaction.productName} ({transaction.productId})</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Block Number</p>
                        <p className="font-mono">{transaction.blockNumber}</p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">From</p>
                        <p className="font-mono text-xs">
                          {transaction.from.slice(0, 8)}...{transaction.from.slice(-6)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">To</p>
                        <p className="font-mono text-xs">
                          {transaction.to.slice(0, 8)}...{transaction.to.slice(-6)}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-muted-foreground">Timestamp</p>
                        <p className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {transaction.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      View Details
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Gas: {transaction.gasUsed}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <Card className="agri-card-elevated">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">No transactions found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or check back later for new transactions
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlockchainExplorer;