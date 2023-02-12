let WelcomeChannelId= '0';

var  setWelcomeChannelId=function (id)
{
  WelcomeChannelId = id;
}
var  getWelcomeChannelId=function()
{
  return  WelcomeChannelId;
}

module.exports.getWelcomeChannelId = getWelcomeChannelId;
module.exports.setWelcomeChannelId= setWelcomeChannelId;