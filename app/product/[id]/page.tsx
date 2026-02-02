"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();

  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(
      `http://localhost:8080/products/${params.id}`
    );
    const data = await res.json();
    setProduct(data);
    setQuantity(data.minOrderQuantity);
    setLoading(false);
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const total = quantity * product.basePrice;
  const profit = total * (product.expectedMargin / 100);

  const handleOrder = () => {
    router.push(
      `/order/confirm?productId=${product.id}&qty=${quantity}`
    );
  };

  return (
    <div className="p-10 grid lg:grid-cols-2 gap-10">
      {/* LEFT */}
      <div>
        <img
          src={product.imageUrl}
          className="rounded-xl border"
        />
      </div>

      {/* RIGHT */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p>{product.description}</p>

        <div className="border p-4 rounded-lg">
          <p>Base Price: ₹{product.basePrice} / {product.unit}</p>
          <p>Min Order: {product.minOrderQuantity}</p>
          <p>Expected Margin: {product.expectedMargin}%</p>
        </div>

        <div>
          <label>Quantity</label>
          <Input
            type="number"
            min={product.minOrderQuantity}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />
        </div>

        <div className="border p-4 rounded-lg">
          <p>Total: ₹{total}</p>
          <p className="text-green-600">
            Est Profit: ₹{profit}
          </p>
        </div>

        <Button
          onClick={handleOrder}
          disabled={quantity < product.minOrderQuantity}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
