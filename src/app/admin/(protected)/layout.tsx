import { requireAdminSession } from "@/lib/auth/require-admin";
import Section from "@/components/ui/Section";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminSession();

  return (
    <Section>
      <AdminNav />
      <div className="mt-8">{children}</div>
    </Section>
  );
}
