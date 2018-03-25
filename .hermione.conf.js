module.exports = {
  baseUrl: 'https://yandex-shri-task-456.herokuapp.com/',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
      desktop: {
          files: 'tests/desktop',
          browsers: ['chrome', 'ff']
      }
  },

  browsers: {
      chrome: {
          desiredCapabilities: {
              browserName: 'chrome'
          }
      },
      ff: {
          desiredCapabilities: {
              browserName: 'chrome'
          }
      }
  }
};