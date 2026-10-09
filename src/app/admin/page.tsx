import { isAdmin, adminConfigured, usingDemoCredentials } from "@/lib/auth";
import { readStore } from "@/lib/store";
import { AdminApp } from "@/components/admin/AdminApp";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!adminConfigured())
    return <div className="wrap" style={{ padding: 40 }}><div className="banner banner--err">Admin is disabled: set ADMIN_PASSWORD and ADMIN_SECRET environment variables.</div></div>;
  if (!(await isAdmin())) return <AdminLogin demo={usingDemoCredentials()} />;
  return <AdminApp store={await readStore()} demoCreds={usingDemoCredentials()} />;
}
