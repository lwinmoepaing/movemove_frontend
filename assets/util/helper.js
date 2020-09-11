// Custom Error Handler
export const errorHandler = (errorResponse, self, asyncDataStore, redirect) => {
  // console.log('ErrorResponse Inside ErrorHandler', errorResponse)
  const { message, data, statusCode: errorCode } = JSON.parse(
    JSON.stringify(errorResponse.response.data)
  )
  const messageArray = []

  if (typeof data === 'object' && data !== null) {
    data.map((mes) => {
      messageArray.push(mes.message)
    })
  } else {
    setCustomMessage(message, (mes) =>
      typeof mes === 'object'
        ? messageArray.push(...mes)
        : messageArray.push(mes)
    )
  }

  if (self) {
    self.setSnackMessage(messageArray)
    self.setSnackColor(null)
    self.showSnack()
  }

  // Token expired or 401
  if (errorCode === 401) {
    // Client Side and if User Already Exist
    // console.log('selfStore', self)
    if (self && self.$store.getters['auth/user']) {
      // Logout
      self.setSnackMessage([
        'Token Expired !! Your Acc is open new window or app.',
        'User အကောင့် တခြားဖုန်း သို့ ဝက်ဘ်ဆိုက်တွင်ဝင်နေပါသည်။'
      ])
      self.setSnackColor('error')
      setTimeout(() => {
        self.$store.dispatch('auth/resetAuth')
      }, 3000)
    }
    // AsyncDataStore and If User Already Exist
    if (asyncDataStore && asyncDataStore.getters['auth/user']) {
      // To Logout Return Data
      // asyncDataStore.dispatch('auth/resetAuth')
      return {
        toLogout: true,
        messageArray
      }
    }

    if (asyncDataStore) {
      return {
        errorCode
      }
    }
  }

  if (errorCode === 404 && redirect) {
    redirect('/')
  }

  if (errorCode === 400 && redirect) {
    redirect('/')
  }
}

// AsyncData Error Handler
export const aysncErrorHandler = (self) => {
  if (self.toLogout) {
    self.showSnack()
    self.setSnackMessage([
      'Token Expired !! Your Acc is open new window or app.',
      'User အကောင့် တခြားဖုန်း သို့ ဝက်ဘ်ဆိုက်တွင်ဝင်နေပါသည်။'
    ])
    self.setSnackColor('error')

    setTimeout(() => {
      self.$store.dispatch('auth/resetAuth')
    }, 3000)

    return true
  }

  return false
}

// Set Jwt Header
export const setJwtHeader = (token, type = 'application/json') => ({
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': type
  }
})

function setCustomMessage(mes, cb) {
  let returnMessage

  returnMessage = mes
  if (
    mes ===
    'You hv not permission to Update This Story. This is not your own story.'
  ) {
    returnMessage = 'ကိုယ်ပိုင် Story မဟုတ်သည့်အတွက် ပြင်ဆင်မရပါ။'
  }

  if (
    mes ===
    'You need to add Billing to make more episode. Limited Episode is gone.'
  ) {
    returnMessage = [
      'သတ်မှတ် အပိုင်း ကျော်လွန်သဖြင့် bill ထည့်ပြီး အပုဒ်တိုးနိုင်ပါသည်။',
      'Phone: 09420059241 ကိုဆက်သွယ်ပါ။'
    ]
  }

  if (
    mes === 'You need to add Billing to make more Story. Limited Story is gone.'
  ) {
    returnMessage = [
      'လစဉ် သတ်မှတ်ထားသော Story အပုဒ်ကျော်လွန်၍ Bill ထည့်ပြီး  အပုဒ်တိုးနိုင်ပါသည်။',
      'Phone: 09420059241 ကိုဆက်သွယ်ပါ။'
    ]
  }

  cb(returnMessage)
}
