import { useUndoable } from '../../hooks/useUndoable';

interface FormFieldProps {
  label: string;
  value: string;
  onCommit: (value: string) => void;
  onShowToast: (message: string, onUndo: () => void) => void;
  commitMessage?: string;
  maxLength?: number;
  placeholder?: string;
  rows?: number;
  inputType?: 'input' | 'textarea';
}

export function FormField({
  label,
  value,
  onCommit,
  onShowToast,
  commitMessage = 'updated',
  maxLength,
  placeholder,
  rows = 1,
  inputType = 'input',
}: FormFieldProps) {
  const undo = useUndoable({
    initialValue: value,
    onCommit,
    onShowToast,
    commitMessage,
  });

  const handleKeyDown = (callback: () => void) => (e: { key: string; preventDefault: () => void }) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-[var(--text-dim)]">{label}</label>
      {inputType === 'textarea' ? (
        <textarea
          value={undo.tempValue}
          onChange={(e) => undo.setTempValue(e.target.value)}
          onBlur={() => undo.commit(undo.tempValue)}
          onKeyDown={handleKeyDown(() => undo.commit(undo.tempValue))}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] resize-none outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      ) : (
        <input
          type="text"
          value={undo.tempValue}
          onChange={(e) => undo.setTempValue(e.target.value)}
          onBlur={() => undo.commit(undo.tempValue)}
          onKeyDown={handleKeyDown(() => undo.commit(undo.tempValue))}
          maxLength={maxLength}
          placeholder={placeholder}
          className="bg-[var(--surface-alt)] text-[var(--text)] p-4 rounded-[var(--radius-lg)] outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      )}
    </div>
  );
}