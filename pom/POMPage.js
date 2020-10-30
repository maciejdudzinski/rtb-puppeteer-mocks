const puppeteer = require('puppeteer')

class POMPage {
  browser
  path
  page
  response

  constructor(path) {
    this.path = path
  }

  async launch() {
    this.browser = await puppeteer.launch({
      // ignoreDefaultArgs: ['--mute-audio'],
      args: [
        '--allow-file-access-from-files',
        '--autoplay-policy=no-user-gesture-required',
        '--use-fake-device-for-media-stream',
        `--use-file-for-fake-video-capture=${process.cwd()}/assets/pacino.mjpeg`,
        `--use-file-for-fake-audio-capture=${process.cwd()}/assets/pacino.wav`,
        '--use-fake-ui-for-media-stream',
        '--enable-features=NetworkService'
      ],
      slowMo: process.env.DEBUG ? 20 : undefined,
      headless: !process.env.DEBUG
    })

    this.page = await this.browser.newPage()
    const url = `http://${process.env.TARGET_DOMAIN}${this.path}`

    this.response = await this.page.goto(url)

    return this
  }

  close() {
    if (!this.browser) {
      throw new Error('Tried to close browser before opening it!')
    }

    return this.browser.close()
  }
}

module.exports.POMPage = POMPage
