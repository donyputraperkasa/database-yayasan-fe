"use client";

import { X } from "lucide-react";

type CreatorLicenseProps = {
    open: boolean;
    onClose: () => void;
};

const licenseItems = [
    {
        label: "Product",
        value: "MyBOPKRI Database Management System",
    },
    {
        label: "Edition",
        value: "Enterprise",
    },
    {
        label: "Product Code",
        value: "DPP-MyDB-ENT",
    },
    {
        label: "License ID",
        value: "DPP-MyDB-2026-BOPKRI-001",
    },
    {
        label: "Licensed To",
        value: "Yayasan BOPKRI",
    },
    {
        label: "License Type",
        value: "Single Organization License",
    },
    {
        label: "License Status",
        value: "Verified & Active",
    },
    {
        label: "Registered",
        value: "Registered Commercial Software",
    },
    {
        label: "Copyright Holder",
        value: "Dony Putra Perkasa",
    },
    {
        label: "Developer",
        value: "Dony Putra Perkasa",
    },
    {
        label: "Release Date",
        value: "01 July 2026",
    },
    {
        label: "Version",
        value: "1.0.0",
    },
    {
        label: "Support",
        value: "Official Developer Support",
    },
    {
        label: "Technology",
        value: "Next.js • NestJS • Prisma • PostgreSQL",
    },
];

export function CreatorLicense({ open, onClose }: CreatorLicenseProps) {
    if (!open) return null;

    return (
        <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#0f172a]/45 px-3 py-6 backdrop-blur-sm sm:px-4"
        >
        <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/70 bg-white/92 p-4 text-[#1f2f46] shadow-2xl shadow-[#1f4f8f]/20 backdrop-blur-xl sm:rounded-3xl sm:p-7"
        >
            <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border border-[#d8e3f4] bg-white/80 p-2 text-[#617089] transition hover:bg-[#f4f7fb] hover:text-[#1f4f8f]"
            aria-label="Close license modal"
            >
            <X className="h-4 w-4" />
            </button>

            <div className="mb-5 pr-9 sm:mb-6 sm:pr-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d89b00] sm:text-xs sm:tracking-[0.35em]">
                VERIFIED LICENSE
            </p>
            <h2 className="mt-2 bg-gradient-to-r from-[#123d78] via-[#1f4f8f] to-[#3a6cb7] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:mt-3 sm:text-3xl">
                MyBOPKRI
            </h2>
            <p className="mt-2 text-sm font-medium leading-6 text-[#55657f] sm:text-base">
                Official Internal System • Designed & Developed by Dony Putra Perkasa
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:items-center">
                <span className="rounded-full inline-flex items-center justify-center text-center border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    ✓ VERIFIED ORIGINAL SOFTWARE
                </span>
                <span className="rounded-full inline-flex items-center justify-center text-center border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Enterprise Edition
                </span>
                <span className="rounded-full inline-flex items-center justify-center text-center border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    Commercial License
                </span>
            </div>
            <div className="mt-3 rounded-2xl border border-[#dce8f7] bg-[#f7fbff] px-3 py-3 text-xs leading-6 text-[#44536b] sm:px-4 sm:text-sm">
                <span className="font-semibold text-[#1f4f8f]">Creator Statement</span>
                <br />
                MyBOPKRI Database Management System is an original commercial software product conceived, architected, designed, and developed by <strong>Dony Putra Perkasa</strong>. The complete application, including its source code, database architecture, user interface, branding, documentation, and system design, constitutes intellectual property owned exclusively by the copyright holder and is protected under applicable copyright laws.
            </div>
            </div>

            <div className="space-y-2">
            {licenseItems.map((item) => (
                <div
                key={item.label}
                className="rounded-2xl border border-[#e2eaf6] bg-[#f8fbff]/80 px-3 py-2.5 sm:px-4"
                >
                <p className="text-xs font-medium uppercase tracking-wide text-[#7a8aa0]">
                    {item.label}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-[#1f2f46]">{item.value}</p>
                </div>
            ))}
            </div>

            <div className="mt-4 rounded-2xl border border-[#f2d35f]/50 bg-[#fff8db]/70 px-3 py-4 text-xs leading-6 text-[#675b1f] sm:px-4 sm:text-sm">
                <p className="font-bold text-[#7a5b00]">
                    Copyright © 2026 Dony Putra Perkasa. All Rights Reserved.
                </p>

                <p className="mt-3">
                    <strong>MyBOPKRI Database Management System</strong> is an original software
                    product created, designed, and developed exclusively by
                    <strong> Dony Putra Perkasa</strong>.
                </p>

                <p className="mt-3">
                    This software is licensed exclusively to
                    <strong> Yayasan BOPKRI</strong> under a
                    <strong> Single Organization License</strong>.
                </p>

                <p className="mt-3">
                    The license identified as <strong>DPP-MyDB-2026-BOPKRI-001</strong> is issued exclusively for Yayasan BOPKRI and is non-transferable.
                </p>

                <p className="mt-3">
                    Unauthorized copying, redistribution, resale, reverse engineering,
                    modification, removal of developer attribution, or commercial reuse of
                    this software, in whole or in part, without prior written permission from
                    the copyright holder is strictly prohibited.
                </p>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-[#7a8aa0]">
                Verified Original Software • Enterprise Edition • Commercial License • Copyright © 2026 Dony Putra Perkasa
            </p>

            <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-full bg-[#1f4f8f] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1f4f8f]/20 transition hover:bg-[#29328f]"
            >
            Close
            </button>
        </div>
        </div>
    );
}
