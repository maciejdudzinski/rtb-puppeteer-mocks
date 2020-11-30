const { getDocument, queries } = require('pptr-testing-library')

const { sleep } = require('../util')
const { POMPage } = require('./POMPage')

class ViewPage extends POMPage {
  async getJoiningButton() {
    const $document = await getDocument(this.page)

    return queries.getByText($document, 'Join the game')
  }

  async joinViewing() {
    const $button = await this.getJoiningButton()
    await $button.click()
  }

  async toggleVideo() {
    const $document = await getDocument(this.page)

    const toggle = await queries.getByLabelText($document, 'toggle-video')

    await toggle.click()
  }

  async turnOffAudio() {
    console.log('trying to turn off audio')
    const $document = await getDocument(this.page)

    const toggle = await queries.queryByTitle($document, 'Turn off microphone')

    if (toggle !== null) {
      await toggle.click()
    } else {
      await sleep(200)
      await this.turnOffAudio()
    }
  }

  async enterName(name) {
    const $document = await getDocument(this.page)

    const toggle = await queries.getByLabelText($document, 'Nickname')

    await toggle.type(name)
  }
}

module.exports.ViewPage = ViewPage
