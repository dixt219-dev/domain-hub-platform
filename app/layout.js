export const metadata = {
  title: 'Domain Intelligence Platform',
  description: 'Analytics and market database for short-form digital assets.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
