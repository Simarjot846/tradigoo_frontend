"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function VerifyQRPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "valid" | "invalid">("loading");
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!token) {
            setStatus("invalid");
            return;
        }

        async function verify() {
            try {
                const res = await fetch(
                    `http://localhost:8080/public/verify-token?token=${token}`
                );

                if (!res.ok) throw new Error();

                const result = await res.json();
                setData(result);
                setStatus("valid");
            } catch {
                setStatus("invalid");
            }
        }

        verify();
    }, [token]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Verifying secure token...</span>
            </div>
        );
    }

    if (status === "invalid") {
        return (
            <Card className="bg-zinc-900 border-red-500/50 p-8 text-center max-w-md w-full">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Invalid QR Code</h1>
                <p className="text-zinc-400 mb-6">
                    This QR code is expired, already used, or invalid.
                </p>
                <Link href="/" className="text-zinc-500 underline">
                    Return Home
                </Link>
            </Card>
        );
    }

    return (
        <Card className="bg-zinc-900 border-emerald-500 p-8 max-w-md w-full text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">Delivery Confirmed</h1>
            <p className="text-emerald-400 mb-4">
                Sample Request #{data.requestId} successfully verified.
            </p>

            <div className="text-zinc-400 text-sm">
                Confirmed at {new Date(data.confirmedAt).toLocaleString()}
            </div>
        </Card>
    );
}
