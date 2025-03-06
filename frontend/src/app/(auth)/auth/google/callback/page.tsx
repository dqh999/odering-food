'use client'

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import LoadingAnimation from "@/components/loading-animation";

const GoogleCallback = () => {
    const isFetched = useRef(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const code = searchParams.get("code") as string;
    const { login } = useAuth();

    useEffect(() => {
        if (!code) {
            return;
        }
        if (isFetched.current) return;
        isFetched.current = true
        login("GOOGLE", code);
    }, [router]);

    return <LoadingAnimation />;
};

export default GoogleCallback;
