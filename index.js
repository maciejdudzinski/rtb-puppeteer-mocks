const argv = require('yargs').argv
const { sleep } = require('./util')
const { exec } = require("child_process");
const { ViewPage } = require('./pom/ViewPage')

const URL = argv._[0];
const TABS = argv.n || 1;

console.log(`Starting on: ${URL} with ${TABS} tabs`);

const createTab = async (id) => {
  if (argv.delay) {
    await sleep(id * argv.delay);
  }
  console.log(`adding tab ${id}`);
  const tab = await new ViewPage(URL).launch()

  const userAgent = await tab.page.evaluate(() => navigator.userAgent );

  console.log(userAgent);
  await sleep(1000)
  await tab.enterName(`Alfredo #${id}`)
  await tab.joinViewing()
  if (argv.audio !== false) {
    await tab.turnOffAudio();
  }
}

function printCpu() {
  exec("top -b -n2 | grep \"Cpu(s)\"|tail -n 1 | awk '{print $2 + $4}'", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`CPU: ${stdout}`);

    setTimeout(printCpu, 1000);
  });
}

printCpu();

;(async function() {
  await Promise.all((Array.from(new Array(TABS))).map((el, i) => createTab(i)))
  console.log('Waiting to close...');
  await sleep(20 * 60 * 1000)
})()
