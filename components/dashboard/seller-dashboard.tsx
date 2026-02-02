"use client";

import { useAuth } from "@/lib/auth-context";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function SellerDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [inventory, setInventory] = useState<any[]>([]);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const [invRes, orderRes] = await Promise.all([
        fetch("http://localhost:8080/api/seller/products"),
        fetch("http://localhost:8080/api/seller/pending-orders"),
      ]);

      setInventory(await invRes.json());
      setPendingOrders(await orderRes.json());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  async function markShipped(orderId: string) {
    toast.loading("Marking as shipped...");
    await fetch(`http://localhost:8080/api/orders/${orderId}/ship`, {
      method: "PUT",
    });
    toast.success("Order marked shipped");
    setPendingOrders((p) => p.filter((o) => o.id !== orderId));
  }

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 space-y-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <AddProductDialog onAdded={loadData}>
          <Button>
            <Plus className="mr-2 w-4 h-4" /> Add Product
          </Button>
        </AddProductDialog>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Pending Orders</h2>
        {pendingOrders.map((o) => (
          <div key={o.id} className="flex justify-between py-2 border-b">
            <div>
              #{o.id.slice(0, 6)} — {o.productName}
            </div>
            <Button size="sm" onClick={() => markShipped(o.id)}>
              <Truck className="mr-1 w-4 h-4" /> Ship
            </Button>
          </div>
        ))}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Inventory</h2>
        {inventory.map((p) => (
          <div key={p.id} className="py-2 border-b">
            {p.name} — ₹{p.price}
          </div>
        ))}
      </Card>
    </div>
  );
}

function AddProductDialog({ children, onAdded }: any) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function submit(e: any) {
    e.preventDefault();
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    if (file) form.append("image", file);

    await fetch("http://localhost:8080/api/products", {
      method: "POST",
      body: form,
    });

    toast.success("Product added");
    setOpen(false);
    onAdded();
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form onSubmit={submit} className="bg-white p-6 space-y-4 rounded-xl w-96">
            <input
              className="border p-2 w-full"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="border p-2 w-full"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
