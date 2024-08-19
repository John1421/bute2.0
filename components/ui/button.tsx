import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "shadow-[0_4px_14px_0_rgb(100,161,71,39%)] hover:shadow-[0_6px_20px_rgba(100,161,71,23%)] bg-primary-200 rounded-md px-8 py-2 text-surface-500 font-light transition duration-200 ease-linear z-50",
        className,
      )}
    >
      {children}
    </button>
  );
}
