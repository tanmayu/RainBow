##REPLACE THESE VALUES
bot_key="PlAcEhOlDeR"
default_role="top"
##--------------------
import discord
import os
import asyncio
from discord.ext import commands
from discord.ext.commands import Bot
from time import sleep
from colorsys import hls_to_rgb
client = discord.Client()
dothething = {}
@client.event
async def on_ready():
        print('Logged in as')
        print(client.user.name)
        print(client.user.id)
        print('------')
@client.event
async def on_message(message):
        global dothething
        if message.author == client.user:
                return
        if message.content.startswith("+stop"):
                await message.channel.send("stopped")
                try:
                        dothething[str(message.server.id)]=0
                except:
                        print("err")
        if message.content.startswith("+start"):
                await message.channel.send ("started")
                hue=0
                if message.content.strip().startswith("+start "):
                        role = discord.utils.find(lambda m: m.name == message.content[6:].strip() ,message.server.roles)
                else:
                        role = discord.utils.find(lambda m: m.name == default_role ,message.server.roles)
                try:
                        dothething[str(message.server.id)]
                except:
                        dothething[str(message.server.id)]=0
                if role and not dothething[str(message.server.id)]:
                        dothething[str(message.server.id)]=1
                        while dothething[str(message.server.id)]:
                                users = [int(str(x.status)=="online") for x in message.server.members if role in x.roles] #black magic fuckery here
                                users.append(0)
                                print(str(message.server.name)+" - "+str(users))
                                if max(users):
                                        for i in range(50): #arbitrary rate limits
                                                if not dothething[str(message.server.id)]:
                                                        break
                                                hue = (hue+7)%360
                                                rgb = [int(x*255) for x in hls_to_rgb(hue/360, 0.5, 1)]
                                                await asyncio.sleep(1/5)
                                                clr = discord.Colour(((rgb[0]<<16) + (rgb[1]<<8) + rgb[2]))
                                                await asyncio.sleep(0.5)
                                                try:
                                                        await client.edit_role(message.server, role, colour=clr)
                                                except:
                                                        print("no perms" + str(message.server.name))
                                                        dothething[str(message.server.id)]=0
                                else:
                                        #await asyncio.sleep(10)
                                        pass
                                        
client.run('NjMyNTYzNTczMDI1MTQ0ODUy.XaHO3A.TwlfbpVwf4OkOw0O5LU7Sewdol4')

