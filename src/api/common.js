export default class Api {
  static async fetchJson (url) {
    return await fetch(url).then(res => res.json())
  }
}
