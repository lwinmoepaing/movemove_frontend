// ~/plugins/axios.js
export default function({ $axios, app, store }) {
  try {
    if (process.env.NODE_ENV !== 'production') {
      $axios.onError((error) => {
        // const Console = console
        // Console.table(error)
        throw error
      })
    }
  } catch (e) {}
}
