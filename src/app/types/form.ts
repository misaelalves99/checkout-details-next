// 01-Estruturas e Tratamento -
// 04-Objetos -

export interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormButtonProps {
  text: string;
  onClick: () => void;
}
