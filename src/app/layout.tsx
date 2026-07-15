import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '苍穹工会 | 暗黑破坏神：不朽',
  description: '暗黑破坏神：不朽 - 苍穹工会官方活动页面。加入我们，征服庇护之地最黑暗的角落。',
  keywords: ['暗黑破坏神', '不朽', 'Diablo Immortal', '苍穹工会', '工会活动'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased bg-abyss text-ash">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
