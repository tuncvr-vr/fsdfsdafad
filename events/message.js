const ayarlar = require('../ayarlar.json');
const Discord = require("discord.js");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, );

  let client = message.client;
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);

  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    const Database = require("plasma-db");
    const db = new Database("./database.json"); 
     let engin = db.fetch(`yasaklandı_${message.guild.id}`)
      if (cmd.help.name === engin) {
         return message.channel.send(`**${engin}** isimli komut bu sunucuda yasaklanmıştır!`)
          return
      
    }
    
    if (perms < cmd.conf.permLevel) return;

	 let karaliste = db.fetch(`ckaraliste.${message.author.id}`)
 const elminstêr = new Discord.MessageEmbed()
 .setColor(`RED`)
 .setFooter(`Grogu bot`)
 .setDescription(`:x: **${karaliste}** sebebiyle karalisteye alınmışsın!\n> Beyaz listeye alınmak istiyorsan [BURAYA](https://discord.gg/q4wbRrEetP) gelebilirsin!`)
  if(karaliste) return message.channel.send(elminstêr)    
    cmd.run(client, message, params, perms);
  }
};