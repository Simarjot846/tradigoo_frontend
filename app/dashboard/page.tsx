// "use client";

// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { Suspense, useEffect, useState } from "react";

// // Lazy dashboards
// const BuyerDashboard = dynamic(
//   () => import("@/components/dashboard/buyer-dashboard").then((m) => m.BuyerDashboard),
//   { loading: () => <DashboardSkeleton /> }
// );

// const SellerDashboard = dynamic(
//   () => import("@/components/dashboard/seller-dashboard").then((m) => m.SellerDashboard),
//   { loading: () => <DashboardSkeleton /> }
// );

// export default function DashboardPage() {
//   const router = useRouter();
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("role");

//     if (!token) {
//       router.push("/auth/login");
//       return;
//     }

//     setRole(savedRole);
//   }, [router]);

//   if (!role) {
//     return <DashboardSkeleton />;
//   }

//   if (role === "wholesaler") {
//     return (
//       <Suspense fallback={<DashboardSkeleton />}>
//         <SellerDashboard />
//       </Suspense>
//     );
//   }

//   return (
//     <Suspense fallback={<DashboardSkeleton />}>
//       <BuyerDashboard />
//     </Suspense>
//   );
// }

// function DashboardSkeleton() {
//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 space-y-8">
//       <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"
//           />
//         ))}
//       </div>
//       <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
//     </div>
//   );
// }



// "use client";

// import dynamic from "next/dynamic";
// import { useRouter } from "next/navigation";
// import { Suspense, useEffect, useState } from "react";
// // import { Navbar } from "@/components/navbar";

// // Lazy dashboards
// const BuyerDashboard = dynamic(
//   () => import("@/components/dashboard/buyer-dashboard").then(m => m.BuyerDashboard),
//   { loading: () => <DashboardSkeleton /> }
// );

// const SellerDashboard = dynamic(
//   () => import("@/components/dashboard/seller-dashboard").then(m => m.SellerDashboard),
//   { loading: () => <DashboardSkeleton /> }
// );

// export default function DashboardPage() {
//   const router = useRouter();
//   const [role, setRole] = useState<string | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const savedRole = localStorage.getItem("role");

//     if (!token) {
//       router.replace("/auth/login");
//       return;
//     }

//     setRole(savedRole);
//   }, [router]);

//   if (!role) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <>
//       {/* ✅ NAVBAR ALWAYS VISIBLE */}
      

//       {/* ✅ OFFSET CONTENT FOR STICKY NAVBAR (72 + 34 = 106px) */}
//       <main className="pt-[106px]">
//         <Suspense fallback={<DashboardSkeleton />}>
//           {role === "wholesaler" ? (
//             <SellerDashboard />
//           ) : (
//             <BuyerDashboard />
//           )}
//         </Suspense>
//       </main>
//     </>
//   );
// }

// function DashboardSkeleton() {
//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 space-y-8 pt-[106px]">
//       <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {[1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"
//           />
//         ))}
//       </div>
//       <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
//     </div>
//   );
// }




"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// Lazy dashboards
const BuyerDashboard = dynamic(
  () => import("@/components/dashboard/buyer-dashboard").then(m => m.BuyerDashboard),
  { loading: () => <DashboardSkeleton /> }
);

const SellerDashboard = dynamic(
  () => import("@/components/dashboard/seller-dashboard").then(m => m.SellerDashboard),
  { loading: () => <DashboardSkeleton /> }
);

export default function DashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    setRole(savedRole);
  }, [router]);

  if (!role) {
    return <DashboardSkeleton />;
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      {role === "wholesaler" ? (
        <SellerDashboard />
      ) : (
        <BuyerDashboard />
      )}
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 space-y-8">
      <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse"
          />
        ))}
      </div>

      <div className="h-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl animate-pulse" />
    </div>
  );
}
