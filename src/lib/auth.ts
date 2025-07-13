import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getSession();
  
  if (!session?.user) {
    redirect("/auth/login");
  }
  
  return session.user;
}

export async function requireRole(role: string) {
  const user = await requireAuth();
  
  if (user.role !== role && user.role !== "ADMIN") {
    redirect("/unauthorized");
  }
  
  return user;
} 