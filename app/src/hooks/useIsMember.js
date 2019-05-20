import { useEffect } from 'react'
import { useAragonApi } from '@aragon/api-react'

const useIsMember = ethereumAddress => {
  const { api } = useAragonApi()
  useEffect(() => {
    const getMember = async () => {
      const isMember = await api.isMember().toPromise()
      console.log(isMember)
    }
    if (ethereumAddress) getMember()
  }, [api, ethereumAddress])
}

export default useIsMember
