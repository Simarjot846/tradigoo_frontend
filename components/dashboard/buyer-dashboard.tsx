"use client";

import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ShieldCheck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect, useState, memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    Grains: "🌾",
    Pulses: "🫘",
    Oils: "🛢️",
    Spices: "🌶️",
    Sweeteners: "🍯",
    Beverages: "☕",
    Flours: "🥯",
    Fashion: "👕",
    "Body Care": "🧴",
    "Bath Products": "🛁",
    Electronics: "⌚",
  };
  return emojiMap[category] || "📦";
}

export function BuyerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("http://localhost:8080/api/products/top");
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to load products", e);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <DashboardSkeleton />;

  const recommendedProducts = products.slice(0, 5);
  const marketplacePreview = products;

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-10">
          Welcome back, {user?.name}
        </h1>

        <section className="mb-16">
          <div className="flex justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <Button onClick={() => router.push("/marketplace")}>
              Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <ScrollArea>
            <div className="flex gap-6">
              {recommendedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-6">Explore Marketplace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketplacePreview.map((p, i) => (
              <ProductGridItem key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const ProductGridItem = memo(function ProductGridItem({ product, index }: any) {
  const router = useRouter();
  return (
    <motion.div onClick={() => router.push(`/product/${product.id}`)}>
      <div className="border rounded-xl overflow-hidden cursor-pointer">
        <div className="h-48 flex items-center justify-center bg-gray-100">
          {product.imageUrl ? (
            <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
          ) : (
            getCategoryEmoji(product.category)
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p>₹{product.price}</p>
        </div>
      </div>
    </motion.div>
  );
});

const ProductCard = memo(function ProductCard({ product }: any) {
  const { addToCart } = useCart();
  return (
    <div className="w-80 border rounded-2xl p-4">
      <Badge>{product.demandLevel} Demand</Badge>
      <h3 className="font-bold mt-2">{product.name}</h3>
      <p>{product.description}</p>
      <Button
        className="mt-4 w-full"
        onClick={() => addToCart(product.id, 1)}
      >
        Add to Cart
      </Button>
    </div>
  );
});

function DashboardSkeleton() {
  return (
    <div className="p-10">
      <Skeleton className="h-10 w-64 mb-6" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
