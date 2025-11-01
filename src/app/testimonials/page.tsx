"use client";

import React, { useState } from 'react';
import { usePortfolio } from '@/components/context/PortfolioContext';
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Star,
  Quote,
  Briefcase,
  MapPin,
  Calendar,
  TrendingUp,
  Award,
  Users,
  ThumbsUp
} from 'lucide-react';

// Testimonial interface
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location?: string;
  avatar?: string;
  rating: number;
  testimonial: string;
  date: string;
  project?: string;
  category: string;
  featured?: boolean;
  verified?: boolean;
}

// Sample testimonials data
const SAMPLE_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    company: 'TechStart Inc.',
    location: 'San Francisco, CA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
    testimonial: 'Absolutely exceptional work! The web application exceeded all our expectations. The attention to detail, clean code, and professional communication throughout the project made this a seamless experience. I highly recommend their services to anyone looking for top-tier development work.',
    date: '2024-10-15',
    project: 'E-commerce Platform',
    category: 'Web Development',
    featured: true,
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'Digital Solutions Ltd',
    location: 'New York, NY',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    rating: 5,
    testimonial: 'Working with this developer was a game-changer for our project. They brought creative solutions to complex problems and delivered a mobile app that our users absolutely love. The performance is outstanding and the UI is intuitive. Highly professional!',
    date: '2024-09-22',
    project: 'Mobile Fitness App',
    category: 'Mobile Development',
    featured: true,
    verified: true
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Brand Boost Agency',
    location: 'Los Angeles, CA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    rating: 5,
    testimonial: 'The SEO optimization service transformed our online presence. Within 3 months, we saw a 250% increase in organic traffic. The comprehensive strategy and regular reporting kept us informed every step of the way. Worth every penny!',
    date: '2024-09-10',
    project: 'SEO Campaign',
    category: 'Digital Marketing',
    verified: true
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'CTO',
    company: 'CloudTech Systems',
    location: 'Seattle, WA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    rating: 5,
    testimonial: 'Outstanding cloud architecture work! They migrated our entire infrastructure to AWS with zero downtime. The auto-scaling and cost optimization strategies saved us 40% on our monthly cloud bills. True expertise in cloud technologies.',
    date: '2024-08-28',
    project: 'Cloud Migration',
    category: 'Cloud Solutions',
    featured: true,
    verified: true
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    role: 'UX Lead',
    company: 'Creative Studio Co',
    location: 'Austin, TX',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
    rating: 5,
    testimonial: 'The UI/UX design work was phenomenal. They really understood our users and created an interface that increased our conversion rate by 85%. The design system they created is now the foundation for all our products.',
    date: '2024-08-15',
    project: 'SaaS Dashboard Redesign',
    category: 'UI/UX Design',
    verified: true
  },
  {
    id: '6',
    name: 'Robert Kim',
    role: 'Founder',
    company: 'E-Shop Plus',
    location: 'Chicago, IL',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    rating: 5,
    testimonial: 'Built our Shopify store from scratch and it looks amazing! The custom features they developed set us apart from competitors. Sales increased 3x in the first month alone. Highly recommended for e-commerce projects!',
    date: '2024-07-30',
    project: 'Shopify Store',
    category: 'E-commerce',
    verified: true
  },
  {
    id: '7',
    name: 'Amanda Lewis',
    role: 'Content Manager',
    company: 'BlogHub Media',
    location: 'Boston, MA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
    rating: 5,
    testimonial: 'The content writing service delivered exactly what we needed. SEO-optimized, engaging articles that resonate with our audience. Our blog traffic doubled and engagement metrics are through the roof. Will definitely work together again!',
    date: '2024-07-18',
    project: 'Content Strategy',
    category: 'Content Writing',
    verified: true
  },
  {
    id: '8',
    name: 'James Wilson',
    role: 'Operations Manager',
    company: 'LogiTrack Systems',
    location: 'Denver, CO',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 5,
    testimonial: 'The API they developed is rock solid. Handles millions of requests daily without any issues. Documentation was clear and comprehensive. Integration was smooth and their ongoing support has been excellent.',
    date: '2024-06-25',
    project: 'RESTful API',
    category: 'API Development',
    verified: true
  },
  {
    id: '9',
    name: 'Lisa Anderson',
    role: 'VP of Technology',
    company: 'FinServe Inc',
    location: 'Miami, FL',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    rating: 5,
    testimonial: 'Their consulting services helped us make critical technology decisions that saved our project. The architecture review identified bottlenecks we didn\'t know existed. Their expertise and guidance were invaluable.',
    date: '2024-06-10',
    project: 'Tech Consulting',
    category: 'Consulting',
    featured: true,
    verified: true
  },
  {
    id: '10',
    name: 'Chris Parker',
    role: 'Entrepreneur',
    company: 'StartUp Ventures',
    location: 'Portland, OR',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
    rating: 4,
    testimonial: 'Great experience overall! Communication was excellent and the final product met our requirements. There were a few minor delays but they kept us informed. Would work with them again on future projects.',
    date: '2024-05-28',
    project: 'MVP Development',
    category: 'Web Development',
    verified: true
  },
  {
    id: '11',
    name: 'Nicole Brown',
    role: 'Brand Manager',
    company: 'Style & Co',
    location: 'Nashville, TN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nicole',
    rating: 5,
    testimonial: 'The digital marketing campaign exceeded our goals. Social media engagement increased 300% and our brand awareness skyrocketed. They really understand how to connect with audiences and drive results.',
    date: '2024-05-15',
    project: 'Social Media Campaign',
    category: 'Digital Marketing',
    verified: true
  },
  {
    id: '12',
    name: 'Tom Mitchell',
    role: 'Senior Developer',
    company: 'CodeCraft Labs',
    location: 'San Diego, CA',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
    rating: 5,
    testimonial: 'Fantastic code quality and best practices. They reviewed our codebase and provided actionable recommendations that improved our app performance by 60%. True expert in their field!',
    date: '2024-04-20',
    project: 'Code Review',
    category: 'Consulting',
    verified: true
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <Star
                key={star}
                className={`w-4 h-4 ${
                    star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                }`}
            />
        ))}
      </div>
  );
};

export default function TestimonialsPage() {
  const { appData, langI18n } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Use real data if available, otherwise use sample data
  const testimonials = SAMPLE_TESTIMONIALS;

  // Get unique categories
  const categories = ['all', ...new Set(testimonials.map(t => t.category))];

  // Filter testimonials by category
  const filteredTestimonials = selectedCategory === 'all'
      ? testimonials
      : testimonials.filter(t => t.category === selectedCategory);

  // Separate featured and regular testimonials
  const featuredTestimonials = filteredTestimonials.filter(t => t.featured);
  const regularTestimonials = filteredTestimonials.filter(t => !t.featured);

  // Calculate statistics
  const totalTestimonials = testimonials.length;
  const averageRating = (testimonials.reduce((acc, t) => acc + t.rating, 0) / totalTestimonials).toFixed(1);
  const fiveStarCount = testimonials.filter(t => t.rating === 5).length;
  const verifiedCount = testimonials.filter(t => t.verified).length;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
  };

  return (
      <>
        <PageHeading
            title={langI18n.testimonials || "Testimonials"}
            subTitle="Real feedback from real clients. Discover what people are saying about working with me and the results we've achieved together."
        />

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
            <div className="flex justify-center mb-2">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{averageRating}</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <div className="flex justify-center mb-2">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{totalTestimonials}</div>
            <div className="text-sm text-muted-foreground">Happy Clients</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <div className="flex justify-center mb-2">
              <Award className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{fiveStarCount}</div>
            <div className="text-sm text-muted-foreground">5-Star Reviews</div>
          </Card>

          <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <div className="flex justify-center mb-2">
              <ThumbsUp className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-3xl font-bold mb-1">{verifiedCount}</div>
            <div className="text-sm text-muted-foreground">Verified Reviews</div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
              <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
              >
                {category === 'all' ? 'All Testimonials' : category}
              </Button>
          ))}
        </div>

        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Featured Testimonials</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTestimonials.map((testimonial) => (
                    <Card
                        key={testimonial.id}
                        className="border-2 border-primary hover:shadow-xl transition-all bg-gradient-to-br from-primary/5 to-transparent"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <Quote className="w-10 h-10 text-primary/20" />
                          <div className="flex items-center gap-2">
                            <StarRating rating={testimonial.rating} />
                            {testimonial.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  ✓ Verified
                                </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 italic line-clamp-4">
                          "{testimonial.testimonial}"
                        </p>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{testimonial.company}</span>
                          </div>
                          {testimonial.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{testimonial.location}</span>
                              </div>
                          )}
                          {testimonial.project && (
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                <span>{testimonial.project}</span>
                              </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(testimonial.date)}</span>
                          </div>
                        </div>

                        <Badge variant="outline" className="mt-3">
                          {testimonial.category}
                        </Badge>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
        )}

        {/* Regular Testimonials */}
        {regularTestimonials.length > 0 && (
            <div>
              {featuredTestimonials.length > 0 && (
                  <h2 className="text-2xl font-bold mb-6">More Testimonials</h2>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularTestimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <Quote className="w-8 h-8 text-muted-foreground/20" />
                          <div className="flex items-center gap-2">
                            <StarRating rating={testimonial.rating} />
                            {testimonial.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  ✓ Verified
                                </Badge>
                            )}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 text-sm line-clamp-4">
                          "{testimonial.testimonial}"
                        </p>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="text-xs">{getInitials(testimonial.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-sm">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-3 h-3" />
                            <span>{testimonial.company}</span>
                          </div>
                          {testimonial.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>{testimonial.location}</span>
                              </div>
                          )}
                          {testimonial.project && (
                              <div className="flex items-center gap-2">
                                <Award className="w-3 h-3" />
                                <span>{testimonial.project}</span>
                              </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(testimonial.date)}</span>
                          </div>
                        </div>

                        <Badge variant="outline" className="mt-3 text-xs">
                          {testimonial.category}
                        </Badge>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
        )}

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <Quote className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-semibold mb-2">No testimonials found</h3>
              <p className="text-muted-foreground mb-4">
                Try selecting a different category.
              </p>
              <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                Show All Testimonials
              </Button>
            </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-3">Want to Work Together?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join these satisfied clients and let's create something amazing together.
              I'm committed to delivering exceptional results that exceed your expectations.
            </p>
            <Button size="lg">
              Start Your Project
            </Button>
          </CardContent>
        </Card>
      </>
  );
}