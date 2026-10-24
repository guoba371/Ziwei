import type { Role } from './quiz';
import { constellations } from './constellations';

export async function createResultCard(role: Role): Promise<Blob> {
  await document.fonts.load('600 96px "Noto Serif SC Variable"', role.name);
  await document.fonts.ready;
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('当前浏览器无法生成图片，请换一个浏览器重试。');

  const blue = '#304fc5';
  ctx.fillStyle = '#f6f7f2';
  ctx.fillRect(0, 0, 1080, 1440);
  ctx.fillStyle = '#eaf0ff';
  ctx.fillRect(44, 44, 992, 1352);
  ctx.strokeStyle = blue;
  ctx.lineWidth = 1;
  ctx.strokeRect(64, 64, 952, 1312);
  ctx.textAlign = 'left';
  ctx.fillStyle = blue;
  ctx.font = '28px "Microsoft YaHei", sans-serif';
  ctx.fillText('星系角色图鉴', 108, 137);
  ctx.textAlign = 'right';
  ctx.fillText(`${String(role.mark + 1).padStart(2, '0')} / 08`, 972, 137);

  ctx.save();
  ctx.translate(270, 205);
  ctx.scale(2.7, 2.7);
  ctx.lineWidth = 0.7;
  ctx.globalAlpha = 0.3;
  ctx.beginPath();
  ctx.arc(100, 100, 85, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(100, 100, 94, 35, (-32 + role.mark * 9) * Math.PI / 180, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([2, 5]);
  ctx.beginPath();
  ctx.arc(100, 100, 62, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1.4;
  const points = constellations[role.mark];
  ctx.beginPath();
  points.forEach(([x, y], index) => index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
  ctx.stroke();
  points.forEach(([x, y], index) => {
    ctx.beginPath();
    ctx.arc(x, y, index === 2 ? 6 : 3, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  ctx.textAlign = 'center';
  ctx.font = '600 100px "Noto Serif SC Variable", serif';
  ctx.fillText(role.name, 540, 850);
  ctx.font = '24px "Microsoft YaHei", sans-serif';
  ctx.fillText(role.english, 540, 904);
  ctx.fillStyle = '#202b45';
  ctx.font = '34px "Microsoft YaHei", sans-serif';
  const lines: string[] = [];
  let line = '';
  for (const character of role.quote) {
    if (ctx.measureText(line + character).width > 800 && line) {
      lines.push(line);
      line = '';
    }
    line += character;
  }
  if (line) lines.push(line);
  lines.forEach((text, index) => ctx.fillText(text, 540, 1000 + index * 52));
  ctx.fillStyle = blue;
  ctx.font = '28px "Microsoft YaHei", sans-serif';
  ctx.fillText(role.traits.join('  /  '), 540, 1150);
  ctx.beginPath();
  ctx.moveTo(108, 1220);
  ctx.lineTo(972, 1220);
  ctx.stroke();
  ctx.fillStyle = '#657087';
  ctx.font = '24px "Microsoft YaHei", sans-serif';
  ctx.fillText('这是一张此刻的剪影，不是对你的定义。', 540, 1285);
  ctx.font = '22px "Microsoft YaHei", sans-serif';
  ctx.fillText('原创娱乐问卷 · 非心理测评', 540, 1330);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('图片生成失败，请重试。')), 'image/png');
  });
}
