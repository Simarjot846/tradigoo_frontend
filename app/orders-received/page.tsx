"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";

export default function OrdersReceivedPage() {
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
    const res = await fetch("http://localhost:8080/seller/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Orders Received</h1>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} refresh={fetchOrders} />
      ))}
    </div>
  );
}

function OrderCard({ order, refresh }: any) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const url = `${window.location.origin}/verify/${order.id}`;
    QRCode.toDataURL(url).then(setQr);
  }, [order.id]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const markShipped = async () => {
    await fetch(`http://localhost:8080/orders/${order.id}/mark-shipped`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    refresh();
  };

  const printLabel = () => {
    const w = window.open("", "_blank");
    if (!w) return;

    w.document.write(`
      <html>
      <body style="text-align:center;font-family:monospace">
        <h2>TRADIGOO VERIFIED PARCEL</h2>
        <img src="${qr}" width="250"/>
        <p>Order: ${order.id}</p>
        <p>Product: ${order.productName}</p>
        <p>Qty: ${order.quantity}</p>
        <script>window.print()</script>
      </body>
      </html>
    `);
  };

  return (
    <Card className="p-6 flex justify-between items-center">
      <div>
        <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
        <p>Status: {order.status}</p>
        <p>Buyer: {order.buyerName}</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={printLabel}>Print Label</Button>

        {order.status !== "shipped" && (
          <Button onClick={markShipped}>Mark Shipped</Button>
        )}
      </div>
    </Card>
  );
}
