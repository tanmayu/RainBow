const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');


var renk_sayisi = 16;
var renkler = [];
var renk_pos = 0;


client.on('ready', () =>
{
      console.log(`Giriş Yapıldı ${client.user.tag}!`);
      setInterval(RenkAyarla, config.hiz);
});

function RenkAyarla()
{
      var role = client.guilds.get(config.sunucu_id).roles.find(r => r.name=="Parti");
      //console.log(role);
      role.setColor(renkler[renk_pos]).catch(console.error);
      if (++renk_pos >= renk_sayisi) renk_pos = 0;
}

function RenkleriOlustur()
{
      var max_renk = 1;
      var kat_sayi = max_renk / renk_sayisi;
      for (var i = 0; i < max_renk; i += kat_sayi)
      {

            var genelde_e1 = rgbToString(hsvToRgb(i, 1, 1));
            console.log(genelde_e1);
            renkler.push(genelde_e1);
      }
}


function rgbToString(rgb)
{
      var r = rgb[0].toString(16), g = rgb[1].toString(16), b = rgb[2].toString(16);
      if (r.length < 2) r = '0' + r;
      if (g.length < 2) g = '0' + g;
      if (b.length < 2) b = '0' + b;
      return '#' + r + g + b;
}

function hsvToRgb(h, s, v)
{
      var r, g, b;

      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);

      switch (i % 6)
      {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
      }

      return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}


RenkleriOlustur();

client.login(config.Token);
