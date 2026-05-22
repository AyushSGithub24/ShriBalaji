import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { ProductConfigurator } from "@/components/product-configurator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found | SBA Signage",
    };
  }

  return {
    title: `${product.name} | SBA Signage`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${product.category} | SBA Signage`,
      description: product.description,
    },
  };
}

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const productImages: Record<string, string[]> = {
  "flex-banners": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  ],
  "standees": [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  ],
  "3d-letters": [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&q=80",
  ],
  "trophies": [
    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
  ],
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const images = productImages[product.slug] || [
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
  ];

  return (
    <> 
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href={`/category/${product.categorySlug}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {product.category}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Product content */}
        <section className="py-8 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Link
              href={`/category/${product.categorySlug}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {product.category}
            </Link>

            <ProductConfigurator product={product} images={images} />
          </div>
        </section>
      </main> 
    </>
  );
}
