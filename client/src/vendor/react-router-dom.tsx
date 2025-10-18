import React, { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import {
  Router as WouterRouter,
  Switch,
  Route as WouterRoute,
  Link as WouterLink,
  useLocation as useWouterLocation,
  useParams as useWouterParams,
} from "wouter";

export interface BrowserRouterProps {
  children: ReactNode;
}

export function BrowserRouter({ children }: BrowserRouterProps) {
  return <WouterRouter>{children}</WouterRouter>;
}

export interface RoutesProps {
  children: ReactNode;
}

export function Routes({ children }: RoutesProps) {
  return <Switch>{children}</Switch>;
}

export interface RouteProps {
  path?: string;
  element: ReactNode;
}

export function Route({ path, element }: RouteProps) {
  let resolvedPath = path ?? "/";
  if (resolvedPath === "*") {
    resolvedPath = "/:rest*";
  } else if (resolvedPath === "") {
    resolvedPath = "/";
  }
  return <WouterRoute path={resolvedPath}>{element}</WouterRoute>;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...rest },
  ref,
) {
  return (
    <WouterLink href={to} {...rest} ref={ref}>
      {children}
    </WouterLink>
  );
});

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  end?: boolean;
  className?: string | ((state: { isActive: boolean }) => string | undefined);
  children: ReactNode | ((state: { isActive: boolean }) => ReactNode);
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, end, className, children, ...rest },
  ref,
) {
  const [location] = useWouterLocation();
  const normalize = (value: string) => (value.endsWith("/") && value !== "/" ? value.slice(0, -1) : value);
  const current = normalize(location);
  const target = normalize(to || "/");
  const isActive = end ? current === target : current === target || current.startsWith(target + "/");
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className ?? undefined;
  const renderedChildren =
    typeof children === "function" ? children({ isActive }) : children;

  return (
    <WouterLink href={to} className={resolvedClassName} {...rest} ref={ref}>
      {renderedChildren}
    </WouterLink>
  );
});

export function useLocation() {
  const [location] = useWouterLocation();
  return React.useMemo(() => ({ pathname: location }), [location]);
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return (useWouterParams() as T) ?? ({} as T);
}

export function Outlet() {
  return null;
}
