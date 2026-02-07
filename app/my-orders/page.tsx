// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Package, ArrowRight } from "lucide-react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";

// export default function MyOrdersPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await fetch("http://localhost:8080/orders/my", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setOrders(data || []);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrders();
//   }, []);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "ORDER_CREATED":
//         return "bg-blue-500/10 text-blue-400 border-blue-500/20";
//       case "SHIPPED":
//         return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
//       case "DELIVERED":
//         return "bg-green-500/10 text-green-400 border-green-500/20";
//       case "COMPLETED":
//         return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//       default:
//         return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading orders...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-10">
//       <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
//         <Package /> My Orders
//       </h1>

//       {orders.length === 0 ? (
//         <div>No orders found</div>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, i) => (
//             <motion.div
//               key={order.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.05 }}
//               onClick={() => router.push(`/order/${order.id}`)}
//               className="cursor-pointer"
//             >
//               <Card className="p-6 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 bg-zinc-200 rounded-xl overflow-hidden">
//                     {order.product?.imageUrl ? (
//                       <img
//                         src={order.product.imageUrl}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       "📦"
//                     )}
//                   </div>

//                   <div>
//                     <div className="text-sm text-zinc-500">
//                       #{order.id.slice(0, 8)}
//                     </div>
//                     <div className="font-bold text-lg">
//                       {order.product?.name}
//                     </div>
//                     <div className="text-sm text-zinc-500">
//                       Qty: {order.quantity}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   <Badge
//                     className={`${getStatusColor(
//                       order.status
//                     )} border px-3 py-1`}
//                   >
//                     {order.status.replace(/_/g, " ")}
//                   </Badge>
//                   <div className="font-bold text-lg">
//                     ₹{order.totalAmount?.toLocaleString()}
//                   </div>
//                 </div>

//                 <ArrowRight />
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const API = "http://localhost:8080";

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/orders/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to fetch orders", e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ORDER_CREATED":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "SHIPPED":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "DELIVERED":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-10">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Package className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20 text-zinc-500">
          No orders found
        </div>
      ) : (
        <div className="space-y-4 max-w-5xl">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => router.push(`/order/${order.id}`)}
              className="cursor-pointer"
            >
              <Card className="p-6 flex items-center justify-between gap-6 hover:shadow-lg transition-all">
                {/* Product */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden flex items-center justify-center">
                    {order.product?.imageUrl ? (
                      <img
                        src={order.product.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>

                  <div>
                    <div className="text-xs text-zinc-500 font-mono">
                      #{order.id.slice(0, 8)}
                    </div>
                    <div className="font-bold text-lg">
                      {order.product?.name || "Unknown Product"}
                    </div>
                    <div className="text-sm text-zinc-500">
                      Supplier: {order.seller?.businessName || "Seller"}
                    </div>
                    <div className="text-sm text-zinc-500">
                      Qty: {order.quantity} {order.product?.unit}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} border px-3 py-1`}
                  >
                    {order.status.replace(/_/g, " ")}
                  </Badge>
                  <div className="font-bold text-lg">
                    ₹{order.totalAmount?.toLocaleString()}
                  </div>
                </div>

                <ArrowRight className="text-zinc-400" />
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
