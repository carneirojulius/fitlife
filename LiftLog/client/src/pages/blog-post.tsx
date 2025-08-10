import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { type BlogPost } from "@shared/schema";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts", slug],
    enabled: !!slug,
  });

  // Estimate reading time (average 200 words per minute)
  const estimateReadingTime = (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return minutes;
  };

  if (error) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Article Not Found</h1>
            <p className="text-red-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
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
            <Skeleton className="h-10 w-32" />
          </div>
          
          <article className="prose prose-lg max-w-none">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="w-full h-80 mb-8 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </article>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center p-8 bg-neutral-50 rounded-lg">
            <h1 className="text-2xl font-bold text-neutral-600 mb-4">Article Not Found</h1>
            <p className="text-neutral-600 mb-6">The article you're looking for doesn't exist.</p>
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
              Back to Articles
            </Button>
          </Link>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge
                variant="secondary"
                className={`${
                  post.category === "Strength"
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : post.category === "Technique"
                    ? "bg-secondary/10 text-secondary hover:bg-secondary/20"
                    : "bg-accent/10 text-accent hover:bg-accent/20"
                }`}
              >
                {post.category}
              </Badge>
              
              <div className="flex items-center text-neutral-500 text-sm">
                <Calendar className="mr-1 h-4 w-4" />
                {post.publishDate}
              </div>
              
              <div className="flex items-center text-neutral-500 text-sm">
                <Clock className="mr-1 h-4 w-4" />
                {estimateReadingTime(post.content)} min read
              </div>
            </div>

            <div className="aspect-video rounded-lg overflow-hidden bg-neutral-100 mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </header>

          <div className="text-neutral-700 leading-relaxed space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-neutral-900 mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-neutral-900 mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.startsWith('- ')) {
                // Handle lists
                const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-neutral-700">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              } else if (paragraph.match(/^\d+\./)) {
                // Handle numbered lists
                const listItems = paragraph.split('\n').filter(item => item.match(/^\d+\./));
                return (
                  <ol key={index} className="list-decimal pl-6 space-y-2">
                    {listItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-neutral-700">
                        {item.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                );
              } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-neutral-900">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              } else if (paragraph.trim()) {
                return (
                  <p key={index} className="text-neutral-700 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </article>

        {/* Back to Articles */}
        <div className="text-center mt-12">
          <Link href="/#featured-articles">
            <Button size="lg">Read More Articles</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
