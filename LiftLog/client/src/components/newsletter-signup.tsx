import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    newsletterMutation.mutate(email);
  };

  return (
    <section className="gradient-primary rounded-2xl text-white p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Stay Strong, Stay Informed</h2>
      <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
        Get weekly workout tips, exercise guides, and nutrition advice delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white text-neutral-900 placeholder:text-neutral-500"
          required
          disabled={newsletterMutation.isPending}
        />
        <Button
          type="submit"
          disabled={newsletterMutation.isPending}
          className="bg-secondary hover:bg-secondary/90 px-6 py-2 font-semibold"
        >
          {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      <p className="text-sm text-white/70 mt-4">No spam, unsubscribe anytime.</p>
    </section>
  );
}
