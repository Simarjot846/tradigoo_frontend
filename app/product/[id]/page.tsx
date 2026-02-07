// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function ProductDetailPage() {
//   const router = useRouter();
//   const params = useParams();

//   const [product, setProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState(0);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     const res = await fetch(
//       `http://localhost:8080/products/${params.id}`
//     );
//     const data = await res.json();
//     setProduct(data);
//     setQuantity(data.minOrderQuantity);
//     setLoading(false);
//   };

//   if (loading) return <div className="p-10">Loading...</div>;
//   if (!product) return <div>Product not found</div>;

//   const total = quantity * product.basePrice;
//   const profit = total * (product.expectedMargin / 100);

//   const handleOrder = () => {
//     router.push(
//       `/order/confirm?productId=${product.id}&qty=${quantity}`
//     );
//   };

//   return (
//     <div className="p-10 grid lg:grid-cols-2 gap-10">
//       {/* LEFT */}
//       <div>
//         <img
//           src={product.imageUrl}
//           className="rounded-xl border"
//         />
//       </div>

//       {/* RIGHT */}
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold">{product.name}</h1>
//         <p>{product.description}</p>

//         <div className="border p-4 rounded-lg">
//           <p>Base Price: ₹{product.basePrice} / {product.unit}</p>
//           <p>Min Order: {product.minOrderQuantity}</p>
//           <p>Expected Margin: {product.expectedMargin}%</p>
//         </div>

//         <div>
//           <label>Quantity</label>
//           <Input
//             type="number"
//             min={product.minOrderQuantity}
//             value={quantity}
//             onChange={(e) =>
//               setQuantity(Number(e.target.value))
//             }
//           />
//         </div>

//         <div className="border p-4 rounded-lg">
//           <p>Total: ₹{total}</p>
//           <p className="text-green-600">
//             Est Profit: ₹{profit}
//           </p>
//         </div>

//         <Button
//           onClick={handleOrder}
//           disabled={quantity < product.minOrderQuantity}
//         >
//           Place Order
//         </Button>
//       </div>
//     </div>
//   );
// }



// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation';
// import { useAuth } from '@/lib/auth-context';

// import { Card } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   ArrowLeft,
//   TrendingUp,
//   ShieldCheck,
//   ShoppingCart,
//   Zap,
//   Star,
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { getDemandBadgeColor } from '@/lib/ai-recommendations';

// export default function ProductDetailPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const params = useParams();

//   const [product, setProduct] = useState<any>(null);
//   const [quantity, setQuantity] = useState(0);
//   const [loadingProduct, setLoadingProduct] = useState(true);

//   // 🔐 Auth guard
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/auth/login');
//     }
//   }, [user, loading, router]);

//   // 📦 Fetch product from Spring Boot
//   const fetchProduct = async () => {
//   try {
//     const res = await fetch(
//       `http://localhost:8080/products/${params.id}`
//     );

//     // Handle 404 cleanly
//     if (res.status === 404) {
//       setProduct(null);
//       return;
//     }

//     // Handle auth issues
//     if (res.status === 401 || res.status === 403) {
//       router.push('/auth/login');
//       return;
//     }

//     if (!res.ok) {
//       throw new Error(`Server error: ${res.status}`);
//     }

//     const data = await res.json();

//     setProduct(data);
//     setQuantity(data.minOrderQuantity);
//   } catch (error) {
//     console.error('Fetch product failed:', error);
//     setProduct(null);
//   } finally {
//     setLoadingProduct(false);
//   }
// };

//   const totalAmount = quantity * product.basePrice;
//   const expectedProfit =
//     totalAmount * (product.expectedMargin / 100);

//   const handlePlaceOrder = () => {
//     sessionStorage.setItem(
//       'pendingOrder',
//       JSON.stringify({
//         productId: product.id,
//         productName: product.name,
//         quantity,
//         unitPrice: product.basePrice,
//         totalAmount,
//         expectedProfit,
//       })
//     );
//     router.push('/order/confirm');
//   };

//   return (
//     <div className="min-h-screen bg-background dark:bg-zinc-950">
//       <main className="container mx-auto px-6 py-10">
//         {/* Back */}
//         <Button
//           variant="ghost"
//           onClick={() => router.back()}
//           className="mb-6"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back
//         </Button>

//         <div className="grid lg:grid-cols-2 gap-10">
//           {/* LEFT */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className="rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden">
//               {product.imageUrl ? (
//                 <img
//                   src={product.imageUrl}
//                   alt={product.name}
//                   className="w-full h-80 object-contain"
//                 />
//               ) : (
//                 <div className="h-80 flex items-center justify-center text-7xl">
//                   {getCategoryEmoji(product.category)}
//                 </div>
//               )}

//               <div className="absolute top-4 right-4">
//                 <Badge
//                   className={`${getDemandBadgeColor(
//                     product.demandLevel
//                   )}`}
//                 >
//                   {product.demandLevel} Demand
//                 </Badge>
//               </div>
//             </div>

//             {/* AI Insight */}
//             <Card className="mt-6 p-6">
//               <div className="flex items-center gap-2 mb-3">
//                 <Zap className="text-blue-500" />
//                 <h3 className="font-bold">AI Market Insight</h3>
//               </div>
//               <p className="text-zinc-600">
//                 “{product.recommendationReason}”
//               </p>
//               <div className="flex gap-4 mt-4 text-sm">
//                 <span className="flex items-center gap-1">
//                   <TrendingUp className="w-4 h-4 text-green-500" />
//                   High Margin
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Star className="w-4 h-4 text-yellow-500" />
//                   Trusted Suppliers
//                 </span>
//               </div>
//             </Card>
//           </motion.div>

//           {/* RIGHT */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="space-y-6"
//           >
//             <div>
//               <h1 className="text-4xl font-bold mb-2">
//                 {product.name}
//               </h1>
//               <p className="text-zinc-500">{product.description}</p>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 gap-4">
//               <Stat label="Base Price" value={`₹${product.basePrice}/${product.unit}`} />
//               <Stat label="Min Order" value={`${product.minOrderQuantity} ${product.unit}`} />
//               <Stat label="Expected Margin" value={`${product.expectedMargin}%`} />
//               <Stat label="Suppliers" value={product.supplierCount} />
//             </div>

//             {/* Order Box */}
//             <Card className="p-6">
//               <h3 className="font-bold flex items-center gap-2 mb-4">
//                 <ShoppingCart className="w-5 h-5" />
//                 Configure Order
//               </h3>

//               <Label>Quantity</Label>
//               <Input
//                 type="number"
//                 min={product.minOrderQuantity}
//                 value={quantity}
//                 onChange={(e) =>
//                   setQuantity(Number(e.target.value))
//                 }
//               />

//               <div className="mt-4 space-y-2">
//                 <div className="flex justify-between">
//                   <span>Total</span>
//                   <span>₹{totalAmount.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-green-600">
//                   <span>Est. Profit</span>
//                   <span>₹{expectedProfit.toLocaleString()}</span>
//                 </div>
//               </div>

//               <Button
//                 onClick={handlePlaceOrder}
//                 disabled={quantity < product.minOrderQuantity}
//                 className="w-full mt-6"
//               >
//                 Place Secure Order
//                 <ShieldCheck className="ml-2 w-4 h-4" />
//               </Button>
//             </Card>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function Stat({ label, value }: any) {
//   return (
//     <div className="p-4 rounded-xl border">
//       <div className="text-xs text-zinc-500">{label}</div>
//       <div className="text-lg font-bold">{value}</div>
//     </div>
//   );
// }

// function getCategoryEmoji(category: string) {
//   const map: any = {
//     Grains: '🌾',
//     Pulses: '🫘',
//     Oils: '🛢️',
//     Spices: '🌶️',
//     Sweeteners: '🍯',
//     Beverages: '☕',
//     Flours: '🥯',
//     Electronics: '⌚',
//   };
//   return map[category] || '📦';
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import {
  ArrowLeft,
  ShoppingCart,
  ShieldCheck,
  TrendingUp,
  Star,
} from 'lucide-react';

import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // 📦 Fetch product from Spring Boot
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `http://localhost:8080/products/${params.id}`
        );

        if (res.status === 404) {
          setError('Product not found');
          return;
        }

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        setProduct(data);
        setQuantity(data.minOrderQuantity);
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoadingProduct(false);
      }
    }

    if (user && !loading) {
      fetchProduct();
    }
  }, [params.id, user, loading]);

  // ⏳ Loading UI
  if (loading || loadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  // ❌ Error / Not Found UI
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">{error}</h2>
        <Button onClick={() => router.push('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  // ✅ SAFE calculations (product is guaranteed here)
  const totalAmount = quantity * product.basePrice;
  const expectedProfit =
    totalAmount * (product.expectedMargin / 100);

  const handlePlaceOrder = () => {
    sessionStorage.setItem(
      'pendingOrder',
      JSON.stringify({
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.basePrice,
        totalAmount,
        expectedProfit,
      })
    );
    router.push('/order/confirm');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="container mx-auto px-6 py-10">
        {/* Back */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="overflow-hidden">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="h-80 flex items-center justify-center text-7xl">
                  📦
                </div>
              )}
            </Card>

            {/* Insights */}
            <Card className="p-6 mt-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="text-green-500" />
                <h3 className="font-bold">Market Insight</h3>
              </div>
              <p className="text-zinc-600">
                {product.recommendationReason}
              </p>
              <div className="flex gap-4 mt-4 text-sm">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  High Demand
                </span>
              </div>
            </Card>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {product.name}
              </h1>
              <p className="text-zinc-500">{product.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Base Price" value={`₹${product.basePrice}/${product.unit}`} />
              <Stat label="Min Order" value={`${product.minOrderQuantity} ${product.unit}`} />
              <Stat label="Expected Margin" value={`${product.expectedMargin}%`} />
              <Stat label="Suppliers" value={product.supplierCount} />
            </div>

            {/* Order */}
            <Card className="p-6">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <ShoppingCart className="w-5 h-5" />
                Place Order
              </h3>

              <Label>Quantity</Label>
              <Input
                type="number"
                min={product.minOrderQuantity}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
              />

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Est. Profit</span>
                  <span>₹{expectedProfit.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={quantity < product.minOrderQuantity}
                className="w-full mt-6"
              >
                Place Secure Order
                <ShieldCheck className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Helper ---------- */
function Stat({ label, value }: { label: string; value: any }) {
  return (
    <div className="p-4 rounded-xl border">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}
