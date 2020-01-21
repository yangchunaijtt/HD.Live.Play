import { Toast } from 'vant'

let toast
let needLoadingRequestCount = 0

export function showApiLoading () {
  if (needLoadingRequestCount === 0) {
    toast = Toast.loading({
      message: '加载中...'
    })
  }
  needLoadingRequestCount++
}

export function hideApiLoading () {
  if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    try
    {
    toast.clear()
    }
    catch{

    }
  }
}
