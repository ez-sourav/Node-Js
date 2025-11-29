import { REST, Routes } from 'discord.js';
import dotenv from "dotenv";
dotenv.config();
const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];
const rest = new REST({ version: '10' }).setToken(TOKEN);