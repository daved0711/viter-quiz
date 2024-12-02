import { setSuccess } from '@/components/Store/storeAction';
import { StoreContext } from '@/components/Store/storeContext'
import { CheckCircle } from 'lucide-react'
import React from 'react'

const ToastSuccess = () => {
  const {dispatch,store} = React.useContext(StoreContext);
  React.useEffect (() => {
    setTimeout(()=>{
      dispatch(setSuccess(false))
    },3000);
  }, []);
  return (
    <>
      <div className='fixed top-10 left-1/2 -translate-x-1/2 border border-line bg-primary text-success flex gap-2 items-center \
      p-1.5 px-2.5 rounded-md'>
          <CheckCircle size={16}/>
         {store.message}
      </div>
    </>
  )
}

export default ToastSuccess
