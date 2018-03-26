module.exports = {
  baseUrl: 'https://yandex-shri-task-456.herokuapp.com/',
  //baseUrl: 'http://127.0.0.1:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
      desktop: {
          files: 'tests/desktop',
          //browsers: ['chrome', 'ff']
          browsers: ['chrome']
      }
  },

  browsers: {
      chrome: {
          desiredCapabilities: {
              browserName: 'chrome'
          }
      },
      // ff: {
      //     desiredCapabilities: {
      //         browserName: 'firefox'
      //     }
      // }
  }
};