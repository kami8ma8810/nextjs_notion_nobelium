import 'prismjs/themes/prism.css';
import 'react-notion-x/src/styles.css';
import 'katex/dist/katex.min.css';
import '@/styles/globals.css';
import '@/styles/notion.css';
import BLOG from '@/blog.config';
import dynamic from 'next/dynamic';
import { LocaleProvider } from '@/lib/locale';
import Scripts from '@/components/Scripts';
import { ThemeProvider } from 'next-themes'; //ライト・ダークモード切替のためのパッケージ

const Ackee = dynamic(() => import('@/components/Ackee'), { ssr: false });
const Gtag = dynamic(() => import('@/components/Gtag'), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Scripts />
      <LocaleProvider>
        <>
          {BLOG.isProd && BLOG?.analytics?.provider === 'ackee' && (
            <Ackee
              ackeeServerUrl={BLOG.analytics.ackeeConfig.dataAckeeServer}
              ackeeDomainId={BLOG.analytics.ackeeConfig.domainId}
            />
          )}
          {BLOG.isProd && BLOG?.analytics?.provider === 'ga' && <Gtag />}
          {/* ライト・ダークモードを切り替える部分 */}
          <ThemeProvider
            attribute="class"
            defaultTheme={BLOG.appearance}
            themes={['light', 'dark']}
            enableSystem={false} //ライト・ダークでprefers-color-sckemeを切り替えるかどうか
          >
            <Component {...pageProps} />
          </ThemeProvider>
        </>
      </LocaleProvider>
    </>
  );
}

export default MyApp;
