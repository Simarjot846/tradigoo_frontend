"use client";

import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Calendar, Tag, ShieldCheck, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function VerifyOrderPage() {
    const params = useParams();
    const orderId = params?.orderId as string;

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!orderId) return;

        async function fetchOrder() {
            try {
                const res = await fetch(`http://localhost:8080/public/verify-order/${orderId}`);
                if (!res.ok) throw new Error();

                const data = await res.json();
                setOrder(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
                <Package className="w-10 h-10 text-red-500 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Order Not Found</h1>
                <p className="text-zinc-500 max-w-md">
                    The QR code you scanned is invalid or the order does not exist.
                </p>
            </div>
        );
    }

    const { product, seller } = order;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center py-12 px-4">
            <div className="relative z-10 w-full max-w-lg space-y-8">

                <div className="flex flex-col items-center">
                    <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-6 py-2 rounded-full flex items-center gap-2 mb-8">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-bold uppercase text-sm">Tradigoo Verified Parcel</span>
                    </div>
                </div>

                <Card className="bg-zinc-900/50 border-white/10 backdrop-blur-xl overflow-hidden">
                    <div className="bg-white/5 px-6 py-4 flex justify-between border-b border-white/5">
                        <span className="text-zinc-500 text-xs uppercase">Order ID</span>
                        <span className="text-white font-mono font-bold">#{order.id.slice(0, 8)}</span>
                    </div>

                    <div className="p-8 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <p className="text-zinc-400 text-sm">{product.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <DetailBox label="Quantity" value={`${order.quantity} Units`} icon={Package} />
                            <DetailBox label="Total Value" value={`₹${order.totalAmount}`} icon={Tag} highlight />
                            <DetailBox label="Batch No." value={product.batchNumber} icon={ShieldCheck} />
                            <DetailBox label="Expiry" value={product.expiryDate} icon={Calendar} />
                        </div>

                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex justify-between">
                            <div>
                                <p className="text-xs text-zinc-500 uppercase mb-1">Supplier</p>
                                <p className="text-white font-medium">{seller.businessName}</p>
                            </div>
                            {seller.gstVerified && (
                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                                    GST Verified
                                </Badge>
                            )}
                        </div>

                        <div className="rounded-xl bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 p-5 text-center">
                            <p className="text-zinc-400 text-xs uppercase mb-1">Retailer Margin</p>
                            <p className="text-3xl font-bold">{product.expectedMargin}%</p>
                        </div>
                    </div>

                    <div className="p-6 pt-0">
                        <Button className="w-full bg-white text-black" onClick={() => window.print()}>
                            <Printer className="w-4 h-4 mr-2" /> Print Verification
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function DetailBox({ label, value, icon: Icon, highlight }: any) {
    return (
        <div className={`p-4 rounded-xl border ${highlight ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-white/5 border-white/5'}`}>
            <div className="flex items-center gap-2 mb-2 text-zinc-400">
                <Icon className="w-4 h-4" />
                <span className="text-xs uppercase font-bold">{label}</span>
            </div>
            <div className="text-lg font-bold">{value}</div>
        </div>
    );
}
