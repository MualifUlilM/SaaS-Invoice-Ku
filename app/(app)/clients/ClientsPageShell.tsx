"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X, Users } from "lucide-react";
import { ClientForm } from "@/components/app/ClientForm";
import { EmptyState } from "@/components/app/EmptyState";
import { PageHeader } from "@/components/app/PageHeader";
import { getClientCompany, getClientName } from "@/lib/formatters";

interface Client {
  id: string;
  name: string;
  company_name: string | null;
  email: string | null;
  phone: string | null;
}

interface ClientsPageShellProps {
  clients: Client[];
}

export function ClientsPageShell({ clients }: ClientsPageShellProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Klien"
        description="Kelola data klien Anda"
        actions={
          <button
            onClick={() => setShowForm((v) => !v)}
            className={[
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              showForm
                ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700",
            ].join(" ")}
          >
            {showForm ? (
              <>
                <X size={15} />
                Batal
              </>
            ) : (
              <>
                <Plus size={15} />
                Tambah Klien
              </>
            )}
          </button>
        }
      />

      {/* Add client form — slide in when toggled */}
      {showForm && (
        <ClientForm
          title="Tambah Klien Baru"
          submitLabel="Simpan Klien"
        />
      )}

      {/* Client list — full width */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-900">Daftar Klien</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {clients.length} klien tersimpan di workspace ini.
          </p>
        </div>

        {clients.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Users}
              title="Belum ada klien"
              description="Klik 'Tambah Klien' untuk menambahkan klien pertama Anda."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Perusahaan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Telepon
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {getClientName(client)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {getClientCompany(client) || (
                        <span className="text-slate-400 italic">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {client.email || <span className="text-slate-400 italic">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {client.phone || <span className="text-slate-400 italic">—</span>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/clients/${client.id}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
