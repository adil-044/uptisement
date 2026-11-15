import { BOOK_URL } from "@/app/lib/config";

type Props = {
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

export function BookLink({
  children,
  className = "btn btn-primary",
  onClick,
  ...rest
}: Props) {
  return (
    <a
      href={BOOK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-book
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
