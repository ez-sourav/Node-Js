import { REST, Routes } from 'discord.js';
import dotenv from "dotenv";
dotenv.config();
const commands = [
  {
    name: 'create',
    description: 'Create a new short URL',
  },
];
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands('1443826865486827563'), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}