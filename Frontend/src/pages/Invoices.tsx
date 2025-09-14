import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Plus, Search, Filter, Eye, Download, MessageCircle, FileText, IndianRupee, Clock, CheckCircle, QrCode, Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  gst: number;
  totalAmount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  dueDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
}
const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([{
    id: "1",
    invoiceNumber: "INV-2024-001",
    customerName: "Rajesh Kumar",
    customerPhone: "+91 98765 43210",
    amount: 1200,
    gst: 216,
    totalAmount: 1416,
    status: "Paid",
    date: "2024-01-15",
    dueDate: "2024-01-30",
    items: [{
      name: "Maggi Noodles",
      quantity: 5,
      price: 12,
      total: 60
    }, {
      name: "Tata Tea",
      quantity: 2,
      price: 145,
      total: 290
    }, {
      name: "Parle-G",
      quantity: 10,
      price: 5,
      total: 50
    }]
  }, {
    id: "2",
    invoiceNumber: "INV-2024-002",
    customerName: "Priya Sharma",
    customerPhone: "+91 87654 32109",
    amount: 850,
    gst: 153,
    totalAmount: 1003,
    status: "Pending",
    date: "2024-01-16",
    dueDate: "2024-01-31",
    items: [{
      name: "Surf Excel",
      quantity: 2,
      price: 89,
      total: 178
    }, {
      name: "Amul Milk",
      quantity: 3,
      price: 56,
      total: 168
    }]
  }, {
    id: "3",
    invoiceNumber: "INV-2024-003",
    customerName: "Amit Singh",
    customerPhone: "+91 76543 21098",
    amount: 2400,
    gst: 432,
    totalAmount: 2832,
    status: "Overdue",
    date: "2024-01-10",
    dueDate: "2024-01-25",
    items: [{
      name: "Grocery Items",
      quantity: 1,
      price: 2400,
      total: 2400
    }]
  }]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const filteredInvoices = invoices.filter(invoice => invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()));
  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-success text-success-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      case "Overdue":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
  const handleSendWhatsApp = (invoice: Invoice) => {
    const message = selectedLanguage === "hindi" ? `नमस्ते ${invoice.customerName}, आपका बिल ${invoice.invoiceNumber} का भुगतान ₹${invoice.totalAmount} बकाया है। कृपया जल्दी भुगतान करें।` : `Hello ${invoice.customerName}, your invoice ${invoice.invoiceNumber} payment of ₹${invoice.totalAmount} is pending. Please make the payment at your earliest convenience.`;
    toast({
      title: "WhatsApp Message Sent!",
      description: `Payment reminder sent to ${invoice.customerName}`
    });
  };
  const handleDownloadPDF = (invoice: Invoice) => {
    toast({
      title: "PDF Generated!",
      description: `Invoice ${invoice.invoiceNumber} downloaded successfully`
    });
  };
  const stats = [{
    title: "Total Invoices",
    value: invoices.length.toString(),
    icon: FileText,
    color: "text-primary"
  }, {
    title: "Paid Amount",
    value: `₹${invoices.filter(i => i.status === "Paid").reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString()}`,
    icon: CheckCircle,
    color: "text-success"
  }, {
    title: "Pending Amount",
    value: `₹${invoices.filter(i => i.status === "Pending").reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString()}`,
    icon: Clock,
    color: "text-warning"
  }, {
    title: "Overdue Amount",
    value: `₹${invoices.filter(i => i.status === "Overdue").reduce((sum, i) => sum + i.totalAmount, 0).toLocaleString()}`,
    icon: IndianRupee,
    color: "text-destructive"
  }];
  return <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          {/* Header */}
          <header className="border-b border-border p-4 lg:p-6 bg-inherit">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Invoices & Billing</h1>
                  <p className="text-muted-foreground">Create bilingual invoices and track payments</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary-muted text-primary">
                  {invoices.length} Invoices
                </Badge>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* Language Selection & Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Invoice Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="both">Both Languages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="hero" size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Invoice
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                    <DialogDescription>
                      Generate a new invoice with automatic GST calculation and UPI QR code
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Customer Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerName">Customer Name</Label>
                        <Input id="customerName" placeholder="Enter customer name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerPhone">Phone Number</Label>
                        <Input id="customerPhone" placeholder="+91 XXXXX XXXXX" />
                      </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="invoiceDate">Invoice Date</Label>
                        <Input id="invoiceDate" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input id="dueDate" type="date" />
                      </div>
                    </div>

                    {/* Items Section */}
                    <div className="space-y-4">
                      <Label>Invoice Items</Label>
                      <div className="border rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-4 gap-2 font-medium text-sm">
                          <span>Item Name</span>
                          <span>Quantity</span>
                          <span>Price (₹)</span>
                          <span>Total</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <Input placeholder="Product name" />
                          <Input type="number" placeholder="1" />
                          <Input type="number" placeholder="0.00" />
                          <div className="flex items-center">
                            <span className="text-muted-foreground">₹0.00</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Another Item
                        </Button>
                      </div>
                    </div>

                    {/* GST & Payment */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gstRate">GST Rate (%)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select GST rate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0% (No GST)</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="paymentMethod">Payment Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="upi">UPI</SelectItem>
                            <SelectItem value="card">Card</SelectItem>
                            <SelectItem value="credit">Credit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea id="notes" placeholder="Any additional notes or terms..." rows={3} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="success" className="flex-1">
                        <QrCode className="w-4 h-4 mr-2" />
                        Generate with QR
                      </Button>
                      <Button variant="hero" className="flex-1">
                        <FileText className="w-4 h-4 mr-2" />
                        Create Invoice
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Search invoices..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter by Status
              </Button>
            </div>

            {/* Invoices Table */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice List</CardTitle>
                <CardDescription>
                  Showing {filteredInvoices.length} of {invoices.length} invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>GST</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredInvoices.map(invoice => <TableRow key={invoice.id}>
                          <TableCell className="font-mono font-medium">
                            {invoice.invoiceNumber}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{invoice.customerName}</p>
                              <p className="text-xs text-muted-foreground">{invoice.customerPhone}</p>
                            </div>
                          </TableCell>
                          <TableCell>₹{invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>₹{invoice.gst.toLocaleString()}</TableCell>
                          <TableCell className="font-semibold">₹{invoice.totalAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{invoice.date}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={() => handleDownloadPDF(invoice)}>
                                <Download className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleSendWhatsApp(invoice)} className="text-success hover:text-success">
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>)}
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
export default Invoices;