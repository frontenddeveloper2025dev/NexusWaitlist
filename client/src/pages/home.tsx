import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertWaitlistRegistrationSchema, type InsertWaitlistRegistration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, WandSparkles, Zap, Shield, Users, Code, BarChart3, Rocket, Clock, Check, Gift, Star, Twitter, Linkedin, Github, Inbox, Phone, MapPin } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertWaitlistRegistration>({
    resolver: zodResolver(insertWaitlistRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: InsertWaitlistRegistration) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Welcome aboard!",
        description: "You're now on the waitlist. We'll be in touch soon!",
      });
      setTimeout(() => setShowSuccess(false), 5000);
    },
    onError: (error: any) => {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertWaitlistRegistration) => {
    waitlistMutation.mutate(data);
  };

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-lg bg-white/10 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">InnovateLab</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
              <Button
                onClick={scrollToWaitlist}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <Badge variant="secondary" className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">🚀 Revolutionary AI Platform Coming Soon</span>
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">The Future of</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI Innovation</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Join thousands of forward-thinking professionals who are ready to revolutionize their workflow with our cutting-edge AI platform. Be the first to experience the future of intelligent automation.
            </p>

            {/* Waitlist Form */}
            <Card id="waitlist-form" className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl max-w-md mx-auto lg:mx-0">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-6 text-center lg:text-left">Join the Exclusive Waitlist</h3>
                
                {showSuccess ? (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-center">
                    <Check className="text-green-400 text-xl mb-2 mx-auto" />
                    <p className="text-green-300">Welcome aboard! You're now on the waitlist.</p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your full name"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-300">Email Address</FormLabel>
                            <FormControl>
                              <Input 
                                {...field}
                                type="email"
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="Enter your email address"
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        disabled={waitlistMutation.isPending}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate-glow"
                      >
                        {waitlistMutation.isPending ? 'Joining...' : 'Join Waitlist'}
                        <Rocket className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </Form>
                )}

                <div className="flex items-center justify-center mt-6 space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Shield className="text-green-400 h-4 w-4" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Inbox className="text-blue-400 h-4 w-4" />
                    <span>No Spam</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Hero Visual */}
          <div className="relative lg:block hidden">
            <div className="relative w-full h-96 animate-float">
              <Card className="absolute top-0 right-0 w-48 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl">
                <CardContent className="p-4">
                  <Brain className="text-indigo-400 text-2xl mb-2" />
                  <h4 className="font-semibold text-sm">AI Assistant</h4>
                  <p className="text-xs text-gray-300">Smart automation</p>
                </CardContent>
              </Card>
              
              <Card className="absolute top-20 left-0 w-40 h-28 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl animation-delay-1000">
                <CardContent className="p-4">
                  <BarChart3 className="text-cyan-400 text-2xl mb-2" />
                  <h4 className="font-semibold text-sm">Analytics</h4>
                  <p className="text-xs text-gray-300">Real-time insights</p>
                </CardContent>
              </Card>
              
              <Card className="absolute bottom-0 right-12 w-44 h-36 bg-gradient-to-r from-pink-500/20 to-red-600/20 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl animation-delay-2000">
                <CardContent className="p-4">
                  <Brain className="text-pink-400 text-2xl mb-2" />
                  <h4 className="font-semibold text-sm">Neural Network</h4>
                  <p className="text-xs text-gray-300">Deep learning</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Revolutionary Features</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the cutting-edge capabilities that will transform how you work, create, and innovate in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: WandSparkles,
                title: "Intelligent Automation",
                description: "Streamline complex workflows with AI-powered automation that learns from your patterns and preferences.",
                gradient: "from-indigo-500 to-purple-600"
              },
              {
                icon: Zap,
                title: "Real-time Processing",
                description: "Experience lightning-fast data processing and analysis with our advanced neural network architecture.",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level security with end-to-end encryption and compliance with international standards.",
                gradient: "from-pink-500 to-red-600"
              },
              {
                icon: Users,
                title: "Seamless Collaboration",
                description: "Work together effortlessly with integrated team tools and real-time synchronization.",
                gradient: "from-green-500 to-emerald-600"
              },
              {
                icon: Code,
                title: "Developer Friendly",
                description: "Comprehensive APIs and SDKs for seamless integration with your existing technology stack.",
                gradient: "from-yellow-500 to-orange-600"
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Gain deep insights with powerful analytics and customizable dashboards for data-driven decisions.",
                gradient: "from-purple-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <Card key={index} className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 shadow-xl">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">About InnovateLab</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Founded by a team of AI researchers and industry veterans, InnovateLab is dedicated to democratizing artificial intelligence and making advanced automation accessible to businesses of all sizes.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Our mission is to bridge the gap between cutting-edge AI research and practical business applications, empowering teams to achieve more with intelligent automation.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { value: "50k+", label: "Beta Users Registered", color: "text-indigo-400" },
                  { value: "99.9%", label: "Uptime Guarantee", color: "text-purple-400" },
                  { value: "24/7", label: "Premium Support", color: "text-cyan-400" },
                  { value: "<30ms", label: "Response Time", color: "text-pink-400" }
                ].map((stat, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl">
                    <CardContent className="p-6">
                      <h4 className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</h4>
                      <p className="text-gray-300">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl">
                <CardContent className="p-8">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                    alt="Modern tech office with AI analytics displays" 
                    className="rounded-xl shadow-lg w-full h-auto opacity-90" 
                  />
                  
                  <Card className="absolute top-4 right-4 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-lg border border-white/20 rounded-lg animate-float">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">AI Processing Active</span>
                      </div>
                      <p className="text-lg font-bold text-indigo-400 mt-1">127k operations/sec</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Ready to Transform Your Workflow?</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Join the revolution and be among the first to experience the future of AI-powered productivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={scrollToWaitlist}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate-glow"
                >
                  Join the Waitlist Now
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="text-yellow-400 h-4 w-4" />
                  <span className="text-sm">Early bird pricing available</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Check className="text-green-400 h-4 w-4" />
                  <span>Free for first 1000 users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="text-purple-400 h-4 w-4" />
                  <span>Exclusive beta features</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 h-4 w-4" />
                  <span>Priority support</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-16 px-6 sm:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold">InnovateLab</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Pioneering the future of AI-powered automation and intelligent workflow solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Twitter className="text-cyan-400 h-4 w-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Linkedin className="text-blue-400 h-4 w-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200">
                  <Github className="text-gray-400 h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">API Reference</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Inbox className="text-indigo-400 h-4 w-4" />
                  <span>hello@innovatelab.ai</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="text-purple-400 h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start space-x-3 text-gray-300">
                  <MapPin className="text-pink-400 h-4 w-4 mt-1" />
                  <span>San Francisco, CA<br />United States</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 InnovateLab. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
