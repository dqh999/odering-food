import { fetchApi } from "@/lib/api-client";

export const tableService = {
    validateTable: async (tableId: string, storeId: string): Promise<boolean> => {
        try {
            console.log(`Validating table ${tableId} for store ${storeId}...`);
            const res = await fetchApi<boolean>(`/api/table/${tableId}/validate?storeId=${storeId}`);
            return res;
        } catch (error) {
            throw error;
        }
    },
};
