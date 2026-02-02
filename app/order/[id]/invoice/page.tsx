"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function InvoicePage() {
  const params = useParams();
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoice() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `http://localhost:8080/orders/${params.id}/invoice`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setInvoice(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadInvoice();
  }, [params.id]);

  if (loading)
    return <div className="p-10 text-center">Loading Invoice...</div>;

  if (!invoice)
    return (
      <div className="p-10 text-center text-red-500">
        Invoice not found
      </div>
    );

  const subtotal = invoice.totalAmount;
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white p-10 print:p-0">
      {/* Controls */}
      <div className="flex justify-end gap-3 mb-8 print:hidden">
        <Button onClick={() => window.print()} className="gap-2">
          <Printer size={16} /> Print
        </Button>
      </div>

      <div className="max-w-4xl mx-auto border p-12 shadow print:shadow-none print:border-0">
        {/* Header */}
        <div className="flex justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Tradigoo</h1>
            <p className="text-sm text-zinc-500">B2B Trading Platform</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl text-zinc-300 uppercase">Invoice</h2>
            <p className="font-mono">#{invoice.id.slice(0, 8)}</p>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p className="text-xs text-zinc-400 uppercase">Billed To</p>
            <h3 className="font-bold">{invoice.buyer.businessName}</h3>
            <p>{invoice.buyer.name}</p>
            <p className="text-sm text-zinc-500">
              {invoice.buyer.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-400 uppercase">
              Shipped From
            </p>
            <h3 className="font-bold">
              {invoice.seller.businessName}
            </h3>
            <p>{invoice.seller.name}</p>
            <p className="text-sm text-zinc-500">
              {invoice.seller.location}
            </p>
            <p className="text-sm text-zinc-500 mt-2">
              GSTIN: {invoice.seller.gst}
            </p>
          </div>
        </div>

        {/* Item Table */}
        <table className="w-full text-left mb-12">
          <thead>
            <tr className="border-b">
              <th className="py-3">Item</th>
              <th className="py-3 text-right">Qty</th>
              <th className="py-3 text-right">Rate</th>
              <th className="py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4">{invoice.productName}</td>
              <td className="py-4 text-right">
                {invoice.quantity} {invoice.unit}
              </td>
              <td className="py-4 text-right">
                ₹{invoice.unitPrice.toLocaleString()}
              </td>
              <td className="py-4 text-right">
                ₹{invoice.totalAmount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-zinc-400 mt-16">
          Thank you for your business with Tradigoo.
        </div>
      </div>
    </div>
  );
}
