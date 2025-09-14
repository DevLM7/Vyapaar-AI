import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BarChart3, TrendingUp, TrendingDown, IndianRupee, Calendar, Download, FileText, Lightbulb, Star, Package, Users, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7days");

  // Sample data for charts
  const salesData = [{
    name: 'Mon',
    sales: 2400,
    profit: 800
  }, {
    name: 'Tue',
    sales: 1398,
    profit: 500
  }, {
    name: 'Wed',
    sales: 9800,
    profit: 3200
  }, {
    name: 'Thu',
    sales: 3908,
    profit: 1200
  }, {
    name: 'Fri',
    sales: 4800,
    profit: 1800
  }, {
    name: 'Sat',
    sales: 3800,
    profit: 1400
  }, {
    name: 'Sun',
    sales: 4300,
    profit: 1600
  }];
  const productData = [{
    name: 'Maggi Noodles',
    value: 35,
    color: '#FF8C00'
  }, {
    name: 'Tata Tea',
    value: 25,
    color: '#32CD32'
  }, {
    name: 'Parle-G',
    value: 20,
    color: '#1E90FF'
  }, {
    name: 'Amul Milk',
    value: 15,
    color: '#FFD700'
  }, {
    name: 'Others',
    value: 5,
    color: '#9370DB'
  }];
  const customerData = [{
    name: 'Jan',
    newCustomers: 15,
    returningCustomers: 85
  }, {
    name: 'Feb',
    newCustomers: 20,
    returningCustomers: 90
  }, {
    name: 'Mar',
    newCustomers: 25,
    returningCustomers: 95
  }, {
    name: 'Apr',
    newCustomers: 18,
    returningCustomers: 88
  }, {
    name: 'May',
    newCustomers: 30,
    returningCustomers: 100
  }, {
    name: 'Jun',
    newCustomers: 22,
    returningCustomers: 92
  }];
  const insights = [{
    type: "success",
    icon: TrendingUp,
    title: "Peak Sales Day",
    description: "Wednesday shows 40% higher sales than average. Consider special promotions on Wednesdays.",
    impact: "High"
  }, {
    type: "warning",
    icon: Package,
    title: "Product Performance",
    description: "Maggi Noodles contribute to 35% of your revenue. Stock management is critical for this item.",
    impact: "Medium"
  }, {
    type: "info",
    icon: Users,
    title: "Customer Retention",
    description: "78% of your customers are repeat buyers. Your customer service is working well!",
    impact: "Medium"
  }, {
    type: "success",
    icon: IndianRupee,
    title: "Profit Margin",
    description: "Your average profit margin is 28%, which is above industry standard of 22%.",
    impact: "High"
  }];
  const getInsightColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-success bg-success-muted";
      case "warning":
        return "border-warning bg-warning/5";
      case "info":
        return "border-primary bg-primary-muted";
      default:
        return "border-muted bg-muted/50";
    }
  };
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-success text-success-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };
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
                  <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
                  <p className="text-muted-foreground">AI-powered insights for your business growth</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 Days</SelectItem>
                    <SelectItem value="30days">Last 30 Days</SelectItem>
                    <SelectItem value="90days">Last 3 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">₹1,24,560</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">+12.5%</span>
                      </div>
                    </div>
                    <IndianRupee className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">456</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">+8.2%</span>
                      </div>
                    </div>
                    <FileText className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                      <p className="text-2xl font-bold">₹273</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingDown className="w-4 h-4 text-destructive" />
                        <span className="text-sm text-destructive">-2.1%</span>
                      </div>
                    </div>
                    <BarChart3 className="w-8 h-8 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Profit Margin</p>
                      <p className="text-2xl font-bold">28%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">+3.8%</span>
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Sales & Profit Trend
                  </CardTitle>
                  <CardDescription>Daily sales and profit analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" name="Sales" />
                      <Bar dataKey="profit" fill="hsl(var(--success))" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Top Products by Revenue
                  </CardTitle>
                  <CardDescription>Product performance breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={productData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({
                      name,
                      value
                    }) => `${name}: ${value}%`}>
                        {productData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Customer Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Customer Analytics
                </CardTitle>
                <CardDescription>New vs returning customer trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={customerData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="newCustomers" stroke="hsl(var(--primary))" name="New Customers" />
                    <Line type="monotone" dataKey="returningCustomers" stroke="hsl(var(--success))" name="Returning Customers" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-gradient-card border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI-Powered Business Insights
                </CardTitle>
                <CardDescription>
                  Smart recommendations based on your business data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insights.map((insight, index) => <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <insight.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{insight.title}</h4>
                            <Badge className={getImpactColor(insight.impact)}>
                              {insight.impact} Impact
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                        </div>
                      </div>
                    </div>)}
                </div>

                <div className="flex justify-center pt-4">
                  <Button variant="gradient" size="lg">
                    <Star className="w-4 h-4 mr-2" />
                    Get Detailed AI Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Reports
                </CardTitle>
                <CardDescription>
                  Download your business reports in different formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <FileText className="w-8 h-8" />
                    <span>Sales Report PDF</span>
                    <span className="text-xs text-muted-foreground">Detailed sales analysis</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <BarChart3 className="w-8 h-8" />
                    <span>Analytics CSV</span>
                    <span className="text-xs text-muted-foreground">Raw data for analysis</span>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                    <IndianRupee className="w-8 h-8" />
                    <span>Financial Summary</span>
                    <span className="text-xs text-muted-foreground">Tax and accounting</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default Reports;