import { State } from '.';

export async function queryList(page: number): Promise<State> {
  return new Promise((resolve, reject) => {
    fetch(
      `https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/siteslib/static/global-article-${page}.json`,
      {
        mode: 'cors',
      },
    )
      .then((res) => res.json())
      .then((d) => {
        if (d) {
          resolve(d);
        }
      })
      .catch(reject);
  });
}
