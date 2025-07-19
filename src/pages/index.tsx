import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = {
  platform: 'webview' | 'mobile' | 'desktop';
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgent = context.req.headers['user-agent'] || '';
  const query = context.query;

  const isTrustWallet = ['Trust_Android_Browser', 'Trust_iOS_Browser'].includes(query?.utm_source as string);
  const isWebView = isTrustWallet || /Binance|MiuiBrowser|wv|FBAV|FBAN/i.test(userAgent);
  const isMobile = /Android|iPhone|iPad|Mobile/i.test(userAgent);

  let platform: Props['platform'] = 'desktop';

  if (isWebView) platform = 'webview';
  else if (isMobile) platform = 'mobile';

  console.log("User-Agent:", userAgent);
  console.log("Query:", query);
  console.log("Platform Detected:", platform);

  return {
    props: { platform },
  };
};

export default function Home({ platform }: Props) {
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const utmSource = query.get('utm_source');

    const redirectTo = (path: string) => {
      const target = utmSource ? `${path}?utm_source=${utmSource}` : path;
      router.replace(target);
    };

    if (platform === 'webview') redirectTo('/webview');
    else if (platform === 'mobile') redirectTo('/mobile');
    else redirectTo('/desktop');
  }, [platform]);

  return <p>Detecting platform...</p>;
}