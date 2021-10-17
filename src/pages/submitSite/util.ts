// interface SiteEditModel extends SiteModel {
//   originUrl?: string;
// }

export function checkVal(values: SiteModel, isQuickSubmit = false) {
  if (!values.originUrl) throw '请输入站点链接';
  if (!values.siteName) throw '请输入站点名称';
  if (!values.siteIcon.value) throw '请设置站点图片';
  if (!values.siteDesc) throw '请输入站点简介';
  if (values.siteImgs.length) {
    values.siteImgs = values.siteImgs.filter((item) => item.value);
  }
  if (!isQuickSubmit && !values.siteImgs.length) throw '至少添加一张站点介绍图片';
  return values;
}
