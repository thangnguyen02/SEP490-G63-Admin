import { DataPrice } from '~/pages/Admin/Price'
import { DataCustomer } from '~/pages/Admin/User'

//Lưu trữ các data fake trên trang web
export const dataCustomer: DataCustomer[] = [
  {
    id: '1',
    customerName: 'Công ty A',
    startDate: '03/12/2023',
    endDate: '03/12/2024',
    registerDate: '17/11/2023',
    taxCode: '0178467893 - 001',
    status: 'PROGRESS',
    money: 2500000
  },
  {
    id: '2',
    customerName: 'Công ty B',
    startDate: '03/12/2023',
    endDate: '03/12/2024',
    registerDate: '17/11/2023',
    taxCode: '0178467893 - 001',
    status: 'CANCEL',
    money: 2500000
  },
  {
    id: '3',
    customerName: 'Công ty C',
    startDate: '03/12/2023',
    endDate: '03/12/2024',
    registerDate: '17/11/2023',
    taxCode: '0178467893 - 001',
    status: 'EXPIRED',
    money: 2500000
  },
  {
    id: '4',
    customerName: 'Công ty D',
    startDate: '03/12/2023',
    endDate: '03/12/2024',
    registerDate: '17/11/2023',
    taxCode: '0178467893 - 001',
    status: 'WAIT',
    money: 2500000
  }
]
export const dataPrice: DataPrice[] = [
  {
    id: 'b6f08e25-8ed0-4383-a5e6-29f67846aa43',
    name: '6 Months',
    description: null,
    price: 5000000
  },
  {
    id: 'e645e7e3-66d1-4c5e-a535-425cc80fcb3a',
    name: '3 Months',
    description: null,
    price: 2500000
  },
  {
    id: 'f02b83dc-083c-43be-9fb1-640f441626c1',
    name: '12 Months',
    description: null,
    price: 7500000
  }
]
