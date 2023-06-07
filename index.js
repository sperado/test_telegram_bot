"use strict";

const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const text = require("./const");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Привет ${
      ctx.message.from.first_name
        ? ctx.message.from.first_name
        : ", я не знаю твоего имени"
    }`
  )
);
bot.help((ctx) => ctx.reply(text.commands));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

bot.command("info", async (ctx) => {
  try {
    await ctx.replyWithHTML(
      "<b>Информация о Ваньке </b>",
      Markup.inlineKeyboard([
        [Markup.button.callback("Ванек Общажный(Молодой)", "btn_1")],
        [Markup.button.callback("Ванек Лежащий(Молодой)", "btn_2")],
        [Markup.button.callback("Базач", "btn_3")],
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

function addActionBot(name, src, text) {
  bot.action(name, async (ctx) => {
    try {
      await ctx.answerCbQuery();
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true,
      });
    } catch (e) {
      console.error(e);
    }
  });
}
addActionBot("btn_1", "./img/1.jpg", text.text1);
addActionBot("btn_2", "./img/2.jpg", text.text2);
addActionBot("btn_3", "./video/хуевая ситуация.mp4", text.text3);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
