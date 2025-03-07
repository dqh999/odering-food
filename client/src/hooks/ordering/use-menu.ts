"use client"

import { useRef, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"
import { MenuItem } from "@/lib/types/menu"

export function useMenu() {
    const isFetched = useRef(false);

    const searchParams = useSearchParams();
    const storeId = searchParams.get("storeId") as string;
    const tableId = searchParams.get("tableId") as string;
    const page = searchParams.get("page") as string || "1";
    const pageSize = searchParams.get("pageSize") as string || "10";

    const [bestsellers, setBestsellers] = useState<MenuItem[]>([]);
    const [menuItem, setMenuItem] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!storeId || !tableId) return;
        if (isFetched.current) return;
        isFetched.current = true
        async function fetchData() {
            try {
                console.log("Fetching API with:", { storeId, tableId, page, pageSize });

                setLoading(true);

                // Gọi API ở đây
                // const result = await tableService.validateTable(tableId, storeId);

                // Giả lập dữ liệu
                setBestsellers([]);
                setMenuItem([]);

                // Lưu lại thông tin vào localStorage
                localStorage.setItem(
                    "menuParams",
                    JSON.stringify({ storeId, tableId, page, pageSize })
                );
            } catch (err) {
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [storeId, tableId, page, pageSize]);

    return { bestsellers, menuItem, loading, error };
}