// @ts-nocheck
export function mapChildren(obj: any, param: {}) {
  if (!obj) return obj;
  try {
    const newChildren = obj.props.children.map((item: any) => {
      return {
        ...item,
        props: {
          ...item.props,
          ...param,
        },
      };
    });
    return {
      ...obj,
      props: {
        ...obj.props,
        children: newChildren,
      },
    };
  } catch (error) {
    return obj;
  }
}

function forUrl() {
  const title = '个人主页';
  const pic =
    'http://wx4.sinaimg.cn/mw690/a99a6e98ly1fox8tzjwvaj211l0hmq39.jpg || http://wx4.sinaimg.cn/mw690/a99a6e98ly1fox8u9irlkj211x0hndnw.jpg || http://wx4.sinaimg.cn/mw690/a99a6e98ly1fox8u5cwpsj211y0hltn0.jpg || http://wx4.sinaimg.cn/mw690/a99a6e98ly1fox8udqz9yj211x0hntde.jpg';
  const p = {
    url: 'https://www.adaxh.site',
    showcount: '1' /*是否显示分享总数,显示：'1'，不显示：'0' */,
    summary: '个人主页，快来看看吧！' /*分享摘要(可选)*/,
    title /*分享标题(可选)*/,
    pics: 'https://camo.githubusercontent.com/55b9bef92d318357c3688e135d9723519f7085f1/687474703a2f2f7778322e73696e61696d672e636e2f6d773639302f61393961366539386c7931666f783962396c3434696a32307367306c633435372e6a7067' /*分享图片的路径(可选)*/,
    style: '203',
    width: 98,
    height: 22,
  };
  const s = [];
  for (const key in p) s.push(key + '=' + encodeURIComponent(p[key] || ''));
  return {
    qZone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'),
    sina: () => {
      (function (s, d, e) {
        const f = 'http://v.t.sina.com.cn/share/share.php?',
          u = d.location.href,
          p = ['url=', e(u), '&title=', e(title), '&appkey=2924220432', '&pic=', e(pic)].join('');
        function a() {
          if (
            !window.open(
              [f, p].join(''),
              'mb',
              [
                'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
                (s.width - 620) / 2,
                ',top=',
                (s.height - 450) / 2,
              ].join(''),
            )
          )
            u.href = [f, p].join('');
        }
        if (/Firefox/.test(navigator.userAgent)) {
          setTimeout(a, 0);
        } else {
          a();
        }
      })(document, document, encodeURIComponent);
    },
  };
}
export const operations = [
  { url: 'https://github.com/AdaXH', text: 'GitHub', icon: 'icon-github' },
  { url: forUrl().sina, text: '分享到微博', icon: 'icon-weibo' },
  { url: forUrl().qZone, text: '分享QQ空间', icon: 'icon-qqkongjian' },
  {
    url: 'http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes',
    text: '快速咨询',
    icon: 'icon-qq1',
  },
];
