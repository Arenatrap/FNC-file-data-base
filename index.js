require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const db = require("./database");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", message => {
  if (!message.guild || message.author.bot) return;

  db.run(
    "INSERT OR IGNORE INTO servers VALUES (?, ?)",
    [message.guild.id, message.guild.name]
  );

  db.run(
    "INSERT OR IGNORE INTO channels VALUES (?, ?, ?)",
    [message.channel.id, message.guild.id, message.channel.name]
  );

  db.run(
    "INSERT OR IGNORE INTO users VALUES (?, ?)",
    [message.author.id, message.author.username]
  );

  db.run(
    "INSERT OR IGNORE INTO messages VALUES (?, ?, ?, ?, ?, ?)",
    [
      message.id,
      message.guild.id,
      message.channel.id,
      message.author.id,
      message.content,
      message.createdAt.toISOString()
    ]
  );
});

client.login(process.env.DISCORD_TOKEN);