import React from 'react';
import dynamic from 'dva/dynamic';
// import Content from '@/layout/content';
import { Route } from 'dva/router';

export function mapRouteMethod(routeArr: Array<{ path?: string; component?: any }>) {
  console.log('routeArr', routeArr);
  return routeArr.map(({ path, component }) => {
    // @ts-ignore
    // const RendrerComponent = dynamic({ component });
    // console.log('dynamic({ component })', dynamic({ component }));
    // console.log('RendrerComponent', RendrerComponent);
    return (
      <Route
        key={path}
        path={path}
        exact
        // @ts-ignore
        // render={() => <div>22222</div>}
        // @ts-ignore
        component={dynamic({
          // @ts-ignore
          component,
        })}
      />
    );
  });
}
