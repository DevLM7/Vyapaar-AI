import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Mic, FileText, MessageCircle, BarChart3, Smartphone, IndianRupee, TrendingUp, Shield, Globe, ArrowRight, CheckCircle, Star, Users, Zap, Brain } from "lucide-react";
const Index = () => {
  const navigate = useNavigate();
  const features = [{
    icon: Mic,
    title: "Voice Inventory",
    description: "Add stock using voice commands in Hindi or English",
    highlight: "AI-Powered"
  }, {
    icon: FileText,
    title: "Smart Invoices",
    description: "Generate bilingual invoices with automatic GST and UPI QR codes",
    highlight: "GST Ready"
  }, {
    icon: MessageCircle,
    title: "WhatsApp Assistant",
    description: "Automated customer service with payment reminders",
    highlight: "24/7 Support"
  }, {
    icon: BarChart3,
    title: "Business Analytics",
    description: "AI insights to grow your business with smart recommendations",
    highlight: "Data-Driven"
  }];
  const benefits = ["No technical knowledge required", "Works in Hindi and English", "Save 5+ hours daily", "Increase sales by 30%", "Reduce payment delays", "Free for small businesses"];
  const testimonials = [{
    name: "राम शर्मा",
    business: "Ram General Store, Delhi",
    comment: "व्यापार - AI ने मेरी दुकान को डिजिटल बना दिया। अब ग्राहकों का हिसाब रखना बहुत आसान है।",
    rating: 5
  }, {
    name: "Priya Patel",
    business: "Patel Provisions, Mumbai",
    comment: "Voice inventory feature is amazing! I can add stock while serving customers. Sales increased by 25%.",
    rating: 5
  }, {
    name: "अजय कुमार",
    business: "Kumar Electronics, Bangalore",
    comment: "WhatsApp automation saves so much time. Customers pay faster now with automatic reminders.",
    rating: 5
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">Vyapaar</h2>
              <p className="text-xs text-muted-foreground">AI Business Tools</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="hero" onClick={() => navigate("/login")}>
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Business Management
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              AI Tools for 
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Indian Businesses
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Manage inventory with voice commands, send WhatsApp invoices, and get AI insights. 
              Perfect for shopkeepers and small businesses across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate("/login")}>
                <Smartphone className="w-5 h-5 mr-2" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="xl" onClick={() => navigate("/dashboard")} className="border-white hover:bg-white/10 text-slate-950">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-3xl font-bold">10,000+</p>
                <p className="text-white/80">Happy Shopkeepers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">30%</p>
                <p className="text-white/80">Average Sales Increase</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">5+ Hours</p>
                <p className="text-white/80">Saved Daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From voice-powered inventory to AI insights, we've got all the tools Indian businesses need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="mb-2">{feature.highlight}</Badge>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Indian Businesses Choose Vyapaar - AI
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Built specifically for Indian markets with support for multiple languages and local business practices.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>)}
              </div>

              <div className="mt-8">
                <Button variant="hero" size="lg" onClick={() => navigate("/login")}>
                  <Brain className="w-5 h-5 mr-2" />
                  Try AI Features Now
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                      <IndianRupee className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Revenue Growth</h3>
                      <p className="text-sm text-muted-foreground">Track and increase sales</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="text-2xl font-bold">+30%</span>
                    <span className="text-sm text-muted-foreground">average increase</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Multilingual Support</h3>
                      <p className="text-sm text-muted-foreground">Hindi, English & more</p>
                    </div>
                  </div>
                  <p className="text-sm">Works seamlessly in your preferred language with voice commands and invoices.</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Secure & Reliable</h3>
                      <p className="text-sm text-muted-foreground">Bank-grade security</p>
                    </div>
                  </div>
                  <p className="text-sm">Your business data is protected with enterprise-level security and privacy.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Thousands of Indian Businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              See what shopkeepers across India are saying about Vyapaar - AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm mb-4 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of Indian businesses already using AI to grow faster and work smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate("/login")}>
              <Users className="w-5 h-5 mr-2" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="xl" className="border-white hover:bg-white/10 text-slate-950">
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to Expert
            </Button>
          </div>

          <p className="text-sm text-white/70 mt-6">
            No credit card required • Free for small businesses • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Vyapaar - AI</span>
              </div>
              <p className="text-sm text-muted">
                Empowering Indian businesses with AI-powered tools for growth and efficiency.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>Voice Inventory</li>
                <li>Smart Invoices</li>
                <li>WhatsApp Assistant</li>
                <li>Business Analytics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Training Videos</li>
                <li>Community</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Careers</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-muted mt-8 pt-8 text-center">
            <p className="text-sm text-muted">
              © 2024 Vyapaar - AI. Made with ❤️ for Indian Businesses.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;