import SideBarAndContent from "@/components/SideBarAndContent";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
export const SideBarAndContentPage = () => {
    const session = useSession()
    if (!session) return <div>Loading session for Changes...</div>
    return <SideBarAndContent />;
};
export default SideBarAndContentPage;