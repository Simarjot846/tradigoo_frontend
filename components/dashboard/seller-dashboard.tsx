// "use client";

// import { useAuth } from "@/lib/auth-context";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Package, Truck, Plus } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// export function SellerDashboard() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [inventory, setInventory] = useState<any[]>([]);
//   const [pendingOrders, setPendingOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   async function loadData() {
//     try {
//       const [invRes, orderRes] = await Promise.all([
//         fetch("http://localhost:8080/api/seller/products"),
//         fetch("http://localhost:8080/api/seller/pending-orders"),
//       ]);

//       setInventory(await invRes.json());
//       setPendingOrders(await orderRes.json());
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to load dashboard");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     if (user) loadData();
//   }, [user]);

//   async function markShipped(orderId: string) {
//     toast.loading("Marking as shipped...");
//     await fetch(`http://localhost:8080/api/orders/${orderId}/ship`, {
//       method: "PUT",
//     });
//     toast.success("Order marked shipped");
//     setPendingOrders((p) => p.filter((o) => o.id !== orderId));
//   }

//   if (loading) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="p-10 space-y-10">
//       <div className="flex justify-between">
//         <h1 className="text-3xl font-bold">Seller Dashboard</h1>
//         <AddProductDialog onAdded={loadData}>
//           <Button>
//             <Plus className="mr-2 w-4 h-4" /> Add Product
//           </Button>
//         </AddProductDialog>
//       </div>

//       <Card className="p-6">
//         <h2 className="text-xl font-bold mb-4">Pending Orders</h2>
//         {pendingOrders.map((o) => (
//           <div key={o.id} className="flex justify-between py-2 border-b">
//             <div>
//               #{o.id.slice(0, 6)} — {o.productName}
//             </div>
//             <Button size="sm" onClick={() => markShipped(o.id)}>
//               <Truck className="mr-1 w-4 h-4" /> Ship
//             </Button>
//           </div>
//         ))}
//       </Card>

//       <Card className="p-6">
//         <h2 className="text-xl font-bold mb-4">Inventory</h2>
//         {inventory.map((p) => (
//           <div key={p.id} className="py-2 border-b">
//             {p.name} — ₹{p.price}
//           </div>
//         ))}
//       </Card>
//     </div>
//   );
// }

// function AddProductDialog({ children, onAdded }: any) {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   async function submit(e: any) {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("name", name);
//     form.append("price", price);
//     if (file) form.append("image", file);

//     await fetch("http://localhost:8080/api/products", {
//       method: "POST",
//       body: form,
//     });

//     toast.success("Product added");
//     setOpen(false);
//     onAdded();
//   }

//   return (
//     <>
//       <div onClick={() => setOpen(true)}>{children}</div>
//       {open && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
//           <form onSubmit={submit} className="bg-white p-6 space-y-4 rounded-xl w-96">
//             <input
//               className="border p-2 w-full"
//               placeholder="Product name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//             <input
//               className="border p-2 w-full"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//             <Button type="submit" className="w-full">
//               Save
//             </Button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// }



"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Box,
  MoreHorizontal,
  TrendingUp,
} from "lucide-react";

export function SellerDashboard() {
  return (
    <div className="px-8 py-6 space-y-8 bg-zinc-50 min-h-screen">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-500">
          Manage your store and orders efficiently.
        </p>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL REVENUE */}
        <Card className="p-6 rounded-2xl">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-zinc-500">TOTAL REVENUE</p>
              <h2 className="text-3xl font-bold mt-1">₹45.2K</h2>
              <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                +12.5% vs last month
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>

          {/* BAR CHART */}
          <div className="flex items-end gap-2 mt-6 h-24">
            {[20, 35, 25, 45, 30, 55, 40, 60].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="w-full rounded-md bg-gradient-to-t from-purple-500 to-purple-300"
              />
            ))}
          </div>
        </Card>

        {/* LOW STOCK */}
        <Card className="p-6 rounded-2xl">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertTriangle className="text-red-600" />
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-red-100 text-red-600">
              Action Needed
            </span>
          </div>

          <h2 className="text-3xl font-bold mt-6">0 Products</h2>
          <p className="text-zinc-500">Low stock alert</p>

          <p className="text-xs text-zinc-400 mt-6 uppercase">
            Restock Priority
          </p>
        </Card>

        {/* BEST SELLER */}
        <Card className="p-6 rounded-2xl">
          <div className="p-3 bg-blue-100 w-fit rounded-xl">
            <Box className="text-blue-600" />
          </div>

          <h3 className="text-lg font-semibold mt-4">Best Seller</h3>
          <p className="text-blue-600">Smart Fitness Band</p>

          <div className="flex justify-between mt-6">
            <div>
              <p className="text-xs text-zinc-500">SALES</p>
              <p className="text-xl font-bold">432</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">MARGIN</p>
              <p className="text-xl font-bold text-green-600">22%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* PENDING ORDERS */}
        <Card className="lg:col-span-2 p-6 rounded-2xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-bold">Pending Orders</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 border-b">
                <th className="py-3">Order ID</th>
                <th>Product</th>
                <th>Amount</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-12 text-zinc-400"
                >
                  No pending orders action required.
                </td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* GROW BUSINESS */}
        <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <h3 className="text-xl font-bold">Grow your business</h3>
          <p className="text-blue-100 mt-2">
            Unlock 0% commission on your next 50 orders by verifying your GST today.
          </p>

          <Button className="mt-6 bg-white text-blue-700 hover:bg-blue-50 w-full">
            Verify Now →
          </Button>
        </Card>
      </div>
    </div>
  );
}
