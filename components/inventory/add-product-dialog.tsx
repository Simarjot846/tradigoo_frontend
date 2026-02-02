"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function AddProductDialog({
  children,
  onProductAdded,
}: {
  children: React.ReactNode;
  onProductAdded?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    base_price: "",
    min_order_quantity: "",
    unit: "piece",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: Number(formData.base_price),
          minOrderQuantity: Number(formData.min_order_quantity),
          unit: formData.unit,
          description: formData.description,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Product added successfully!");
      setOpen(false);
      setFormData({
        name: "",
        category: "",
        base_price: "",
        min_order_quantity: "",
        unit: "piece",
        description: "",
      });

      onProductAdded?.();
    } catch (err: any) {
      toast.error(err.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-zinc-950 border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <Input
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <Input
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />

          <Input
            placeholder="Price (₹)"
            type="number"
            value={formData.base_price}
            onChange={(e) =>
              setFormData({ ...formData, base_price: e.target.value })
            }
            required
          />

          <Input
            placeholder="Min Order Quantity"
            type="number"
            value={formData.min_order_quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                min_order_quantity: e.target.value,
              })
            }
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 mt-2"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Saving..." : "Save Product"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
