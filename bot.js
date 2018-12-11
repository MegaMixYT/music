const discord = require('discord.js')
const bot = new discord.Client()
const prefix = "f:"
bot.commands = new discord.Collection()

require('fs').readdir('./commands/', (err, files) => {
  if (err) return console.error("Error loading commands.");
  files.filter(f => f.split(".").pop() == "js").forEach((f,i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`))
  })
})

bot.on('ready', () => {
  console.log("%s is ready!".replace("%s", bot.user.username))
})

bot.on('message', message => {
  const mArray = message.content.split(" ");
  const args = mArray.slice(1)
  const log_cmd = mArray[0].slice(prefix.length)
  const cmd = bot.commands.get(log_cmd)
  
  if (cmd) {
    cmd.run(bot, message, args)
    console.log(`${message.author.username} just used the ${log_cmd} command.`)
  }
})

bot.login(process.env.token)