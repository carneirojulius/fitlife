import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Hero from "@/components/hero";
import FeaturedArticles from "@/components/featured-articles";
import ExerciseGrid from "@/components/exercise-grid";
import NewsletterSignup from "@/components/newsletter-signup";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { type Equipment } from "@shared/schema";

export default function Home() {
  const { data: equipment, isLoading: equipmentLoading, error: equipmentError } = useQuery<Equipment[]>({
    queryKey: ["/api/equipment"],
  });

  return (
    <>
      <Header />
      <Hero />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedArticles />
        <ExerciseGrid />

        {/* Equipment Showcase Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Essential Equipment</h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              Quality equipment recommendations to support your strength training journey.
            </p>
          </div>

          {equipmentError ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-600">Failed to load equipment. Please try again later.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipmentLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index} className="overflow-hidden">
                      <Skeleton className="w-full h-40" />
                      <CardContent className="p-4">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-5 w-20" />
                      </CardContent>
                    </Card>
                  ))
                : equipment?.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                        loading="lazy"
                      />
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-neutral-900 mb-2">{item.name}</h4>
                        <p className="text-sm text-neutral-500 mb-2">{item.description}</p>
                        <div className="text-secondary font-bold">{item.priceRange}</div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          )}
        </section>

        <NewsletterSignup />
      </main>

      <Footer />
    </>
  );
}
