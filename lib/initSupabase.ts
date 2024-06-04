import React from 'react';
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/schema_e2emod_dev'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

export const supabase_e2emod_dev = createClient(
// export const supabase = createClient(

  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  { db: { schema: 'e2emod_dev' } }
)

type TableHeaders = Database['e2emod_dev']['Tables']['dict_attribute']['Row'];


export function useTableHeaders() {
  const [tableHeaders, setTableHeaders] = React.useState(null as TableHeaders[] | null);

  React.useEffect(() => {
    const loadTableHeaders = async () => {
      const { data, error } = await supabase_e2emod_dev
        .from('dict_attribute')
        .select('list_of_changes_order, label, db_column')
        .neq('label', '') // Add the missing third argument
        .order('list_of_changes_order');
        // .order('NULLIF(regexp_replace(list_of_changes_order, \'\\D\', \'\', \'g\'), \'\')::int');
      console.log("🚀 ~ loadTableHeaders ~ headers:", data);
      if (error) console.log('error', error);
      else setTableHeaders(data as TableHeaders[]);
    }
    loadTableHeaders()
    return () => {
    };
  }, []);
  return tableHeaders;
}
