import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type BlogPost } from "@shared/schema";

export default function FeaturedArticles() {
  const { data: articles, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  if (error) {
    return (
      <section id="featured-articles" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Latest Articles</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Expert-backed strength training guides to help you build muscle, increase power, and achieve your fitness goals.
          </p>
        </div>
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">Failed to load articles. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="featured-articles" className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Latest Articles</h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Expert-backed strength training guides to help you build muscle, increase power, and achieve your fitness goals.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </div>
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-6 w-20" />
                </CardContent>
              </Card>
            ))
          : articles?.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge
                      variant="secondary"
                      className={`${
                        article.category === "Strength"
                          ? "bg-primary/10 text-primary hover:bg-primary/20"
                          : article.category === "Technique"
                          ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                          : "bg-accent/10 text-accent hover:bg-accent/20"
                      }`}
                    >
                      {article.category}
                    </Badge>
                    <div className="text-neutral-400 text-sm ml-auto flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.publishDate}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{article.title}</h3>
                  <p className="text-neutral-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-primary hover:text-secondary font-semibold inline-flex items-center transition-colors duration-200"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  );
}
