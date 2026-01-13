"use client";

import React, { useState } from "react";
import { usePortfolio } from "@/components/context/PortfolioContext";
import { PageHeading } from "@/components/shared/PageHeading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateShort } from "@/lib/helpers/date.helper";
import { ShowIcon, showLucidIcon } from "@/components/lucid-icon-map";
import {useContentLoader} from "@/components/hooks/use-content-loader";
import {Testimonial} from "@/lib/types/portfolio";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <ShowIcon
          icon={"star"}
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function TestimonialsPage() {
  const { langI18n,  profileType, languageType } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: testimonials, loading, error } = useContentLoader<Testimonial[]>(
      profileType,
      languageType,
      "testimonial_list",
      []
  );

  // Get unique categories
  const categories = ["all", ...new Set(testimonials.map((t) => t.category))];

  // Filter testimonials by category
  const filteredTestimonials =
    selectedCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === selectedCategory);

  // Separate featured and regular testimonials
  const featuredTestimonials = filteredTestimonials.filter((t) => t.featured);
  const regularTestimonials = filteredTestimonials.filter((t) => !t.featured);

  // Calculate statistics
  const totalTestimonials = testimonials.length;
  const averageRating = (
    testimonials.reduce((acc, t) => acc + t.rating, 0) / totalTestimonials
  ).toFixed(1);
  const fiveStarCount = testimonials.filter((t) => t.rating === 5).length;
  const verifiedCount = testimonials.filter((t) => t.verified).length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <PageHeading
        title={langI18n.testimonials}
        subTitle={langI18n.testimonials_sub_title}
      />

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
          <div className="flex justify-center mb-2">
            {showLucidIcon("star", "w-8 h-8 text-yellow-500 fill-yellow-500")}
          </div>
          <div className="text-3xl font-bold mb-1">{averageRating}</div>
          <div className="text-sm text-muted-foreground">
            {langI18n.average_rating}
          </div>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <div className="flex justify-center mb-2">
            {showLucidIcon("users", "w-8 h-8 text-blue-500")}
          </div>
          <div className="text-3xl font-bold mb-1">{totalTestimonials}</div>
          <div className="text-sm text-muted-foreground">
            {langI18n.happy_clients}
          </div>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <div className="flex justify-center mb-2">
            {showLucidIcon("award", "w-8 h-8 text-green-500")}
          </div>
          <div className="text-3xl font-bold mb-1">{fiveStarCount}</div>
          <div className="text-sm text-muted-foreground">
            {langI18n.five_star_reviews}
          </div>
        </Card>

        <Card className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <div className="flex justify-center mb-2">
            {showLucidIcon("thumbs-up", "w-8 h-8 text-purple-500")}
          </div>
          <div className="text-3xl font-bold mb-1">{verifiedCount}</div>
          <div className="text-sm text-muted-foreground">
            {langI18n.verified_reviews}
          </div>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === "all" ? langI18n.testimonials_all : category}
          </Button>
        ))}
      </div>

      {/* Featured Testimonials */}
      {featuredTestimonials.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            {showLucidIcon("trending-up", "w-5 h-5 text-primary")}
            <h2 className="text-2xl font-bold">
              {langI18n.featured_testimonials}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-2 border-primary hover:shadow-xl transition-all bg-gradient-to-br from-primary/5 to-transparent"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    {showLucidIcon("quote", "w-10 h-10 text-primary/20")}
                    <div className="flex items-center gap-2">
                      <StarRating rating={testimonial.rating} />
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ {langI18n.verified}
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
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {showLucidIcon("brief-case", "w-4 h-4")}
                      <span>{testimonial.company}</span>
                    </div>
                    {testimonial.location && (
                      <div className="flex items-center gap-2">
                        {showLucidIcon("map-pin", "w-4 h-4")}
                        <span>{testimonial.location}</span>
                      </div>
                    )}
                    {testimonial.project && (
                      <div className="flex items-center gap-2">
                        {showLucidIcon("award", "w-4 h-4")}
                        <span>{testimonial.project}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {showLucidIcon("calendar", "w-4 h-4")}
                      <span>{formatDateShort(testimonial.date)}</span>
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
            <h2 className="text-2xl font-bold mb-6">
              {langI18n.more_testimonials}
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    {showLucidIcon("quote", "w-8 h-8 text-muted-foreground/20")}
                    <div className="flex items-center gap-2">
                      <StarRating rating={testimonial.rating} />
                      {testimonial.verified && (
                        <Badge variant="secondary" className="text-xs">
                          ✓ {langI18n.verified}
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
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback className="text-xs">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {showLucidIcon("brief-case", "w-3 h-3")}
                      <span>{testimonial.company}</span>
                    </div>
                    {testimonial.location && (
                      <div className="flex items-center gap-2">
                        {showLucidIcon("map-pin", "w-3 h-3")}
                        <span>{testimonial.location}</span>
                      </div>
                    )}
                    {testimonial.project && (
                      <div className="flex items-center gap-2">
                        {showLucidIcon("award", "w-3 h-3")}
                        <span>{testimonial.project}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {showLucidIcon("Calendar", "w-3 h-3")}
                      <span>{formatDateShort(testimonial.date)}</span>
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
          {showLucidIcon(
            "quote",
            "w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-30",
          )}
          <h3 className="text-xl font-semibold mb-2">
            {" "}
            {langI18n.no_testimonials_found}
          </h3>
          <p className="text-muted-foreground mb-4">
            {langI18n.testimonials_selecting_different_category}
          </p>
          <Button variant="outline" onClick={() => setSelectedCategory("all")}>
            {langI18n.testimonials_show_all}
          </Button>
        </div>
      )}

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="text-center p-8">
          <h2 className="text-2xl font-bold mb-3"> {langI18n.cta_title}</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {langI18n.cta_descriptions}
          </p>
          <Button size="lg">{langI18n.cta_start_your_project}</Button>
        </CardContent>
      </Card>
    </>
  );
}
