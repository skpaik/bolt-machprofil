"use client";

import React, { useState } from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Code,
  Palette,
  Smartphone,
  Database,
  Cloud,
  Search,
  Megaphone,
  BarChart,
  Pen,
  Video,
  ShoppingCart,
  Users,
  Zap,
  Settings,
  Shield,
  Globe,
  Camera,
  HeadphonesIcon,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight
} from 'lucide-react';

// Service interface - adaptable for any professional service
interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  deliverables?: string[];
  pricing?: {
    type: 'Fixed' | 'Hourly' | 'Project-based' | 'Contact';
    amount?: string;
    currency?: string;
  };
  duration?: string;
  popular?: boolean;
  tags?: string[];
}

// Sample services data - covers various professional services
const SAMPLE_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    category: 'Development',
    icon: 'Code',
    shortDescription: 'Custom websites and web applications built with modern technologies',
    description: 'Full-stack web development services using cutting-edge technologies like React, Next.js, Node.js, and more. I create responsive, performant, and scalable web applications tailored to your business needs.',
    features: [
      'Responsive design for all devices',
      'Modern tech stack (React, Next.js, TypeScript)',
      'SEO optimization',
      'Performance optimization',
      'Security best practices',
      'API integration',
      'Database design and implementation',
      'Ongoing maintenance and support'
    ],
    deliverables: [
      'Fully functional website/application',
      'Source code with documentation',
      'Deployment on hosting platform',
      '30 days of post-launch support'
    ],
    pricing: {
      type: 'Project-based',
      amount: '3,000',
      currency: 'USD'
    },
    duration: '4-8 weeks',
    popular: true,
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Full Stack']
  },
  {
    id: '2',
    title: 'Mobile App Development',
    category: 'Development',
    icon: 'Smartphone',
    shortDescription: 'Native and cross-platform mobile applications for iOS and Android',
    description: 'Create stunning mobile applications that work seamlessly on both iOS and Android platforms. Using React Native and Flutter, I deliver high-performance apps with native-like experiences.',
    features: [
      'Cross-platform development (iOS & Android)',
      'Native performance and feel',
      'Push notifications',
      'Offline functionality',
      'In-app purchases integration',
      'Analytics and crash reporting',
      'App store submission assistance',
      'Regular updates and maintenance'
    ],
    deliverables: [
      'iOS and Android applications',
      'App store assets and descriptions',
      'Backend API (if required)',
      'Technical documentation'
    ],
    pricing: {
      type: 'Project-based',
      amount: '5,000',
      currency: 'USD'
    },
    duration: '8-12 weeks',
    popular: true,
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile']
  },
  {
    id: '3',
    title: 'UI/UX Design',
    category: 'Design',
    icon: 'Palette',
    shortDescription: 'User-centered design that combines aesthetics with functionality',
    description: 'Design beautiful and intuitive user interfaces that enhance user experience. From wireframes to high-fidelity mockups, I create designs that not only look great but also solve real user problems.',
    features: [
      'User research and personas',
      'Wireframing and prototyping',
      'Visual design and branding',
      'Interactive prototypes',
      'Design system creation',
      'Usability testing',
      'Responsive design',
      'Handoff to developers'
    ],
    deliverables: [
      'Figma/Sketch design files',
      'Interactive prototypes',
      'Design system documentation',
      'Asset exports for development'
    ],
    pricing: {
      type: 'Hourly',
      amount: '75',
      currency: 'USD'
    },
    duration: '2-6 weeks',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Design Systems']
  },
  {
    id: '4',
    title: 'SEO Optimization',
    category: 'Marketing',
    icon: 'Search',
    shortDescription: 'Improve your search engine rankings and drive organic traffic',
    description: 'Comprehensive SEO services to help your website rank higher in search results. From technical SEO to content optimization, I implement strategies that drive long-term organic growth.',
    features: [
      'Technical SEO audit',
      'Keyword research and strategy',
      'On-page optimization',
      'Content optimization',
      'Link building strategies',
      'Local SEO',
      'Performance monitoring',
      'Monthly reports and analytics'
    ],
    deliverables: [
      'SEO audit report',
      'Keyword strategy document',
      'Optimized content',
      'Monthly performance reports'
    ],
    pricing: {
      type: 'Project-based',
      amount: '1,500',
      currency: 'USD'
    },
    duration: '3-6 months',
    tags: ['SEO', 'Google Analytics', 'Content', 'Marketing', 'Growth']
  },
  {
    id: '5',
    title: 'Cloud Solutions',
    category: 'Infrastructure',
    icon: 'Cloud',
    shortDescription: 'Scalable cloud infrastructure and deployment solutions',
    description: 'Design and implement cloud infrastructure on AWS, Azure, or Google Cloud. From migration to optimization, I help businesses leverage cloud technology for scalability and cost efficiency.',
    features: [
      'Cloud architecture design',
      'Migration from on-premise to cloud',
      'Auto-scaling configuration',
      'Database setup and optimization',
      'CI/CD pipeline implementation',
      'Security and compliance',
      'Cost optimization',
      '24/7 monitoring and alerts'
    ],
    deliverables: [
      'Cloud infrastructure setup',
      'Architecture documentation',
      'Deployment pipelines',
      'Monitoring dashboards'
    ],
    pricing: {
      type: 'Hourly',
      amount: '100',
      currency: 'USD'
    },
    duration: 'Ongoing',
    tags: ['AWS', 'Azure', 'GCP', 'DevOps', 'Infrastructure']
  },
  {
    id: '6',
    title: 'Digital Marketing',
    category: 'Marketing',
    icon: 'Megaphone',
    shortDescription: 'Strategic marketing campaigns to grow your online presence',
    description: 'Full-service digital marketing including social media management, PPC campaigns, email marketing, and content strategy. Drive engagement and conversions with data-driven marketing.',
    features: [
      'Social media management',
      'PPC campaign management (Google Ads, Facebook Ads)',
      'Email marketing campaigns',
      'Content marketing strategy',
      'Influencer outreach',
      'A/B testing and optimization',
      'Analytics and reporting',
      'Brand strategy consulting'
    ],
    deliverables: [
      'Campaign strategy documents',
      'Ad creatives and copy',
      'Performance reports',
      'Optimization recommendations'
    ],
    pricing: {
      type: 'Project-based',
      amount: '2,000',
      currency: 'USD'
    },
    duration: '3-6 months',
    tags: ['Social Media', 'PPC', 'Email Marketing', 'Content', 'Analytics']
  },
  {
    id: '7',
    title: 'E-commerce Solutions',
    category: 'Development',
    icon: 'ShoppingCart',
    shortDescription: 'Complete e-commerce platforms for online businesses',
    description: 'Build powerful e-commerce stores with Shopify, WooCommerce, or custom solutions. From product catalogs to payment processing, I create seamless shopping experiences.',
    features: [
      'Platform setup (Shopify, WooCommerce, Custom)',
      'Product catalog management',
      'Payment gateway integration',
      'Inventory management',
      'Order processing automation',
      'Customer account system',
      'Analytics and reporting',
      'Mobile-responsive design'
    ],
    deliverables: [
      'Fully functional online store',
      'Admin panel training',
      'Integration with shipping providers',
      'Security and compliance setup'
    ],
    pricing: {
      type: 'Project-based',
      amount: '4,000',
      currency: 'USD'
    },
    duration: '6-10 weeks',
    popular: true,
    tags: ['Shopify', 'WooCommerce', 'E-commerce', 'Payments', 'Inventory']
  },
  {
    id: '8',
    title: 'Content Writing',
    category: 'Content',
    icon: 'Pen',
    shortDescription: 'Engaging content that resonates with your audience',
    description: 'Professional content writing services including blog posts, website copy, technical documentation, and more. I create SEO-optimized content that engages and converts.',
    features: [
      'Blog post writing',
      'Website copywriting',
      'Technical documentation',
      'Product descriptions',
      'SEO content optimization',
      'Content strategy development',
      'Editing and proofreading',
      'Content calendar planning'
    ],
    deliverables: [
      'Published articles/content',
      'SEO-optimized copy',
      'Content calendar',
      'Style guide documentation'
    ],
    pricing: {
      type: 'Fixed',
      amount: '150',
      currency: 'USD'
    },
    duration: 'Per article',
    tags: ['Writing', 'SEO', 'Blogging', 'Copywriting', 'Content Strategy']
  },
  {
    id: '9',
    title: 'API Development',
    category: 'Development',
    icon: 'Database',
    shortDescription: 'RESTful and GraphQL APIs for modern applications',
    description: 'Design and develop robust, scalable APIs that power your applications. Whether REST or GraphQL, I create secure and well-documented APIs.',
    features: [
      'RESTful API design',
      'GraphQL implementation',
      'Authentication and authorization',
      'Rate limiting and security',
      'API documentation (Swagger/OpenAPI)',
      'Database design and optimization',
      'Webhook integrations',
      'API testing and monitoring'
    ],
    deliverables: [
      'Fully functional API',
      'Comprehensive documentation',
      'Postman collection',
      'Security implementation'
    ],
    pricing: {
      type: 'Project-based',
      amount: '2,500',
      currency: 'USD'
    },
    duration: '3-6 weeks',
    tags: ['REST', 'GraphQL', 'Node.js', 'API', 'Backend']
  },
  {
    id: '10',
    title: 'Consulting & Strategy',
    category: 'Consulting',
    icon: 'Users',
    shortDescription: 'Expert guidance for your digital transformation journey',
    description: 'Strategic technology consulting to help you make informed decisions. From technology stack selection to digital transformation roadmaps.',
    features: [
      'Technology assessment',
      'Architecture review',
      'Technology stack recommendations',
      'Digital transformation strategy',
      'Team training and mentorship',
      'Code review and best practices',
      'Performance optimization',
      'Scalability planning'
    ],
    deliverables: [
      'Assessment reports',
      'Recommendation documents',
      'Implementation roadmap',
      'Training sessions'
    ],
    pricing: {
      type: 'Hourly',
      amount: '150',
      currency: 'USD'
    },
    duration: 'As needed',
    tags: ['Consulting', 'Strategy', 'Architecture', 'Training', 'Mentorship']
  }
];

// Icon mapping
const iconMap: { [key: string]: React.ReactNode } = {
  'Code': <Code className="w-6 h-6" />,
  'Palette': <Palette className="w-6 h-6" />,
  'Smartphone': <Smartphone className="w-6 h-6" />,
  'Database': <Database className="w-6 h-6" />,
  'Cloud': <Cloud className="w-6 h-6" />,
  'Search': <Search className="w-6 h-6" />,
  'Megaphone': <Megaphone className="w-6 h-6" />,
  'BarChart': <BarChart className="w-6 h-6" />,
  'Pen': <Pen className="w-6 h-6" />,
  'Video': <Video className="w-6 h-6" />,
  'ShoppingCart': <ShoppingCart className="w-6 h-6" />,
  'Users': <Users className="w-6 h-6" />,
  'Settings': <Settings className="w-6 h-6" />,
};

export default function ServicePage() {
  const { appData, langI18n } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Use real data if available, otherwise use sample data
  const services = SAMPLE_SERVICES;

  // Get unique categories
  const categories = ['all', ...new Set(services.map(s => s.category))];

  // Filter services by category
  const filteredServices = selectedCategory === 'all'
      ? services
      : services.filter(s => s.category === selectedCategory);

  return (
      <>
        <PageHeading
            title={langI18n.services || "Services"}
            subTitle="Comprehensive professional services tailored to meet your unique needs and drive your success forward."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
              <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
              >
                {category === 'all' ? 'All Services' : category}
              </Button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service) => (
              <Card
                  key={service.id}
                  className={`hover:shadow-xl transition-all flex flex-col ${
                      service.popular ? 'border-2 border-primary' : ''
                  }`}
              >
                {service.popular && (
                    <div className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-4 text-center">
                      MOST POPULAR
                    </div>
                )}

                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {iconMap[service.icon] || <Settings className="w-6 h-6" />}
                    </div>
                    <Badge variant="secondary">{service.category}</Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Pricing */}
                  {service.pricing && (
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="w-5 h-5 text-primary" />
                        <div>
                          {service.pricing.type === 'Contact' ? (
                              <span className="text-lg font-semibold">Contact for pricing</span>
                          ) : (
                              <>
                        <span className="text-2xl font-bold">
                          {service.pricing.currency === 'USD' && '$'}
                          {service.pricing.amount}
                        </span>
                                <span className="text-sm text-muted-foreground ml-1">
                          {service.pricing.type === 'Hourly' && '/ hour'}
                                  {service.pricing.type === 'Fixed' && '/ item'}
                                  {service.pricing.type === 'Project-based' && '+ per project'}
                        </span>
                              </>
                          )}
                        </div>
                      </div>
                  )}

                  {/* Duration */}
                  {service.duration && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration}</span>
                      </div>
                  )}
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Key Features
                    </h4>
                    <ul className="space-y-1.5 ml-6">
                      {service.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                      ))}
                    </ul>
                    {service.features.length > 4 && (
                        <p className="text-xs text-muted-foreground ml-6">
                          +{service.features.length - 4} more features
                        </p>
                    )}
                  </div>

                  {/* Tags */}
                  {service.tags && service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {service.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                        ))}
                      </div>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button className="flex-1">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
          ))}
        </div>

        {/* Why Choose Me Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center mb-2">Why Choose My Services?</h2>
            <p className="text-center text-muted-foreground">
              Committed to delivering excellence and exceeding expectations
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick turnaround without compromising quality
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  Rigorous testing and quality control processes
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <HeadphonesIcon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Always available to assist and address concerns
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Working with clients worldwide across time zones
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together.
            Contact me today for a free consultation.
          </p>
          <Button size="lg" className="text-lg px-8">
            Contact Me Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </>
  );
}