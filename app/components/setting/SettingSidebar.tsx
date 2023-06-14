import React from 'react'
import { NavLink } from '@remix-run/react';
import classNames from 'classnames';
import { PAGE_ENDPOINTS } from '~/constants/constant';
import { Icons } from '../shared/Icons';

export default function SettingSidebar() {
  return (
    <div className="menu__sidebar">
    <div className="menu__sidebar-title">
      <h1 className="text-2xl font-bold">User Settings</h1>
    </div>
    <div className="menu__sidebar-menu">
      <NavLink
        to={PAGE_ENDPOINTS.SETTINGS.ROOT}
        end
        className={({ isActive }) => {
          return classNames("menu__sidebar-item", {
            active: isActive,
          });
        }}
      >
        <Icons.UserProfile className="mr-4 h-6 w-6 fill-current opacity-75" />
        <span>Profile</span>
      </NavLink>
      <NavLink
        to={PAGE_ENDPOINTS.SETTINGS.ACCOUNT}
        end
        className={({ isActive }) => {
          return classNames("menu__sidebar-item", {
            active: isActive,
          });
        }}
      >
        <Icons.Settings className="mr-4 h-6 w-6 fill-current opacity-75" />
        <span>Account</span>
      </NavLink>
    </div>
  </div>
  )
}
