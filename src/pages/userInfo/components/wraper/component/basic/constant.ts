export const USER_INFO = [
  {
    code: 'name',
    name: '用户名',
    type: 'input',
  },
  {
    code: 'myDesc',
    name: '个人简介',
    type: 'textarea',
  },
  {
    code: 'gender',
    name: '性别',
    type: 'radio',
    options: ['男', '女', '小猫咪'],
  },
  {
    code: 'email',
    name: 'email',
    type: 'input',
    readOnly: true,
    disabled: true,
  },
];
