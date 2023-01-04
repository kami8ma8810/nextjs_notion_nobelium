import classNames from 'classnames';
import { useEffect, useRef, useMemo, useState } from 'react';
import Link from 'next/link';
import BLOG from '@/blog.config';
import { useLocale } from '@/lib/locale';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { SunIcon } from '@heroicons/react/solid';
import { MoonIcon } from '@heroicons/react/solid';

const NavBar = () => {
  const locale = useLocale();
  const router = useRouter();
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    // { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    // { id: 2, name: locale.NAV.SEARCH, to: '/search', show: true },
  ];
  const activeNav = useMemo(() => {
    //Blog
    if (router.asPath === links[0].to) return links[0].to;

    //Projectsというページの場合
    // if (router.pathname === links[1].to || router.asPath.includes('projects'))
    //   return links[1].to;

    // About
    if (router.asPath === links[1].to) return links[1].to;

    // Search
    // if (router.asPath === links[2].to) return links[2].to;

    // デフォルト
    return links[0].to;
  }, [router]);

  // ライト・ダークモード用テーマの設定
  const { theme, setTheme } = useTheme();

  // heroiconを使うとSSRをする場合にlocalstorageの変数を用いてsvgをレンダリングするときにエラー（Warning: Prop `d` did not match）が出るため、クライアント側でレンダリングできるようにする
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row items-center gap-x-4">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className={classNames(
                  'block text-black dark:text-gray-50 nav',
                  {
                    'border-b-2 border-yellow-dark dark:border-yellow':
                      link.to === activeNav,
                  }
                )}
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
        <li>
          <button
            className="block p-2 bg-night dark:bg-day rounded-full transition-all duration-200"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="toggle Dark Mode"
          >
            {/* // heroiconを使うとSSRをする場合にlocalstorageの変数を用いてsvgをレンダリングするときにエラー（Warning: Prop `d` did not match）が出るため、クライアント側でレンダリングできるようにする */}
            {loaded && theme === 'light' ? (
              <MoonIcon
                className="w-5 h-5 text-day"
                suppressHydrationWarning={true}
              />
            ) : (
              <SunIcon
                className="w-5 h-5 text-night"
                suppressHydrationWarning={true}
              />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(null);
  const sentinalRef = useRef([]);
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full');
      } else {
        navRef.current?.classList.remove('sticky-nav-full');
      }
    } else {
      navRef.current?.classList.add('remove-sticky');
    }
  };
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef]);
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title} className="flex align-item-center">
              <Image
                src="/logo.png"
                alt=""
                width={50}
                height={50}
                objectFit="contain"
              />
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title}
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
