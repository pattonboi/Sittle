import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='p)')

@bot.event
async def on_ready():
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')

@bot.command()
async def greet(ctx):
    await ctx.send(":smiley: :wave: Hello, there!")
async def finger(ctx):
    await ctx.send(":middle_finger:")
bot.run('NDY5Njk2MzYzOTAzMzIwMDY1.DjLejw.EARGaWtP1MgFyFyg1POHmxs2FmY')
