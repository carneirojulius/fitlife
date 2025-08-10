import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { type Exercise } from "@shared/schema";

const categories = [
  { id: "all", label: "All Exercises" },
  { id: "upper", label: "Upper Body" },
  { id: "lower", label: "Lower Body" },
  { id: "core", label: "Core" },
];

export default function ExerciseGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: exercises, isLoading, error } = useQuery<Exercise[]>({
    queryKey: ["/api/exercises", selectedCategory],
  });

  if (error) {
    return (
      <section id="exercises" className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Exercise Library</h2>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Visual guides for essential strength training exercises with step-by-step instructions.
          </p>
        </div>
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-600">Failed to load exercises. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="exercises" className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Exercise Library</h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Visual guides for essential strength training exercises with step-by-step instructions.
        </p>
      </div>

      {/* Exercise Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={
              selectedCategory === category.id
                ? "bg-primary text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white"
            }
            variant={selectedCategory === category.id ? "default" : "outline"}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Exercise Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-40" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))
          : exercises?.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={exercise.imageUrl}
                  alt={exercise.name}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <CardContent className="p-4">
                  <h4 className="font-semibold text-neutral-900 mb-2">{exercise.name}</h4>
                  <p className="text-sm text-neutral-500 mb-3">{exercise.targetMuscles}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        exercise.difficulty === "Beginner"
                          ? "bg-primary/10 text-primary"
                          : exercise.difficulty === "Intermediate"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {exercise.difficulty}
                    </Badge>
                    <Link
                      href={`/exercises/${exercise.slug}`}
                      className="text-primary hover:text-secondary text-sm font-medium transition-colors duration-200"
                    >
                      View Guide
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </section>
  );
}
