"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldAlert,
  CheckCircle,
  Scale,
  Package,
  User,
  FileText,
  ArrowLeft,
  Bot,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

export default function DisputeResolutionPage() {
  const router = useRouter();
  const params = useParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:8080/orders/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setOrderData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmResolution = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `http://localhost:8080/orders/${params.id}/resolve`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Dispute resolved");
      router.push("/dashboard");
    } catch (e) {
      toast.error("Failed to resolve");
    }
  };

  if (loading || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6">
      <Button onClick={() => router.back()}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <h1 className="text-2xl font-bold mt-4 flex items-center gap-2">
        <Scale className="w-6 h-6 text-red-500" />
        Dispute Resolution
      </h1>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Order #{params.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Product: <b>{orderData.productName}</b>
          </p>
          <p>Reason: {orderData.disputeReason}</p>
        </CardContent>
      </Card>

      <div className="flex justify-end mt-6">
        <Button onClick={handleConfirmResolution}>
          Confirm Resolution
        </Button>
      </div>
    </div>
  );
}
