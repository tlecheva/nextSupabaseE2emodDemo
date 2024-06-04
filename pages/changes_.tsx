import Changes from "@/components/Changes_";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
export const ChangesPage = () => {
    const session = useSession()
    if (!session) return <div>Loading session for Changes...</div>
    return <Changes />;
};
export default ChangesPage;