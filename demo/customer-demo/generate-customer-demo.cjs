const fs = require('fs');
const path = require('path');
const http = require('http');
const { execFileSync } = require('child_process');
const { chromium } = require('../../tests/node_modules/playwright');

const demoDir = __dirname;
const rootDir = path.resolve(demoDir, '../..');
const captureDir = path.join(demoDir, 'captures');
const audioDir = path.join(demoDir, 'audio');
const outputDir = path.join(demoDir, 'output');
const voiceoverPath = path.join(demoDir, 'voiceover.txt');
const aiffPath = path.join(audioDir, 'narration.aiff');
const wavPath = path.join(audioDir, 'narration.wav');
const webmPath = path.join(outputDir, 'adeel-arshad-customer-demo.webm');

const WIDTH = 1920;
const HEIGHT = 1080;
const SITE_TITLE = 'Adeel Arshad | Cloud Solution Architect';
const SITE_DESCRIPTION = 'Cloud Solution Architect, Head of DevOps, Kubestronaut, and 15x cloud certified multi-cloud leader.';
const AUTHOR_NAME = 'Adeel Arshad';

const pages = {
  '/': 'index.html',
  '/experience/': 'experience/index.html',
  '/certifications/': 'certifications/index.html',
  '/projects/': 'projects/index.html',
};

const mimeTypes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2',
};

const slides = [
  {
    name: '01-hero.png',
    url: '/',
    selector: null,
    title: 'Adeel Arshad',
    kicker: 'Cloud Solution Architect | Head of DevOps',
  },
  {
    name: '02-about.png',
    url: '/',
    selector: '#about',
    title: 'From Strategy To Platforms',
    kicker: 'Architecture, automation, QA, and measurable delivery outcomes',
  },
  {
    name: '03-capabilities.png',
    url: '/',
    selector: '#capabilities',
    title: 'Production Platform Stack',
    kicker: 'Multi-cloud, DevOps, AI readiness, governance, and delivery controls',
  },
  {
    name: '04-experience.png',
    url: '/experience/',
    selector: null,
    title: '10+ Years Experience',
    kicker: 'Enterprise cloud, DevOps, SRE, and portfolio leadership',
  },
  {
    name: '05-certifications.png',
    url: '/certifications/',
    selector: null,
    title: '15 Active Credentials',
    kicker: 'AWS, Azure, Google Cloud, CNCF, Kubernetes, and Kubestronaut',
  },
  {
    name: '06-projects.png',
    url: '/projects/',
    selector: null,
    title: 'Impact Programs',
    kicker: 'Modernization, CI/CD, FinOps, observability, and DevOps buildout',
  },
  {
    name: '07-engage.png',
    url: '/',
    selector: '#engage',
    title: 'Work With Adeel',
    kicker: 'Cloud strategy, AI readiness, and DevOps transformation',
  },
];

function ensureDirs() {
  fs.mkdirSync(captureDir, { recursive: true });
  fs.mkdirSync(audioDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });
}

function parseFrontMatter(raw) {
  if (!raw.startsWith('---')) return [{}, raw];
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return [{}, raw];
  const frontMatter = raw.slice(3, end).trim();
  const body = raw.slice(raw.indexOf('\n', end + 4) + 1);
  const data = {};
  for (const line of frontMatter.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    data[match[1]] = match[2].replace(/^["']|["']$/g, '');
  }
  return [data, body];
}

function renderLiquid(html, pageData, pageUrl) {
  const currentYear = String(new Date().getFullYear());
  const currentDate = new Date().toISOString().slice(0, 10);

  return html
    .replace(/\{%\s*include\s+critical\.css\s*%\}/g, () => fs.readFileSync(path.join(rootDir, '_includes/critical.css'), 'utf8'))
    .replace(/\{\{\s*'now'\s*\|\s*date:\s*['"]%Y-%m-%d['"]\s*\}\}/g, currentDate)
    .replace(/\{\{\s*'now'\s*\|\s*date:\s*['"]%Y['"]\s*\}\}/g, currentYear)
    .replace(/\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}/g, (_, url) => url)
    .replace(/\{\{\s*"([^"]+)"\s*\|\s*relative_url\s*\}\}/g, (_, url) => url)
    .replace(/\{\{\s*site\.title\s*\}\}/g, SITE_TITLE)
    .replace(/\{\{\s*site\.description\s*\}\}/g, SITE_DESCRIPTION)
    .replace(/\{\{\s*site\.author\.name\s*\}\}/g, AUTHOR_NAME)
    .replace(/\{\{\s*site\.url\s*\|\s*jsonify\s*\}\}/g, JSON.stringify('https://adeelarshad414.github.io/madeelarshad.github.io'))
    .replace(/\{\{\s*page\.title\s*\|\s*default:\s*site\.title\s*\}\}/g, pageData.title || SITE_TITLE)
    .replace(/\{\{\s*page\.description\s*\|\s*default:\s*site\.description\s*\}\}/g, pageData.description || SITE_DESCRIPTION)
    .replace(/\{\{\s*page\.og_image\s*\|\s*default:\s*'\/assets\/images\/og-default\.png'\s*\|\s*absolute_url\s*\}\}/g, pageData.og_image || '/assets/images/og-default.png')
    .replace(/\{\{\s*page\.og_image_alt\s*\}\}/g, pageData.og_image_alt || `${AUTHOR_NAME} professional portfolio`)
    .replace(/\{\{\s*page\.title\s*\|\s*jsonify\s*\}\}/g, JSON.stringify(pageData.title || SITE_TITLE))
    .replace(/\{\{\s*page\.url\s*\|\s*absolute_url\s*\}\}/g, `https://adeelarshad414.github.io/madeelarshad.github.io${pageUrl === '/' ? '/' : pageUrl}`)
    .replace(/\{\{\s*page\.url\s*\}\}/g, pageUrl)
    .replace(/\{%\s*seo\s*%\}/g, '')
    .replace(/\{%\s*feed_meta\s*%\}/g, '')
    .replace(/\{%\s*if[^%]*%\}/g, '')
    .replace(/\{%\s*unless[^%]*%\}/g, '')
    .replace(/\{%\s*else\s*%\}/g, '')
    .replace(/\{%\s*endif\s*%\}/g, '')
    .replace(/\{%\s*endunless\s*%\}/g, '')
    .replace(/\{\{[^}]+\}\}/g, '')
    .replace(/media="print"\s+onload="this\.media='all'"/g, 'media="all"')
    .replace(/media='print'\s+onload='this\.media="all"'/g, 'media="all"');
}

function renderPage(route) {
  const sourcePath = path.join(rootDir, pages[route] || 'index.html');
  const [pageData, body] = parseFrontMatter(fs.readFileSync(sourcePath, 'utf8'));
  const layout = fs.readFileSync(path.join(rootDir, '_layouts/default.html'), 'utf8');
  const withContent = layout.replace('{{ content }}', body);
  return renderLiquid(withContent, pageData, route);
}

function serveRenderedSite() {
  const rendered = new Map(Object.keys(pages).map((route) => [route, renderPage(route)]));

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url, 'http://127.0.0.1');
    const route = requestUrl.pathname.endsWith('/') ? requestUrl.pathname : `${requestUrl.pathname}/`;

    if (rendered.has(route)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(rendered.get(route));
      return;
    }

    const staticPath = path.normalize(path.join(rootDir, requestUrl.pathname));
    if (!staticPath.startsWith(rootDir) || !fs.existsSync(staticPath) || !fs.statSync(staticPath).isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(staticPath).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(staticPath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, baseUrl: `http://127.0.0.1:${server.address().port}` }));
  });
}

async function captureSlides(baseUrl) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required'],
  });
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const slide of slides) {
    await page.goto(`${baseUrl}${slide.url}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.removeAttribute('data-theme');
      document.querySelectorAll('.animate-on-scroll').forEach((el) => el.classList.add('visible'));
    });

    if (slide.selector) {
      await page.locator(slide.selector).scrollIntoViewIfNeeded();
      await page.evaluate(() => window.scrollBy(0, -78));
    } else {
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    await page.waitForTimeout(650);
    await page.screenshot({ path: path.join(captureDir, slide.name), fullPage: false });
  }

  await browser.close();
}

function synthesizeVoiceover() {
  execFileSync('say', ['-v', 'Samantha', '-r', '172', '-f', voiceoverPath, '-o', aiffPath], { stdio: 'inherit' });
  execFileSync('afconvert', ['-f', 'WAVE', '-d', 'LEI16@44100', aiffPath, wavPath], { stdio: 'inherit' });
}

function dataUrlFor(filePath, mimeType) {
  return `data:${mimeType};base64,${fs.readFileSync(filePath).toString('base64')}`;
}

async function renderVideo() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required'],
  });
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, deviceScaleFactor: 1 });

  const payload = {
    width: WIDTH,
    height: HEIGHT,
    audioDataUrl: dataUrlFor(wavPath, 'audio/wav'),
    slides: slides.map((slide) => ({
      ...slide,
      dataUrl: dataUrlFor(path.join(captureDir, slide.name), 'image/png'),
    })),
  };

  await page.setContent('<!doctype html><html><body style="margin:0;background:#050810"></body></html>');

  const webmDataUrl = await page.evaluate(async ({ width, height, audioDataUrl, slides }) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const images = await Promise.all(slides.map((slide) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve({ ...slide, image });
      image.onerror = reject;
      image.src = slide.dataUrl;
    })));

    const audioContext = new AudioContext({ sampleRate: 44100 });
    const response = await fetch(audioDataUrl);
    const audioBuffer = await audioContext.decodeAudioData(await response.arrayBuffer());
    const destination = audioContext.createMediaStreamDestination();
    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(destination);

    const canvasStream = canvas.captureStream(30);
    destination.stream.getAudioTracks().forEach((track) => canvasStream.addTrack(track));
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
      ? 'video/webm;codecs=vp9,opus'
      : 'video/webm;codecs=vp8,opus';

    const chunks = [];
    const recorder = new MediaRecorder(canvasStream, { mimeType, videoBitsPerSecond: 7000000, audioBitsPerSecond: 128000 });
    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size) chunks.push(event.data);
    };

    const totalDuration = audioBuffer.duration + 1.2;
    const introPad = 0.45;
    const outroPad = 0.75;
    const usableDuration = totalDuration - introPad - outroPad;
    const slideDuration = usableDuration / images.length;
    const fadeDuration = 0.65;

    function drawCover(image, progress, direction, opacity) {
      const zoom = 1.025 + progress * 0.025;
      const drawWidth = width * zoom;
      const drawHeight = height * zoom;
      const panX = direction * progress * width * 0.018;
      const panY = (direction * -1) * progress * height * 0.012;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.drawImage(image, (width - drawWidth) / 2 + panX, (height - drawHeight) / 2 + panY, drawWidth, drawHeight);
      ctx.restore();
    }

    function roundedRect(x, y, w, h, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + w - radius, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
      ctx.lineTo(x + w, y + h - radius);
      ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
      ctx.lineTo(x + radius, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }

    function drawOverlay(slide, index, localProgress, opacity) {
      const x = 92;
      const y = height - 190;
      ctx.save();
      ctx.globalAlpha = opacity;
      const gradient = ctx.createLinearGradient(0, height * 0.45, 0, height);
      gradient.addColorStop(0, 'rgba(5, 8, 16, 0)');
      gradient.addColorStop(1, 'rgba(5, 8, 16, 0.78)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, height * 0.34, width, height * 0.66);

      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 22;
      ctx.fillStyle = 'rgba(8, 14, 26, 0.72)';
      roundedRect(x - 24, y - 30, 780, 136, 20);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(46, 211, 183, 0.95)';
      ctx.font = '600 23px Inter, Arial, sans-serif';
      ctx.fillText(`0${index + 1} / 07`, x, y);

      ctx.fillStyle = 'white';
      ctx.font = '700 42px Inter, Arial, sans-serif';
      ctx.fillText(slide.title, x, y + 46);

      ctx.fillStyle = 'rgba(226, 232, 240, 0.92)';
      ctx.font = '400 25px Inter, Arial, sans-serif';
      ctx.fillText(slide.kicker, x, y + 88);

      const progressWidth = 560 * Math.min(1, Math.max(0, localProgress));
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      roundedRect(x, y + 116, 560, 6, 3);
      ctx.fill();
      ctx.fillStyle = '#2ed3b7';
      roundedRect(x, y + 116, progressWidth, 6, 3);
      ctx.fill();
      ctx.restore();
    }

    function drawFrame(elapsed) {
      const activeTime = Math.max(0, Math.min(usableDuration, elapsed - introPad));
      const rawIndex = Math.min(images.length - 1, Math.floor(activeTime / slideDuration));
      const localTime = activeTime - rawIndex * slideDuration;
      const localProgress = Math.min(1, Math.max(0, localTime / slideDuration));
      const current = images[rawIndex];
      const next = images[Math.min(images.length - 1, rawIndex + 1)];
      const fade = rawIndex < images.length - 1 && slideDuration - localTime < fadeDuration
        ? 1 - (slideDuration - localTime) / fadeDuration
        : 0;

      ctx.fillStyle = '#050810';
      ctx.fillRect(0, 0, width, height);
      drawCover(current.image, localProgress, rawIndex % 2 === 0 ? 1 : -1, 1);
      if (fade > 0) drawCover(next.image, 0, rawIndex % 2 === 0 ? -1 : 1, fade);
      drawOverlay(fade > 0 ? next : current, fade > 0 ? rawIndex + 1 : rawIndex, fade > 0 ? fade : localProgress, 0.98);
    }

    recorder.start(250);
    await audioContext.resume();
    const start = performance.now();
    let keepRendering = true;
    function frame(now) {
      const elapsed = (now - start) / 1000;
      drawFrame(elapsed);
      if (keepRendering) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    audioSource.start(0);

    await new Promise((resolve) => {
      audioSource.onended = resolve;
    });
    await new Promise((resolve) => setTimeout(resolve, 900));
    keepRendering = false;

    const stopped = new Promise((resolve) => {
      recorder.onstop = resolve;
    });
    recorder.stop();
    await stopped;
    audioContext.close();

    const blob = new Blob(chunks, { type: mimeType });
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }, payload);

  const base64Marker = 'base64,';
  const base64Index = webmDataUrl.indexOf(base64Marker);
  if (base64Index === -1) {
    throw new Error('MediaRecorder did not return a base64 data URL.');
  }
  fs.writeFileSync(webmPath, Buffer.from(webmDataUrl.slice(base64Index + base64Marker.length), 'base64'));
  await browser.close();
}

async function main() {
  ensureDirs();
  synthesizeVoiceover();
  const { server, baseUrl } = await serveRenderedSite();
  try {
    await captureSlides(baseUrl);
    await renderVideo();
  } finally {
    server.close();
  }
  console.log(`Generated ${webmPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
