"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function OrderTrackingPage() {
  const router = useRouter();
  const params = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const fetchOrder = async () => {
    const res = await fetch(
      `http://localhost:8080/orders/${params.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setOrder(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 4000); // simple polling
    return () => clearInterval(interval);
  }, []);

  const call = async (url: string) => {
    await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchOrder();
  };

  if (loading || !order)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading order...
      </div>
    );

  const steps = [
    "payment_in_escrow",
    "shipped",
    "courier_verified",
    "delivered",
    "inspection",
    "completed",
  ];

  const progress =
    ((steps.indexOf(order.status) + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-2">
        Order #{order.id.slice(0, 8)}
      </h1>

      <Badge className="mb-6">{order.status}</Badge>

      <Progress value={progress} className="mb-10" />

      {/* Actions by Status */}

      {order.status === "payment_in_escrow" && (
        <Button
          onClick={() =>
            call(`http://localhost:8080/orders/${order.id}/ready-for-pickup`)
          }
        >
          Ready For Pickup
        </Button>
      )}

      {order.status === "shipped" && (
        <Button
          onClick={() =>
            call(`http://localhost:8080/orders/${order.id}/courier-verify`)
          }
        >
          Courier Verify
        </Button>
      )}

      {order.status === "courier_verified" && (
        <Button
          onClick={() =>
            call(`http://localhost:8080/orders/${order.id}/simulate-delivery`)
          }
        >
          Simulate Delivery
        </Button>
      )}

      {order.status === "delivered" && (
        <Button
          onClick={() =>
            call(`http://localhost:8080/orders/${order.id}/verify-otp`)
          }
        >
          Verify OTP
        </Button>
      )}

      {order.status === "inspection" && (
        <Button
          onClick={() =>
            call(`http://localhost:8080/orders/${order.id}/confirm-quality`)
          }
        >
          Confirm Quality
        </Button>
      )}

      {order.status === "completed" && (
        <Button
          onClick={() =>
            window.open(`/order/${order.id}/invoice`, "_blank")
          }
        >
          Download Invoice
        </Button>
      )}
    </div>
  );
}
