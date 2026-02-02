"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, Star } from "lucide-react";
import ProductCard from "@/components/marketplace/product-card";

function MarketplaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [moqFilter, setMoqFilter] = useState<string | null>(null);

  // Data
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 24;
  const [hasMore, setHasMore] = useState(true);

  // ✅ Add to cart API
  const addToCart = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ Load products from Spring Boot
  useEffect(() => {
    async function loadProducts() {
      setLoadingProducts(true);
      try {
        const res = await fetch(
          `http://localhost:8080/products?page=${page}&size=${ITEMS_PER_PAGE}`
        );
        const data = await res.json();

        if (page === 0) setProducts(data);
        else setProducts((prev) => [...prev, ...data]);

        if (data.length < ITEMS_PER_PAGE) setHasMore(false);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadProducts();
  }, [page]);

  const loadMore = () => setPage((p) => p + 1);

  // ✅ Client side filtering
  const filteredProducts = products.filter((p) => {
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      p.name?.toLowerCase().includes(searchLower) ||
      p.category?.toLowerCase().includes(searchLower);

    const matchesCategory =
      categoryFilter === "all" || p.category === categoryFilter;

    const matchesPrice =
      p.base_price >= priceRange[0] && p.base_price <= priceRange[1];

    let matchesMoq = true;
    if (moqFilter === "low") matchesMoq = p.min_order_quantity < 50;
    if (moqFilter === "medium")
      matchesMoq =
        p.min_order_quantity >= 50 && p.min_order_quantity <= 200;
    if (moqFilter === "high") matchesMoq = p.min_order_quantity > 200;

    return matchesSearch && matchesCategory && matchesPrice && matchesMoq;
  });

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

  if (loadingProducts) return <MarketplaceSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 space-y-8">
          <div>
            <h3 className="font-bold mb-3">Category</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`block text-left mb-1 ${
                  categoryFilter === cat ? "font-bold text-blue-600" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-bold mb-3">Price</h3>
            <Slider
              value={priceRange}
              max={10000}
              step={100}
              onValueChange={setPriceRange}
            />
            <div className="text-sm mt-2">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">MOQ</h3>
            {["low", "medium", "high"].map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  checked={moqFilter === type}
                  onCheckedChange={(c) => setMoqFilter(c ? type : null)}
                />
                <span className="text-sm capitalize">{type}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button onClick={loadMore}>Load More</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<MarketplaceSkeleton />}>
      <MarketplaceContent />
    </Suspense>
  );
}

function MarketplaceSkeleton() {
  return (
    <div className="p-10 grid grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <Skeleton key={i} className="h-60 w-full rounded-xl" />
      ))}
    </div>
  );
}
