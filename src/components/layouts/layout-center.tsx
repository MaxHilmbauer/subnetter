export function LayoutCenter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container sm:p-10 p-0">{children}</div>;
}
