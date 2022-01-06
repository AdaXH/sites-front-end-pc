import React from 'react';
import dynamic from 'dva/dynamic';
// import Content from '@/layout/content';
import { Route } from 'dva/router';

export function mapRouteMethod(
  routeArr: Array<{ path?: string; component?: any; exact?: boolean }>,
) {
  return routeArr.map(({ path, component, exact = true }) => {
    // @ts-ignore
    // const RendrerComponent = dynamic({ component });
    // console.log('dynamic({ component })', dynamic({ component }));
    // console.log('RendrerComponent', RendrerComponent);
    return (
      <Route
        key={path}
        path={path}
        exact={exact}
        // @ts-ignore
        component={dynamic({
          // @ts-ignore
          component,
        })}
      />
    );
  });
}
