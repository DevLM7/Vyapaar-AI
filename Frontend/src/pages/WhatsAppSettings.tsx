import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MessageCircle, Settings, Bot, Send, Clock, Star, CheckCircle, Plus, Edit, Trash2, TestTube, Phone, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
interface Template {
  id: string;
  name: string;
  message: string;
  category: string;
  isActive: boolean;
  variables: string[];
}
interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
}
const WhatsAppSettings = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [businessHours, setBusinessHours] = useState({
    start: "09:00",
    end: "21:00"
  });
  const [templates, setTemplates] = useState<Template[]>([{
    id: "1",
    name: "Payment Reminder",
    message: "नमस्ते {name}, आपका ₹{amount} का भुगतान बकाया है। कृपया जल्दी भुगतान करें। धन्यवाद!",
    category: "Payment",
    isActive: true,
    variables: ["name", "amount"]
  }, {
    id: "2",
    name: "Order Confirmation",
    message: "Hello {name}! Your order of ₹{amount} has been confirmed. We'll deliver it by {date}. Thank you for choosing us!",
    category: "Orders",
    isActive: true,
    variables: ["name", "amount", "date"]
  }, {
    id: "3",
    name: "Stock Alert",
    message: "मिल गया! {product} अब स्टॉक में है। ₹{price} में मिल रहा है। जल्दी आएं!",
    category: "Inventory",
    isActive: false,
    variables: ["product", "price"]
  }]);
  const [faqs, setFaqs] = useState<FAQ[]>([{
    id: "1",
    question: "दुकान का समय क्या है?",
    answer: "हमारी दुकान सुबह 9 बजे से रात 9 बजे तक खुली रहती है।",
    isActive: true
  }, {
    id: "2",
    question: "What are your store timings?",
    answer: "Our store is open from 9 AM to 9 PM every day.",
    isActive: true
  }, {
    id: "3",
    question: "क्या होम डिलीवरी है?",
    answer: "हाँ, हम 2 किमी के दायरे में फ्री होम डिलीवरी करते हैं।",
    isActive: true
  }, {
    id: "4",
    question: "Do you provide home delivery?",
    answer: "Yes, we provide free home delivery within 2 km radius.",
    isActive: true
  }]);
  const [testMessage, setTestMessage] = useState("");
  const [testResponse, setTestResponse] = useState("");
  const handleTestBot = () => {
    const activeFAQ = faqs.find(faq => faq.isActive && faq.question.toLowerCase().includes(testMessage.toLowerCase()));
    if (activeFAQ) {
      setTestResponse(activeFAQ.answer);
    } else {
      setTestResponse("मुझे खुशी होगी आपकी मदद करने में! कृपया और विस्तार से बताएं या हमारे दुकान के समय के दौरान संपर्क करें।");
    }
    toast({
      title: "Test Successful!",
      description: "Chatbot response generated"
    });
  };
  const handleSendTemplate = (template: Template) => {
    toast({
      title: "Template Sent!",
      description: `${template.name} template sent to selected customers`
    });
  };
  const toggleFAQ = (id: string) => {
    setFaqs(prev => prev.map(faq => faq.id === id ? {
      ...faq,
      isActive: !faq.isActive
    } : faq));
  };
  const toggleTemplate = (id: string) => {
    setTemplates(prev => prev.map(template => template.id === id ? {
      ...template,
      isActive: !template.isActive
    } : template));
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
                  <h1 className="text-2xl font-bold text-foreground">WhatsApp Assistant</h1>
                  <p className="text-muted-foreground">Configure auto-replies and message templates</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isConnected ? "default" : "destructive"} className="bg-success text-success-foreground">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  {isConnected ? "Connected" : "Disconnected"}
                </Badge>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6 space-y-6">
            {/* Connection Status */}
            <Card className={`${isConnected ? 'border-success bg-success-muted' : 'border-destructive bg-destructive/5'}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isConnected ? 'bg-success' : 'bg-destructive'}`}>
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">WhatsApp Business API</h3>
                      <p className="text-sm text-muted-foreground">
                        {isConnected ? "Your WhatsApp is connected and ready to send automated messages" : "Connect your WhatsApp Business account to enable automation"}
                      </p>
                    </div>
                  </div>
                  <Button variant={isConnected ? "outline" : "hero"}>
                    {isConnected ? "Reconnect" : "Connect WhatsApp"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="templates" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="templates">Message Templates</TabsTrigger>
                <TabsTrigger value="faqs">Auto Replies</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="test">Test Bot</TabsTrigger>
              </TabsList>

              {/* Message Templates */}
              <TabsContent value="templates" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Message Templates</h3>
                    <p className="text-muted-foreground">Pre-built messages for common scenarios</p>
                  </div>
                  <Button variant="gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map(template => <Card key={template.id} className={`${template.isActive ? 'border-primary' : 'border-muted'}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <Badge variant="outline" className="mt-1">
                              {template.category}
                            </Badge>
                          </div>
                          <Switch checked={template.isActive} onCheckedChange={() => toggleTemplate(template.id)} />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">{template.message}</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map(variable => <Badge key={variable} variant="secondary" className="text-xs">
                              {`{${variable}}`}
                            </Badge>)}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="success" size="sm" className="flex-1" onClick={() => handleSendTemplate(template)}>
                            <Send className="w-4 h-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </TabsContent>

              {/* Auto Replies / FAQs */}
              <TabsContent value="faqs" className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Auto Replies & FAQs</h3>
                    <p className="text-muted-foreground">Automated responses to common questions</p>
                  </div>
                  <Button variant="gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Add FAQ
                  </Button>
                </div>

                <div className="space-y-3">
                  {faqs.map(faq => <Card key={faq.id} className={`${faq.isActive ? 'border-primary' : 'border-muted'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">Q</Badge>
                              <p className="font-medium">{faq.question}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">A</Badge>
                              <p className="text-sm text-muted-foreground">{faq.answer}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch checked={faq.isActive} onCheckedChange={() => toggleFAQ(faq.id)} />
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        General Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="autoReply">Auto Reply</Label>
                          <p className="text-sm text-muted-foreground">Automatically respond to messages</p>
                        </div>
                        <Switch id="autoReply" checked={autoReplyEnabled} onCheckedChange={setAutoReplyEnabled} />
                      </div>

                      <div className="space-y-2">
                        <Label>Business Hours</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor="startTime" className="text-xs">Start Time</Label>
                            <Input id="startTime" type="time" value={businessHours.start} onChange={e => setBusinessHours(prev => ({
                            ...prev,
                            start: e.target.value
                          }))} />
                          </div>
                          <div>
                            <Label htmlFor="endTime" className="text-xs">End Time</Label>
                            <Input id="endTime" type="time" value={businessHours.end} onChange={e => setBusinessHours(prev => ({
                            ...prev,
                            end: e.target.value
                          }))} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="offlineMessage">Offline Message</Label>
                        <Textarea id="offlineMessage" placeholder="Message to send when offline..." rows={3} />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Phone className="w-5 h-5" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessPhone">Business Phone</Label>
                        <Input id="businessPhone" placeholder="+91 XXXXX XXXXX" defaultValue="+91 98765 43210" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" placeholder="Your business name" defaultValue="Raj Store" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Your business address..." rows={3} defaultValue="123 Main Street, Delhi, India" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="welcomeMessage">Welcome Message</Label>
                        <Textarea id="welcomeMessage" placeholder="Welcome message for new customers..." rows={3} defaultValue="नमस्ते! राज स्टोर में आपका स्वागत है। हम आपकी कैसे मदद कर सकते हैं?" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end">
                  <Button variant="hero" size="lg">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </TabsContent>

              {/* Test Bot */}
              <TabsContent value="test" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TestTube className="w-5 h-5" />
                      Test Your WhatsApp Bot
                    </CardTitle>
                    <CardDescription>
                      Send test messages to see how your bot will respond to customer queries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Test Input */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="testMessage">Customer Message</Label>
                          <Textarea id="testMessage" placeholder="Type a customer message to test..." rows={4} value={testMessage} onChange={e => setTestMessage(e.target.value)} />
                        </div>
                        
                        <Button variant="gradient" className="w-full" onClick={handleTestBot} disabled={!testMessage.trim()}>
                          <Bot className="w-4 h-4 mr-2" />
                          Test Bot Response
                        </Button>
                      </div>

                      {/* Test Output */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Bot Response</Label>
                          <div className="min-h-[120px] p-4 bg-muted rounded-lg border">
                            {testResponse ? <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                  <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm">{testResponse}</p>
                                </div>
                              </div> : <p className="text-muted-foreground text-sm">
                                Bot response will appear here after testing...
                              </p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Test Examples */}
                    <div className="space-y-3">
                      <Label>Quick Test Examples</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {["दुकान का समय क्या है?", "What are your store timings?", "क्या होम डिलीवरी है?", "Do you have milk?", "कितने का भुगतान बाकी है?", "Thank you!"].map(example => <Button key={example} variant="outline" size="sm" className="text-left justify-start h-auto p-2" onClick={() => setTestMessage(example)}>
                            <MessageSquare className="w-3 h-3 mr-2 flex-shrink-0" />
                            <span className="text-xs">{example}</span>
                          </Button>)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default WhatsAppSettings;