"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setCartItems(data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:8080/cart/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/orders/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        router.push("/orders-received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.product?.base_price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
        Loading Cart...
      </div>
    );

  return (
    <div className="min-h-screen pb-20 bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-6 py-10">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold mt-4 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <Button onClick={() => router.push("/marketplace")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12 mt-10">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="p-6 flex gap-6 items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.product?.name || "Product"}
                    </h3>
                    <p>₹{item.product?.base_price}/unit</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </Card>
              ))}
            </div>

            <Card className="p-8">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Secure Checkout"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
