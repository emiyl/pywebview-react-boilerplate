import { useState, useEffect } from 'react'

export function usePythonState(propName) {
  const [propValue, setPropValue] = useState()

  function subscribeToState() {
    window.pywebview.state.addEventListener('change', function(event) {
      console.log('state change event received for', event.detail.key, 'new value:', event.detail.value)
      setPropValue(event.detail.value)
    })
  }


  useEffect(() => {
    if (window.pywebview) {
      subscribeToState()
    } else {
      window.addEventListener('pywebviewready', subscribeToState)
    }
  }, [])

  return propValue
}

export function usePythonApi(apiName, apiContent) {
  window.pywebview.api = window.pywebview.api || {}
  window.pywebview.api[apiName](apiContent)
}
