export function LayoutCenter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container sm:p-10 p-2">{children}</div>;
}
