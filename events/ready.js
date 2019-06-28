module.exports = async (client, $) => {
  console.log(`${client.user.tag} started with ${client.users.size} users in ${client.guilds.size} guilds.`);
  client.user.setActivity('!help');
}