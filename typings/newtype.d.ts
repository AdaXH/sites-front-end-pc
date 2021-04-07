declare module 'state-typings' {
  import { StateType } from 'typesafe-actions';
  import { User as UserState } from '@/models/user';
  // export type User = StateType<typeof import('../src/models/user')>;
  export type User = UserState;
  // export type RootState = StateType<typeof import('./root-reducer').default>;
  export type RootState = {
    user: User;
  };

  // export type RootAction = ActionType<typeof import('./root-action').default>;

  // interface Types {
  //   RootAction: RootAction;
  // }
}
