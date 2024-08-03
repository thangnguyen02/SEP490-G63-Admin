import { useState } from 'react'
import ManagerCompany from '~/components/Admin/Employee/ManagerCompany'
import QueueCompany from '~/components/Admin/Employee/QueueCompany'

const menuCompany = [
  { id: 1, title: 'Quản lí công ty', value: 'ManagerCompany' },
  { id: 2, title: 'Yêu cầu gia hạn', value: 'QueueContract' }
]
const User = () => {
  const [tab, setTab] = useState<'ManagerCompany' | 'QueueContract'>('ManagerCompany')

  return (
    <div className='bg-[#e8eaed] h-full'>
      <div className='flex flex-wrap py-3'>
        <div className=' w-full px-3 md:w-[100%]'>
          <div className='flex gap-3 mb-3'>
            {menuCompany?.map((m) => (
              <div
                key={m.value}
                className={`${tab == m.value ? 'bg-main-color hover:bg-hover-main text-white' : 'text-black bg-white'} cursor-pointer shadow-md px-2 py-1 rounded-lg`}
                onClick={() => setTab(m.value as 'ManagerCompany' | 'QueueContract')}
              >
                {m.title}
              </div>
            ))}
          </div>
          {tab == 'ManagerCompany' ? <ManagerCompany /> : <QueueCompany />}
        </div>
      </div>
    </div>
  )
}
export default User
