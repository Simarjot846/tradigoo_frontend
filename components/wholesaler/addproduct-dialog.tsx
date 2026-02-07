// import { useState } from "react";
// import { toast } from "sonner";
// import { Button } from "../ui/button";

// export function AddProductDialog({ children, onAdded }: any) {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [file, setFile] = useState<File | null>(null);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const submit = async (e: any) => {
//     e.preventDefault();

//     try {
//       const form = new FormData();
//       form.append("name", name);
//       form.append("price", price);
//       if (file) form.append("image", file);

//       const res = await fetch("http://localhost:8080/api/products", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: form,
//       });

//       if (!res.ok) throw new Error();

//       toast.success("Product added");
//       setOpen(false);
//       onAdded();
//     } catch {
//       toast.error("Failed to add product");
//     }
//   };

//   return (
//     <>
//       <div onClick={() => setOpen(true)}>{children}</div>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <form
//             onSubmit={submit}
//             className="bg-white p-6 rounded-xl space-y-4 w-96"
//           >
//             <h3 className="font-bold text-lg">Add Product</h3>

//             <input
//               className="border p-2 w-full"
//               placeholder="Name"
//               required
//               onChange={(e) => setName(e.target.value)}
//             />

//             <input
//               className="border p-2 w-full"
//               placeholder="Price"
//               type="number"
//               required
//               onChange={(e) => setPrice(e.target.value)}
//             />

//             <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

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

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * ✅ NAMED EXPORT (important!)
 */
export function AddProductDialog({
  children,
  onProductAdded,
}: {
  children: React.ReactNode;
  onProductAdded?: () => void;
}) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    base_price: "",
    unit: "kg",
    min_order_quantity: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const categories = [
    "Grains",
    "Pulses",
    "Oils",
    "Spices",
    "Sweeteners",
    "Beverages",
    "Flours",
  ];

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("category", formData.category);
      form.append("basePrice", formData.base_price);
      form.append("unit", formData.unit);
      form.append("minOrderQuantity", formData.min_order_quantity);
      form.append("description", formData.description);

      if (imageFile) {
        form.append("image", imageFile);
      }

      const res = await fetch(`${API}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully");

      setOpen(false);
      setFormData({
        name: "",
        category: "",
        base_price: "",
        unit: "kg",
        min_order_quantity: "",
        description: "",
      });
      setImageFile(null);

      onProductAdded?.();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="bg-zinc-950 border-zinc-800 text-white max-w-lg">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-zinc-900 border-zinc-800"
                placeholder="e.g. Premium Rice"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val })
                }
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price + Unit + MOQ */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                required
                value={formData.base_price}
                onChange={(e) =>
                  setFormData({ ...formData, base_price: e.target.value })
                }
                className="bg-zinc-900 border-zinc-800"
              />
            </div>

            <div className="space-y-2">
              <Label>Unit</Label>
              <Select
                value={formData.unit}
                onValueChange={(val) =>
                  setFormData({ ...formData, unit: val })
                }
              >
                <SelectTrigger className="bg-zinc-900 border-zinc-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  {["kg", "ltr", "ton", "box"].map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>MOQ</Label>
              <Input
                type="number"
                required
                value={formData.min_order_quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    min_order_quantity: e.target.value,
                  })
                }
                className="bg-zinc-900 border-zinc-800"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files?.[0] || null)
              }
              className="bg-zinc-900 border-zinc-800"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="bg-zinc-900 border-zinc-800"
              placeholder="Quality, origin, packaging..."
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500"
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              <Upload className="mr-2" />
            )}
            Publish Product
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
