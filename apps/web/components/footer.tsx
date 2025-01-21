import Link from 'next/link';

export const Footer = () => {
  const navigationItems = [
    {
      title: 'Home',
      href: '/',
      description: '',
    },
    {
      title: 'Pages',
      description: 'Managing a small business today is already tough.',
      items: [
        {
          title: 'Pricing',
          href: '/pricing',
          description: 'Check out our pricing plans',
        },
        {
          title: 'Contact',
          href: '/contact',
          description: 'Get in touch with us',
        },
      ],
    },
  ];

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
          {navigationItems.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{item.title}</h3>
              {item.items ? (
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  {item.items.map((subItem) => (
                    <li key={subItem.title}>
                      <Link
                        href={subItem.href}
                        className="hover:text-foreground"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Helios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
