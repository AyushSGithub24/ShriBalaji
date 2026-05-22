import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
    
      <main className="pt-20 min-h-[70vh] flex items-center justify-center">
        <div className="mx-auto max-w-xl px-4 lg:px-8 text-center">
          <div className="font-serif text-8xl md:text-9xl text-muted-foreground/20 mb-4">
            404
          </div>
          <h1 className="font-serif text-3xl md:text-4xl mb-4">
            Page not found
          </h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
            been moved or doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    
    </>
  );
}
