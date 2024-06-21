import { supabase_e2emod } from '@/lib/initSupabase';

export interface UpdateChange {
    value: string;
}

export const updateChange = async (
    change_id: string,
    attributeToChange: string,
    value: string): Promise<void> => {
    const { data, error } = await supabase_e2emod.from('change')
        .update({ [attributeToChange]: value })
        .eq('change_id', change_id)
        .select()
};