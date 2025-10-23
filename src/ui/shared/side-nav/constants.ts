import { IconName } from '@ui/shared/icon/types'

export const SIDE_NAV_MENUS_ADMIN: {
  text: string
  url: string
  icon: {
    active: IconName
    inactive: IconName
  }
}[]
  = [
    {
      text: '기업 목록',
      url: '/admin/companies',
      icon: {
        active: 'list-active',
        inactive: 'list-inactive',
      },
    },
    {
      text: '유저 목록',
      url: '/admin/users',
      icon: {
        active: 'user-active',
        inactive: 'user-inactive',
      },
    },
  ]

export const SIDE_NAV_MENUS_USER: {
  text: string
  url: string
  icon: {
    active: IconName
    inactive: IconName
  }
}[]
  = [
    {
      text: '계약 보드',
      url: '/',
      icon: {
        active: 'inventory-active',
        inactive: 'inventory-inactive',
      },
    },
    {
      text: '차량 정보',
      url: '/cars',
      icon: {
        active: 'car-active',
        inactive: 'car-inactive',
      },
    },
    {
      text: '고객 정보',
      url: '/customers',
      icon: {
        active: 'groups-active',
        inactive: 'groups-inactive',
      },
    },
    {
      text: '대시보드',
      url: '/dashboard',
      icon: {
        active: 'dashboard-active',
        inactive: 'dashboard-inactive',
      },
    },
    {
      text: '계약서 업로드',
      url: '/contract-document-upload',
      icon: {
        active: 'upload-active',
        inactive: 'upload-inactive',
      },
    },
    {
      text: '대용량 업로드',
      url: '/bulk-upload',
      icon: {
        active: 'cloud-active',
        inactive: 'cloud-inactive',
      },
    },
    {
      text: '개인정보 수정',
      url: '/account',
      icon: {
        active: 'assignment-active',
        inactive: 'assignment-inactive',
      },
    },
  ]
