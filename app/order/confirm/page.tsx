"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function OrderConfirmPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingOrder");
    if (!pending) {
      router.push("/marketplace");
      return;
    }

    const parsed = JSON.parse(pending);
    setOrderData(parsed);

    async function load() {
      const p = await fetch(
        `http://localhost:8080/products/${parsed.product_id}`
      ).then((r) => r.json());

      const s = await fetch(
        `http://localhost:8080/profiles/${p.seller_id}`
      ).then((r) => r.json());

      setProduct(p);
      setSeller(s);
      setLoading(false);
    }

    load();
  }, []);

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    await loadRazorpay();

    // 1️⃣ Ask Spring Boot to create Razorpay Order
    const res = await fetch(
      "http://localhost:8080/payments/razorpay/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: orderData.total_amount,
        }),
      }
    );

    const razorpayOrder = await res.json();

    const options = {
      key: "rzp_test_xxxxx", // from Razorpay
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Tradigoo",
      order_id: razorpayOrder.id,

      handler: async function (response: any) {
        // 2️⃣ Verify payment + create order in DB
        const verify = await fetch(
          "http://localhost:8080/payments/razorpay/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              product_id: product.id,
              quantity: orderData.quantity,
            }),
          }
        );

        const result = await verify.json();

        sessionStorage.removeItem("pendingOrder");
        router.push(`/order/${result.orderId}`);
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Confirm Order</h1>

      <p>Product: {product.name}</p>
      <p>Seller: {seller.business_name}</p>
      <p>Qty: {orderData.quantity}</p>
      <p>Total: ₹{orderData.total_amount}</p>

      <Button className="mt-6" onClick={handlePayment}>
        Pay & Place Order
      </Button>
    </div>
  );
}
