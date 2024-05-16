import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAccessToken } from '~/config/accessToken'
import useToast from '~/hooks/useToast'
import { useAuth } from '~/provider/authProvider'

const Logout = () => {
  const navigate = useNavigate()
  const { removeToken } = useAuth()
  const { successNotification } = useToast()
  useEffect(() => {}, [])
  return <div>Logout page</div>
}

export default Logout
