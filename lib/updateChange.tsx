import { supabase_e2emod } from '@/lib/initSupabase';

export interface UpdateChange {
    value: string;
}

export const updateChangeTitle = async (change_id: string, update: UpdateChange): Promise<void> => {
    const { value: title } = update;
    const { data, error } = await supabase_e2emod.from('change')
        .update({ title: title })
        .eq('change_id', change_id)
        .select()
};