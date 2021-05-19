export default class Api {
  static async fetchJson (url: string) {
    return await fetch(url).then(res => res.json())
  }
}
