const TOPICS = [
  'WLED Setup Guide: Getting Started with Wireless LED Control',
  'Wireless LED Lighting for Events: What You Need to Know',
  'DMX LED Control with WLED: A Complete Guide',
  'WLED DMX Integration: Bridging Wireless and Traditional DMX',
  'RGBW LED Tube Lighting: Why RGBW Beats RGB Every Time',
  'Best Wireless LED Controller in 2026: Why WLED Leads the Pack',
  'How to Set Up WLED for Stage Lighting',
  'LED Tube Kit Installation Guide for DJs and Event Producers',
  'Smart LED Lighting with WiFi Control: The WLED Advantage',
  'Architectural LED Lighting with WLED: From Clubs to Venues',
  'WLED vs DMX: Which Is Right for Your Setup?',
  'How Reactive DMX Lighting Works',
  'RGBW vs RGB LED Strips: Understanding the White Channel',
  'Wireless DMX Lighting for DJs: Gear Up for Your Next Show',
  'LED Tube Lights for Stage and Event Production',
  'WLED App Tutorial: Controlling Your LED Setup from Your Phone',
];

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function todaySlugPrefix() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function buildPostHtml({ title, metaDescription, slug, excerpt, htmlBody, dateStr }) {
  const canonicalSlug = `${dateStr}-${slug}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — SFX LED Blog</title>
  <meta name="description" content="${metaDescription}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${metaDescription}" />
  <meta property="og:type" content="article" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="stylesheet" href="/style.css" />
  <style>
    .blog-post-wrap {
      max-width: 760px;
      margin: 0 auto;
      padding: calc(var(--nav-h) + 3rem) clamp(1.5rem, 6vw, 3rem) 6rem;
    }
    .blog-post-back {
      display: inline-block;
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--lime-1);
      text-decoration: none;
      margin-bottom: 2rem;
      opacity: 0.8;
    }
    .blog-post-back:hover { opacity: 1; }
    .blog-post-date {
      font-size: 0.78rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-faint);
      margin-bottom: 1.2rem;
    }
    .blog-post-title {
      font-size: clamp(1.8rem, 5vw, 3rem);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -0.02em;
      margin: 0 0 2.5rem;
    }
    .blog-post-body { color: var(--text-muted); line-height: 1.8; }
    .blog-post-body h2 {
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text);
      margin: 2.5rem 0 0.8rem;
    }
    .blog-post-body h3 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text);
      margin: 2rem 0 0.6rem;
    }
    .blog-post-body p { margin: 0 0 1.2rem; }
    .blog-post-body ul, .blog-post-body ol {
      margin: 0 0 1.2rem;
      padding-left: 1.5rem;
    }
    .blog-post-body li { margin-bottom: 0.4rem; }
    .blog-post-body strong { color: var(--text); }
    .blog-post-body a { color: var(--lime-1); }
  </style>
</head>
<body>
  <div class="page-bg page-bg--solid"></div>

  <nav class="nav">
    <a class="nav-logo" href="/home.html"><span>SFX</span> LED</a>
    <ul class="nav-links">
      <li><a href="/home.html">Home</a></li>
      <li><a href="/products.html">Products</a></li>
      <li><a href="/blog.html" class="active">Blog</a></li>
      <li><a href="mailto:hello@sfxled.com">Contact</a></li>
    </ul>
    <button class="nav-burger" id="navBurger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <div class="blog-post-wrap">
    <a class="blog-post-back" href="/blog.html">← All Posts</a>
    <p class="blog-post-date">${new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
    <h1 class="blog-post-title">${title}</h1>
    <div class="blog-post-body">
      ${htmlBody}
    </div>
  </div>

  <footer class="footer">
    <nav class="footer-links">
      <a href="/about.html">About</a>
      <a href="/faq.html">FAQ</a>
      <a href="/shipping.html">Shipping &amp; Returns</a>
      <a href="/privacy.html">Privacy</a>
      <a href="/blog.html">Blog</a>
    </nav>
    <p class="footer-copy">&copy; ${new Date().getFullYear()} SFX LED. All rights reserved.</p>
  </footer>

  <script>
    (function() {
      const burger = document.getElementById('navBurger');
      const links  = document.querySelector('.nav-links');
      if (burger && links) {
        burger.addEventListener('click', function() {
          burger.classList.toggle('open');
          links.classList.toggle('open');
        });
      }
    })();
  </script>
</body>
</html>`;
}

async function githubGet(path, env) {
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}?ref=${env.GITHUB_BRANCH}`,
    { headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' } }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${path} failed: ${res.status}`);
  return res.json();
}

async function githubPut(path, content, message, sha, env) {
  const body = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: env.GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await fetch(
    `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub PUT ${path} failed: ${res.status} — ${JSON.stringify(err)}`);
  }
  return res.json();
}

export default async function handler(req, res) {
  try {
    return await run(req, res);
  } catch (err) {
    console.error('generate-blog crash:', err);
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}

async function run(req, res) {
  // Verify cron or secret
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers['authorization'] || '';
    if (auth !== `Bearer ${cronSecret}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  const env = {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    GITHUB_REPO: process.env.GITHUB_REPO || 'eliliveshere/sfx',
    GITHUB_BRANCH: process.env.GITHUB_BRANCH || 'main',
  };

  if (!env.ANTHROPIC_API_KEY || !env.GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Missing ANTHROPIC_API_KEY or GITHUB_TOKEN env vars' });
  }

  // Pick topic
  const dayOfYear = getDayOfYear();
  const topic = TOPICS[dayOfYear % TOPICS.length];
  const dateStr = todaySlugPrefix();

  // Generate post with Claude
  const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `Write an SEO-optimized blog post about: "${topic}"

The post should:
- Target keywords: WLED, wireless LED lighting, DMX LED, WLED DMX, RGBW, LED tube lighting, smart LED
- Be 800–1100 words
- Use clear h2 and h3 subheadings
- Be written for DJs, event producers, rental companies, and venue owners
- Mention SFX LED products naturally (wireless RGBW tube kits, WLED DMX kits, PCB kits)
- Be helpful and informative, not overly salesy

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{
  "title": "post title here",
  "slug": "kebab-case-slug-here",
  "metaDescription": "155 char max meta description",
  "excerpt": "2-3 sentence excerpt for the blog listing page",
  "htmlBody": "full post HTML using only p, h2, h3, ul, ol, li, strong, em tags — no divs, no classes, no inline styles"
}`,
      }],
    }),
  });

  if (!claudeRes.ok) {
    const err = await claudeRes.json();
    return res.status(500).json({ error: 'Claude API error', details: err });
  }

  const claudeData = await claudeRes.json();
  let rawText = claudeData.content[0].text.trim();

  // Strip markdown code fences if present
  rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();

  let post;
  try {
    post = JSON.parse(rawText);
  } catch {
    return res.status(500).json({ error: 'Failed to parse Claude JSON', raw: rawText.slice(0, 500) });
  }

  const { title, slug, metaDescription, excerpt, htmlBody } = post;
  const filename = `${dateStr}-${slug}`;
  const postPath = `blog/posts/${filename}.html`;
  const indexPath = 'blog/posts/index.json';

  // Build HTML file
  const postHtml = buildPostHtml({ title, metaDescription, slug, excerpt, htmlBody, dateStr });

  // Fetch current index
  const indexFile = await githubGet(indexPath, env);
  let indexData = [];
  let indexSha = null;
  if (indexFile) {
    indexSha = indexFile.sha;
    indexData = JSON.parse(Buffer.from(indexFile.content, 'base64').toString('utf8'));
  }

  // Prepend new entry
  indexData.unshift({ title, slug: filename, date: dateStr, excerpt });

  // Commit post HTML
  const existingPost = await githubGet(postPath, env);
  await githubPut(postPath, postHtml, `Add blog post: ${title}`, existingPost?.sha || null, env);

  // Commit updated index
  await githubPut(indexPath, JSON.stringify(indexData, null, 2), `Update blog index: ${title}`, indexSha, env);

  return res.status(200).json({ ok: true, slug: filename, title });
}
