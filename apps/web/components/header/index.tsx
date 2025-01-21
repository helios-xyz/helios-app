'use client';

import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { Button } from '@repo/design-system/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@repo/design-system/components/ui/navigation-menu';
import { Menu, MoveRight, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import Image from 'next/image';
import Logo from './logo.svg';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Product',
      description: 'Learn about our platform',
      items: [
        {
          title: 'Features',
          href: '/features',
          description: 'Explore our features',
        },
        {
          title: 'Pricing',
          href: '/pricing',
          description: 'Check out our pricing plans',
        },
      ],
    },
    {
      title: 'Company',
      description: 'Learn more about us',
      items: [
        {
          title: 'Contact',
          href: '/contact',
          description: 'Get in touch with us',
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} alt="Helios" className="h-8 w-8" />
            <span className="font-medium">Helios</span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {item.items.map((subItem) => (
                        <li key={subItem.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.title}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" className="hidden gap-4 lg:inline-flex" asChild>
            <Link href="/app">
              Try it <MoveRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>
      {isOpen && (
        <div className="container mx-auto lg:hidden">
          <div className="divide-y">
            {navigationItems.map((item) => (
              <div key={item.title} className="py-4">
                <h3 className="text-sm font-medium">{item.title}</h3>
                <ul className="mt-2 space-y-2">
                  {item.items.map((subItem) => (
                    <li key={subItem.title}>
                      <Link
                        href={subItem.href}
                        className="block text-sm text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="py-4">
              <Button className="w-full gap-4" asChild>
                <Link href="/app" onClick={() => setIsOpen(false)}>
                  Try it <MoveRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
