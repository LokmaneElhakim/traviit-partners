
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Context ---
interface RouterContextType {
  pathname: string;
  push: (path: string) => void;
  replace: (path: string) => void;
  searchParams: URLSearchParams;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// --- Provider ---
export const RouterProvider = ({ children }: { children: ReactNode }) => {
  const [pathname, setPathname] = useState('/');
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  useEffect(() => {
    // Initial sync
    setPathname(window.location.pathname);
    setSearchParams(new URLSearchParams(window.location.search));

    const handlePopState = () => {
      setPathname(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const push = (path: string) => {
    window.history.pushState({}, '', path);
    const url = new URL(window.location.href);
    setPathname(url.pathname);
    setSearchParams(url.searchParams);
  };

  const replace = (path: string) => {
    window.history.replaceState({}, '', path);
    const url = new URL(window.location.href);
    setPathname(url.pathname);
    setSearchParams(url.searchParams);
  };

  return (
    <RouterContext.Provider value={{ pathname, push, replace, searchParams }}>
      {children}
    </RouterContext.Provider>
  );
};

// --- Hooks ---
export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
  return { push: context.push, replace: context.replace };
};

export const usePathname = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('usePathname must be used within a RouterProvider');
  return context.pathname;
};

export const useSearchParams = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useSearchParams must be used within a RouterProvider');
  return context.searchParams;
};

// --- Link Component ---
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, onClick, ...props }) => {
  const { push } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      push(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
