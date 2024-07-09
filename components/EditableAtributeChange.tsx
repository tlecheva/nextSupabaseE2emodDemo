import * as React from 'react';
import { TextAreaComponent } from '@syncfusion/ej2-react-inputs';
import { useRouter } from 'next/router';
import { updateChange } from '@/lib/updateChange';

// To avoid TS warning on 'rows'..
interface ExtendedTextAreaComponentProps {
  id?: string;
  rows?: number;
  key: string;
  blur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  enabled: boolean;
  floatLabelType: string;
  value: string;
  width: string;
  cssClass: string;
  resizeMode: string;
}

// Create a functional component that wraps the original TextAreaComponent
const ExtendedTextAreaComponent: React.FC<
  ExtendedTextAreaComponentProps
> = props => {
  return <TextAreaComponent {...props} />;
};

export const EditableAtributeChange = ({
  label,
  attribute,
  width,
  blue = false,
  enabled = true,
}: {
  label: string;
  attribute: string;
  width: string;
  blue?: boolean;
  enabled?: boolean;
}) => {
  const router = useRouter();
  const query = router.query;
  const { change_id } = query;
  const val = query[attribute];
  const value: string = !val || val === 'null' ? '' : String(val);
  const id = 'TextAreaComponent_' + label + '_' + attribute;

  return (
    <ExtendedTextAreaComponent
      id={id}
      key={id}
      placeholder={label}
      enabled={enabled}
      floatLabelType="Always"
      value={value}
      width={width}
      cssClass={blue ? 'textAeraComponent-blue' : ''}
      resizeMode="Vertical"
      rows={1}
      blur={e =>
        updateChange(
          String(change_id),
          attribute,
          (e.target as HTMLTextAreaElement).value,
        )
      }
    />
  );
};
