"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function OrderVerificationPage() {
    const params = useParams();
    const orderId = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!orderId) return;

        async function verifyOrder() {
            try {
                const res = await fetch(`http://localhost:8080/public/verify/${orderId}`);
                if (!res.ok) throw new Error();

                const data = await res.json();
                setOrder(data);
            } catch {
                setError("Order not found or invalid QR code.");
            } finally {
                setLoading(false);
            }
        }

        verifyOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2">Verifying authenticity...</span>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
                <Card className="max-w-md w-full bg-zinc-900 border-red-900/50 p-8 text-center">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Verification Failed</h1>
                    <p className="text-zinc-400 mb-6">{error}</p>
                    <Link href="/">
                        <Button variant="outline" className="w-full">Return Home</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-purple-950 py-12 px-6 flex items-center justify-center">
            <Card className="max-w-md w-full bg-zinc-900 border-emerald-500/30 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />

                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">Verified</h1>
                    <p className="text-emerald-400 font-medium">Authentic Tradigoo Shipment</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                            <span className="text-zinc-400">Order ID</span>
                            <span className="text-white font-mono">#{order.id.slice(0, 8)}</span>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-zinc-800 p-2 rounded text-zinc-400">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">{order.product.name}</h3>
                                <p className="text-zinc-400 text-sm">
                                    {order.quantity} {order.product.unit}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <InfoBox label="Status" value={order.status.replace(/_/g, ' ')} />
                        <InfoBox label="Seller" value={order.seller.businessName} />
                    </div>

                    <div className="bg-zinc-900/50 rounded-lg p-4 border border-white/5 space-y-3">
                        <h4 className="text-sm font-bold text-white border-b border-white/5 pb-2">Product Details</h4>

                        <div>
                            <span className="text-xs text-zinc-500 block">Category</span>
                            <span className="text-zinc-300">{order.product.category}</span>
                        </div>

                        <div>
                            <span className="text-xs text-zinc-500 block">Description</span>
                            <p className="text-zinc-300 text-sm">{order.product.description}</p>
                        </div>

                        {order.product.specs && (
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(order.product.specs).map(([k, v]: any) => (
                                    <div key={k} className="text-xs bg-black/20 p-1.5 rounded border border-white/5">
                                        <span className="text-zinc-500 capitalize">{k}: </span>
                                        <span className="text-zinc-300">{v}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-zinc-500 text-sm mb-4">
                        Scanned at {new Date().toLocaleTimeString()}
                    </p>
                    <Link href="/">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                            Open Website
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
}

function InfoBox({ label, value }: any) {
    return (
        <div className="p-3 bg-zinc-900 rounded-lg border border-white/5">
            <div className="text-xs text-zinc-500 uppercase font-bold mb-1">{label}</div>
            <div className="text-white capitalize">{value}</div>
        </div>
    );
}
