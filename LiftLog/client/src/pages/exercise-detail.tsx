import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Target, BarChart3, CheckCircle } from "lucide-react";
import { type Exercise } from "@shared/schema";

export default function ExerciseDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: exercise, isLoading, error } = useQuery<Exercise>({
    queryKey: ["/api/exercises", slug],
    enabled: !!slug,
  });

  if (error) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Exercise Not Found</h1>
            <p className="text-red-600 mb-6">The exercise you're looking for doesn't exist or has been removed.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-6">
            <Skeleton className="h-10 w-32 mb-4" />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Skeleton className="w-full h-80 rounded-lg" />
            
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!exercise) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center p-8 bg-neutral-50 rounded-lg">
            <h1 className="text-2xl font-bold text-neutral-600 mb-4">Exercise Not Found</h1>
            <p className="text-neutral-600 mb-6">The exercise you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Exercises
            </Button>
          </Link>
        </div>

        {/* Exercise Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="aspect-video rounded-lg overflow-hidden bg-neutral-100">
            <img
              src={exercise.imageUrl}
              alt={exercise.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {exercise.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge
                  variant="secondary"
                  className={`${
                    exercise.difficulty === "Beginner"
                      ? "bg-primary/10 text-primary"
                      : exercise.difficulty === "Intermediate"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  <BarChart3 className="mr-1 h-3 w-3" />
                  {exercise.difficulty}
                </Badge>
                
                <Badge variant="outline" className="text-neutral-600">
                  <Target className="mr-1 h-3 w-3" />
                  {exercise.targetMuscles}
                </Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Instructions</h3>
              <p className="text-neutral-600 leading-relaxed">{exercise.instructions}</p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Pro Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {exercise.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-neutral-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">Primary Muscles</h4>
                <p className="text-neutral-600">{exercise.targetMuscles}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">Difficulty Level</h4>
                <p className="text-neutral-600">{exercise.difficulty}</p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium text-neutral-900 mb-2">Category</h4>
                <p className="text-neutral-600 capitalize">
                  {exercise.category === "upper" ? "Upper Body" : 
                   exercise.category === "lower" ? "Lower Body" : 
                   exercise.category === "core" ? "Core" : exercise.category}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to Exercises */}
        <div className="text-center mt-12">
          <Link href="/#exercises">
            <Button size="lg">View More Exercises</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
