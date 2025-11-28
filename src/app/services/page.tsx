"use client";

import React, {useState} from "react";
import {usePortfolio} from "@/components/context/PortfolioContext";
import {PageHeading} from "@/components/shared/PageHeading";
import {Card, CardContent, CardFooter, CardHeader,} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {showLucidIcon} from "@/components/lucid-icon-map";

// Sample services data - covers various professional services

export default function ServicePage() {
    const {appData, contentData, langI18n} = usePortfolio();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Use real data if available, otherwise use sample data
    const services = contentData.service_list;

    // Get unique categories
    const categories = ["all", ...new Set(services.map((s) => s.category))];

    // Filter services by category
    const filteredServices =
        selectedCategory === "all"
            ? services
            : services.filter((s) => s.category === selectedCategory);

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
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className="capitalize"
                    >
                        {category === "all" ? "All Services" : category}
                    </Button>
                ))}
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredServices.map((service) => (
                    <Card
                        key={service.id}
                        className={`hover:shadow-xl transition-all flex flex-col ${
                            service.popular ? "border-2 border-primary" : ""
                        }`}
                    >
                        {service.popular && (
                            <div
                                className="bg-primary text-primary-foreground text-xs font-semibold py-1 px-4 text-center">
                                MOST POPULAR
                            </div>
                        )}

                        <CardHeader>
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    {showLucidIcon(service.icon)}
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
                                    {showLucidIcon('dollar-sign', "w-5 h-5 text-primary")}
                                    <div>
                                        {service.pricing.type === "Contact" ? (
                                            <span className="text-lg font-semibold">
                        Contact for pricing
                      </span>
                                        ) : (
                                            <>
                        <span className="text-2xl font-bold">
                          {service.pricing.currency === "USD" && "$"}
                            {service.pricing.amount}
                        </span>
                                                <span className="text-sm text-muted-foreground ml-1">
                          {service.pricing.type === "Hourly" && "/ hour"}
                                                    {service.pricing.type === "Fixed" && "/ item"}
                                                    {service.pricing.type === "Project-based" &&
                                                        "+ per project"}
                        </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Duration */}
                            {service.duration && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {showLucidIcon('clock', "w-4 h-4")}
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
                                    {showLucidIcon('check-circle', "w-4 h-4 text-primary")}
                                    Key Features
                                </h4>
                                <ul className="space-y-1.5 ml-6">
                                    {service.features.slice(0, 4).map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="text-sm text-muted-foreground flex items-start gap-2"
                                        >
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
                                {showLucidIcon('arrow-right', "w-4 h-4 ml-2")}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Why Choose Me Section */}
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <h2 className="text-2xl font-bold text-center mb-2">
                        Why Choose My Services?
                    </h2>
                    <p className="text-center text-muted-foreground">
                        Committed to delivering excellence and exceeding expectations
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                                {showLucidIcon('zap', "w-6 h-6")}
                            </div>
                            <h3 className="font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-sm text-muted-foreground">
                                Quick turnaround without compromising quality
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                                {showLucidIcon('shield', "w-6 h-6")}
                            </div>
                            <h3 className="font-semibold mb-2">Quality Assured</h3>
                            <p className="text-sm text-muted-foreground">
                                Rigorous testing and quality control processes
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                                {showLucidIcon('headphones-icon', "w-6 h-6")}
                            </div>
                            <h3 className="font-semibold mb-2">24/7 Support</h3>
                            <p className="text-sm text-muted-foreground">
                                Always available to assist and address concerns
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-3">
                                {showLucidIcon('globe', "w-6 h-6")}
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
                    {showLucidIcon('arrow-right', "w-5 h-5 ml-2")}
                </Button>
            </div>
        </>
    );
}
