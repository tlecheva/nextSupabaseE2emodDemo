import Posts from "@/components/Posts";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
export const PostsPage = () => {
    const session = useSession()
    if (!session) return <div>Loading session for Posts...</div>
    return <Posts />;
};
export default PostsPage;