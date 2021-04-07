export function reDesignData(obj: SiteModel) {
  const result = { ...obj };

  try {
    const [linkPrefix, siteLink] = obj.siteLink.split('//');
    result.linkPrefix = linkPrefix + '//';
    result.siteLink = siteLink;
    return result;
  } catch (error) {
    return result;
  }
}
