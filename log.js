const channelName = 'log';
const common = require('./common');

async function log(message) {
  getLogChannel().send(message);
}

function getLogChannel() {
  return common.findTextChannelByChannelName(channelName);
}

module.log = log;
