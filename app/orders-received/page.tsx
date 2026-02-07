// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import QRCode from "qrcode";

// export default function OrdersReceivedPage() {
//   const router = useRouter();
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     const res = await fetch("http://localhost:8080/seller/orders", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     setOrders(data);
//     setLoading(false);
//   };

//   if (loading) return <div className="p-10">Loading...</div>;

//   return (
//     <div className="p-10 space-y-6">
//       <h1 className="text-2xl font-bold">Orders Received</h1>

//       {orders.map((order) => (
//         <OrderCard key={order.id} order={order} refresh={fetchOrders} />
//       ))}
//     </div>
//   );
// }

// function OrderCard({ order, refresh }: any) {
//   const [qr, setQr] = useState("");

//   useEffect(() => {
//     const url = `${window.location.origin}/verify/${order.id}`;
//     QRCode.toDataURL(url).then(setQr);
//   }, [order.id]);

//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

//   const markShipped = async () => {
//     await fetch(`http://localhost:8080/orders/${order.id}/mark-shipped`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     refresh();
//   };

//   const printLabel = () => {
//     const w = window.open("", "_blank");
//     if (!w) return;

//     w.document.write(`
//       <html>
//       <body style="text-align:center;font-family:monospace">
//         <h2>TRADIGOO VERIFIED PARCEL</h2>
//         <img src="${qr}" width="250"/>
//         <p>Order: ${order.id}</p>
//         <p>Product: ${order.productName}</p>
//         <p>Qty: ${order.quantity}</p>
//         <script>window.print()</script>
//       </body>
//       </html>
//     `);
//   };

//   return (
//     <Card className="p-6 flex justify-between items-center">
//       <div>
//         <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
//         <p>Status: {order.status}</p>
//         <p>Buyer: {order.buyerName}</p>
//       </div>

//       <div className="flex gap-3">
//         <Button onClick={printLabel}>Print Label</Button>

//         {order.status !== "shipped" && (
//           <Button onClick={markShipped}>Mark Shipped</Button>
//         )}
//       </div>
//     </Card>
//   );
// }

"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Truck,
  CheckCircle,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import QRCode from "qrcode";

const API = "http://localhost:8080";

export default function OrdersReceivedPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Orders");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/seller/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders =
    filter === "All Orders"
      ? orders
      : orders.filter((o) =>
          o.status
            .replace(/_/g, " ")
            .toLowerCase()
            .includes(filter.toLowerCase())
        );

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <Button
            variant="ghost"
            className="pl-0 mb-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold"
          >
            Orders Received
          </motion.h1>
          <p className="text-muted-foreground mt-2">
            Manage incoming orders and shipments
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["All Orders", "Pending", "Shipped", "Delivered", "Cancelled"].map(
            (s) => (
              <Button
                key={s}
                variant={filter === s ? "default" : "outline"}
                onClick={() => setFilter(s)}
                className="rounded-full px-6"
              >
                {s}
              </Button>
            )
          )}
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {loading ? (
            <div className="py-20 text-center text-muted-foreground">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-20 text-center border rounded-xl">
              No orders found
            </div>
          ) : (
            filteredOrders.map((order, i) => (
              <OrderCard
                key={order.id}
                order={order}
                index={i}
                refresh={fetchOrders}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- ORDER CARD ---------------- */

function OrderCard({
  order,
  index,
  refresh,
}: {
  order: any;
  index: number;
  refresh: () => void;
}) {
  const statusBadge = (status: string) => {
    if (status === "shipped") return "bg-blue-500/10 text-blue-500";
    if (status === "delivered") return "bg-green-500/10 text-green-500";
    if (status === "cancelled") return "bg-red-500/10 text-red-500";
    return "bg-yellow-500/10 text-yellow-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="p-6 flex flex-col md:flex-row justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-bold text-lg">
              Order #{order.id.slice(0, 8)}
            </h3>
            <Badge className={statusBadge(order.status)}>
              {order.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Buyer: {order.buyerName}
          </p>
          <p className="font-bold mt-2">
            ₹{order.totalAmount?.toLocaleString()}
          </p>
        </div>

        <ManageOrderDialog order={order} refresh={refresh} />
      </Card>
    </motion.div>
  );
}

/* ---------------- MANAGE ORDER ---------------- */

function ManageOrderDialog({
  order,
  refresh,
}: {
  order: any;
  refresh: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [qr, setQr] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    const url = `${window.location.origin}/verify/${order.id}`;
    QRCode.toDataURL(url).then(setQr);
  }, [order.id]);

  const markShipped = async () => {
    const id = toast.loading("Marking as shipped...");
    try {
      await fetch(`${API}/orders/${order.id}/mark-shipped`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Order marked shipped", { id });
      refresh();
      setOpen(false);
    } catch {
      toast.error("Failed to update order", { id });
    }
  };

  const printLabel = () => {
    const w = window.open("", "_blank");
    if (!w) return;

    w.document.write(`
      <html>
      <body style="text-align:center;font-family:monospace">
        <h2>TRADIGOO VERIFIED PARCEL</h2>
        <img src="${qr}" width="220"/>
        <p>Order: ${order.id}</p>
        <p>Product: ${order.productName}</p>
        <p>Qty: ${order.quantity}</p>
        <script>window.print()</script>
      </body>
      </html>
    `);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white">
          Manage Order
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Manage Order #{order.id.slice(0, 6)}
          </DialogTitle>
          <DialogDescription>
            {order.productName} • Qty {order.quantity}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <img src={qr} className="mx-auto w-40" />

          <Button
            onClick={printLabel}
            variant="outline"
            className="w-full"
          >
            <Package className="w-4 h-4 mr-2" />
            Print Label
          </Button>

          {order.status !== "shipped" && (
            <Button onClick={markShipped} className="w-full">
              <Truck className="w-4 h-4 mr-2" />
              Mark Shipped
            </Button>
          )}

          {order.status === "shipped" && (
            <div className="flex items-center gap-2 text-green-600 justify-center">
              <CheckCircle className="w-4 h-4" />
              Order is shipped
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
