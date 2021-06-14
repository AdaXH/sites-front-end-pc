// @ts-nocheck

function forUrl() {
  const title = '站点聚合平台';
  const pic =
    'http://sinacloud.net/ada.bucket/extra/%E6%88%AA%E5%B1%8F2021-03-20%20%E4%B8%8B%E5%8D%885.10.21.png';
  const p = {
    url: 'https://sites.applinzi.com',
    showcount: '0' /*是否显示分享总数,显示：'1'，不显示：'0' */,
    summary: '让更多的人知道你的网站，因为热爱，所以相聚' /*分享摘要(可选)*/,
    title /*分享标题(可选)*/,
    pics:
      'http://sinacloud.net/ada.bucket/extra/%E6%88%AA%E5%B1%8F2021-03-20%20%E4%B8%8B%E5%8D%885.10.21.png' /*分享图片的路径(可选)*/,
    style: '203',
    width: 98,
    height: 22,
  };
  const s = [];
  for (let key in p) s.push(key + '=' + encodeURIComponent(p[key] || ''));
  return {
    qZone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'),
    sina: () => {
      (function (s, d, e) {
        try {
        } catch (e) {}
        var f = 'http://v.t.sina.com.cn/share/share.php?',
          u = 'sites.applinzi.com',
          p = ['url=', e(u), '&title=', e(title), '&appkey=2924220432', '&pic=', pic].join('');
        function a() {
          if (
            !window.open(
              [f, p].join(''),
              'mb',
              [
                'toolbar=0,status=0,resizable=1,width=620,height=450,left=',
                (s?.width - 620) / 2,
                ',top=',
                (s?.height - 450) / 2,
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

const { sina, qZone } = forUrl();
export const SHARE_LIST = [
  { onClick: sina, text: '分享到微博', icon: 'iconsina' },
  { url: qZone, text: '分享QQ空间', icon: 'iconiconqzone' },
  { url: 'https://github.com/Sites-Groups', text: 'GitHub', icon: 'icongithub1' },
];
