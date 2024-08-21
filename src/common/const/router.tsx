import { EyeIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

export const routerAdmin = [
  {
    id: 1,
    title: 'Tổng quan',
    slug: '/',
    icon: <EyeIcon className='h-4 w-4' />
  },
  // {
  //   id: 2,
  //   title: 'Khách hàng',
  //   slug: '/customer',
  //   icon: <UserGroupIcon className='h-4 w-4' />
  // },
  {
    id: 3,
    title: 'Gói dịch vụ',
    slug: '/price',
    icon: <CurrencyDollarIcon className='h-4 w-4' />
  }
]
