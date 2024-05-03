import TodoList from "@/components/TodoList";
import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
const TodosPage = () => {
    const session = useSession()
    if (!session) return <div>Loading session for Todos...</div>
    return <TodoList session={session} />;
};
export default TodosPage;