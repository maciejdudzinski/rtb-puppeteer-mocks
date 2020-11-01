const argv = require('yargs').argv
const puppeteer = require('puppeteer')

class POMPage {
  browser
  url
  page
  response

  constructor(url) {
    this.url = url
  }

  async launch() {
    this.browser = await puppeteer.launch({
      // ignoreDefaultArgs: ['--mute-audio'],
      args: [
        '--allow-file-access-from-files',
        '--autoplay-policy=no-user-gesture-required',
        '--use-fake-device-for-media-stream',
        `--use-file-for-fake-video-capture=${process.cwd()}/assets/pacino.mjpeg`,
        `--use-file-for-fake-audio-capture=${process.cwd()}/assets/${ argv.audio === false ? 'silent' : 'pacino'}.wav`,
        '--use-fake-ui-for-media-stream',
        '--enable-features=NetworkService'
      ],
      slowMo: process.env.DEBUG ? 20 : undefined,
      headless: !process.env.DEBUG
    })

    this.page = await this.browser.newPage()

    this.response = await this.page.goto(this.url)

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
