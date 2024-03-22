import dynamic from 'next/dynamic';

const QrCodeGeneratorNoSSR = dynamic(
  () => import('./components/QRCodeGenerator'),
  { ssr: false }
);

function MyPage() {
  return (
    <div>
      <QrCodeGeneratorNoSSR />
    </div>
  );
}

export default MyPage;
