// import ECommerce from "@/components/Dashboard/E-commerce";
// import { Metadata } from "next";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// export const metadata: Metadata = {
//   title:
//     "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
//   description: "This is Next.js Home for TailAdmin Dashboard Template",
// };

// export default function Home() {
//   return (
//     <>
//       <DefaultLayout>
//         <ECommerce />
//       </DefaultLayout>
//     </>
//   );
// }

import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { clientConfig, serverConfig } from "../../config";
import HomePage from "./HomePage";

export default async function Home() {
  const resolvedCookies = await cookies();
  const authToken = resolvedCookies.get(serverConfig.cookieName);
  const tokens = await getTokens(resolvedCookies, {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  if (!tokens) {
    notFound();
  }

  return <HomePage email={tokens?.decodedToken.email} />;
}