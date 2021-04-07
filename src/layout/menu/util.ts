interface DivEle extends Element {
  style?: {
    cssText?: string;
  };
}

export function getNavStyle(pathname: string, styles?: any, ans?: any): object {
  if (pathname === '/') {
    return {};
  }
  const lis = ans || document.querySelectorAll('header ul li');
  for (const item of lis) {
    const anchor = item.querySelector('a');
    const url = anchor && anchor.getAttribute('data-url');
    if (url === '/') {
      continue;
    }
    if (url && pathname.includes(url)) {
      const MARGIN_LEFT = -30;
      const width = anchor.offsetWidth;
      const offsetLeft = !ans ? anchor.offsetLeft : anchor.parentNode.parentNode.offsetLeft;
      const left = offsetLeft + MARGIN_LEFT;
      const line: DivEle = document.getElementsByClassName(styles.navLine)[0];
      line.style.cssText = `transform: translateX(${left}px); width: ${width}px`;
      return {
        transform: `translateX(${left}px)`,
        width: `${width}px`,
      };
    } else {
      const innerAnchor = anchor ? anchor.querySelectorAll('a') : [];
      if (innerAnchor.length) {
        return getNavStyle(pathname, styles, innerAnchor);
      }
    }
  }
  return {};
}
