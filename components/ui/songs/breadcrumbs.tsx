import { clsx } from 'clsx';
import Link from 'next/link';
import { oswald } from '../fonts';


interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(oswald.className, 'flex flex-col flex-wrap text-large')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-heading dark:text-heading-dark' : 'text-surface-dark-600 dark:text-surface-100',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
