import React from 'react';
import { supabase_e2emod } from './initSupabase';
import { Database } from '@/lib/schema_e2emod_dev';
import Changes from '@/components/ChangesOld';
import { Grid } from '@syncfusion/ej2-grids';

type TableHeaders = Database['e2emod_dev']['Tables']['dict_attribute']['Row'];

export function useTableHeaders() {
  const [tableHeaders, setTableHeaders] = React.useState([] as TableHeaders[]); //React.useState(null as TableHeaders[] | null);

  React.useEffect(() => {
    const loadTableHeaders = async () => {
      const { data, error } = await supabase_e2emod
        .from('dict_attribute')
        // .select('list_of_changes_order, label, db_column')
        .select('*')
        .neq('label', '') // Add the missing third argument
        .neq('list_of_changes_order', -1)
        .order('list_of_changes_order');
      if (error) console.log('error', error);
      else setTableHeaders(data as TableHeaders[]);
    };
    loadTableHeaders();
    return () => {};
  }, []);
  return tableHeaders;
}

export function useTableContent(
  grid: React.MutableRefObject<Grid | null>,
  changeId: number = -1,
): [Changes[], number] {
  const [dataChanges, setDataChanges] = React.useState<Changes[]>([]);
  const defaultLoadedChanges = 20; // first set of load to quickly display a table
  const maxNumberOfRows = 10000;

  const loadChanges = async (maxRange = defaultLoadedChanges) => {
    grid?.current?.showMaskRow(); // speedup loading, skeletton results until all data is loaded
    const { data, error } = await supabase_e2emod
      .from('change')
      .select('*') // TODO: shall restricted to default columns
      .range(0, maxRange - 1);

    if (error) console.log('error', error);
    else {
      setDataChanges(data as Changes[]);
    }
  };
  React.useEffect(() => {
    if (dataChanges.length === 0) loadChanges(defaultLoadedChanges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (dataChanges.length === defaultLoadedChanges)
      loadChanges(maxNumberOfRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChanges.length]);

  return [dataChanges, defaultLoadedChanges];
}

export function useEditChangeHeader(category: string = 'General attributes') {
  const screen_order: string = 'edit_change_order';
  const [tableHeaders, setTableHeaders] = React.useState([] as TableHeaders[]);
  React.useEffect(() => {
    const loadTableHeaders = async () => {
      const { data, error } = await supabase_e2emod
        .from('dict_attribute')
        .select(
          'label, attribute, format, length, input_type, display_tooltip, ' +
            screen_order,
        )
        .eq('category', category)
        .neq(screen_order, -1)
        .order(screen_order);
      console.log('🚀 ~ useEditChangeHeader ~ headers for:', category, data);
      if (error) console.log('error', error);
      else if (
        Array.isArray(data) &&
        data.every(
          item =>
            typeof item === 'object' && item !== null && 'attribute' in item,
        )
      ) {
        setTableHeaders(data as TableHeaders[]);
      }
    };

    loadTableHeaders();
  }, [category]);
  return tableHeaders;
}
