import LoginModal from '@/component/loginModal';
import React from 'react';

export const MAP_ERR = {
  originUrl: '请输入网址',
  'siteIcon.value': '请输入站点标题',
  siteDesc: '请输入站点简介',
  siteImgs: '至少添加一张站点介绍图片',
};

export const QUICK_SUBMIT_STYPE = 'quickSubmit';

export const SUBMIT_TYPES = [
  {
    title: '登陆提交',
    desc: (arg) => (
      <>
        需要
        <a data-line onClick={() => LoginModal.show(arg, true)}>
          登录
        </a>
        才能提交，提交后能自己更新网站信息
      </>
    ),
    key: 'login',
  },
  {
    title: '快速提交',
    key: QUICK_SUBMIT_STYPE,
    desc: () => '跳过登录，不会有站点留言、收藏、点赞、留言等通知，提交之后不能通过自己更改',
  },
];
