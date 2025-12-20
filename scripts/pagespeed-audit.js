#!/usr/bin/env node

/**
 * PageSpeed Insights Audit Script
 * Generates a comprehensive HTML report for all pages in the sitemap
 *
 * Usage: node scripts/pagespeed-audit.js
 *
 * Requires: PageSpeedInsightsApiKey in .env file
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

const API_KEY = process.env.PageSpeedInsightsApiKey;
if (!API_KEY) {
  console.error('Error: PageSpeedInsightsApiKey not found in .env file');
  process.exit(1);
}

// Configuration
const SITE_URL = 'https://fabianmiranda.com';
const STRATEGIES = ['mobile', 'desktop'];
const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds

// Get URLs from sitemap
function getUrlsFromSitemap() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('Sitemap not found at:', sitemapPath);
    process.exit(1);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;

  while ((match = regex.exec(sitemap)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// Fetch PageSpeed Insights data
function fetchPSI(url, strategy) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=accessibility&category=best-practices&category=seo&key=${API_KEY}`;

    https.get(apiUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Sleep utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Extract metrics from PSI response
function extractMetrics(data) {
  const lighthouse = data.lighthouseResult || {};
  const categories = lighthouse.categories || {};
  const audits = lighthouse.audits || {};

  return {
    scores: {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    },
    metrics: {
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      si: audits['speed-index']?.displayValue || 'N/A',
      tti: audits['interactive']?.displayValue || 'N/A',
    },
    metricScores: {
      fcp: audits['first-contentful-paint']?.score || 0,
      lcp: audits['largest-contentful-paint']?.score || 0,
      tbt: audits['total-blocking-time']?.score || 0,
      cls: audits['cumulative-layout-shift']?.score || 0,
      si: audits['speed-index']?.score || 0,
      tti: audits['interactive']?.score || 0,
    },
    opportunities: Object.entries(audits)
      .filter(([_, audit]) => audit.details?.overallSavingsMs > 0)
      .map(([id, audit]) => ({
        id,
        title: audit.title,
        description: audit.description,
        savings: audit.details.overallSavingsMs,
        savingsBytes: audit.details.overallSavingsBytes || 0,
      }))
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 10),
    diagnostics: Object.entries(audits)
      .filter(([_, audit]) => audit.details?.type === 'table' && audit.score !== null && audit.score < 1)
      .map(([id, audit]) => ({
        id,
        title: audit.title,
        description: audit.description,
        displayValue: audit.displayValue,
        score: audit.score,
      }))
      .slice(0, 10),
  };
}

// Generate score color
function getScoreColor(score) {
  if (score >= 90) return '#0cce6b';
  if (score >= 50) return '#ffa400';
  return '#ff4e42';
}

// Generate score indicator
function getScoreIndicator(score) {
  if (score >= 90) return '🟢';
  if (score >= 50) return '🟡';
  return '🔴';
}

// Generate HTML report
function generateHTML(results, timestamp) {
  const avgScores = {
    mobile: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 },
    desktop: { performance: 0, accessibility: 0, bestPractices: 0, seo: 0 },
  };

  let count = { mobile: 0, desktop: 0 };

  results.forEach(r => {
    if (r.mobile) {
      Object.keys(avgScores.mobile).forEach(k => avgScores.mobile[k] += r.mobile.scores[k]);
      count.mobile++;
    }
    if (r.desktop) {
      Object.keys(avgScores.desktop).forEach(k => avgScores.desktop[k] += r.desktop.scores[k]);
      count.desktop++;
    }
  });

  Object.keys(avgScores.mobile).forEach(k => {
    avgScores.mobile[k] = Math.round(avgScores.mobile[k] / (count.mobile || 1));
    avgScores.desktop[k] = Math.round(avgScores.desktop[k] / (count.desktop || 1));
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PageSpeed Insights Report - ${SITE_URL}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      background: #0f0f23;
      color: #e0e0e0;
      line-height: 1.6;
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
    header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      padding: 40px 20px;
      text-align: center;
      border-bottom: 3px solid #00d4ff;
    }
    header h1 { color: #00d4ff; font-size: 2.5rem; margin-bottom: 10px; }
    header p { color: #888; font-size: 1.1rem; }
    .timestamp { color: #666; font-size: 0.9rem; margin-top: 10px; }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .summary-card {
      background: #1a1a2e;
      border-radius: 12px;
      padding: 25px;
      border: 1px solid #2a2a4a;
    }
    .summary-card h3 {
      color: #00d4ff;
      margin-bottom: 20px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .score-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #2a2a4a;
    }
    .score-row:last-child { border-bottom: none; }
    .score-label { color: #aaa; }
    .score-value {
      font-size: 1.5rem;
      font-weight: bold;
      padding: 5px 15px;
      border-radius: 20px;
    }

    .pages-section { margin-top: 40px; }
    .pages-section h2 {
      color: #00d4ff;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #2a2a4a;
    }

    .page-card {
      background: #1a1a2e;
      border-radius: 12px;
      margin-bottom: 20px;
      overflow: hidden;
      border: 1px solid #2a2a4a;
    }
    .page-header {
      background: #16213e;
      padding: 20px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-header:hover { background: #1e2a4a; }
    .page-url {
      font-size: 1.1rem;
      color: #00d4ff;
      font-family: monospace;
    }
    .page-scores {
      display: flex;
      gap: 15px;
    }
    .mini-score {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 0.9rem;
      color: #fff;
    }

    .page-details {
      padding: 20px;
      display: none;
      border-top: 1px solid #2a2a4a;
    }
    .page-details.active { display: block; }

    .strategy-tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .strategy-tab {
      padding: 10px 20px;
      background: #2a2a4a;
      border: none;
      border-radius: 8px;
      color: #aaa;
      cursor: pointer;
      font-size: 1rem;
    }
    .strategy-tab.active {
      background: #00d4ff;
      color: #000;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 25px;
    }
    .metric-card {
      background: #0f0f23;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
    }
    .metric-label { color: #888; font-size: 0.85rem; margin-bottom: 5px; }
    .metric-value { font-size: 1.3rem; font-weight: bold; }

    .opportunities h4, .diagnostics h4 {
      color: #ffa400;
      margin: 20px 0 15px;
      font-size: 1.1rem;
    }
    .opportunity-item, .diagnostic-item {
      background: #0f0f23;
      padding: 12px 15px;
      border-radius: 8px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .opportunity-title { color: #e0e0e0; flex: 1; }
    .opportunity-savings {
      background: #ffa400;
      color: #000;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: bold;
    }

    .legend {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin: 30px 0;
      padding: 15px;
      background: #1a1a2e;
      border-radius: 8px;
    }
    .legend-item { display: flex; align-items: center; gap: 8px; }
    .legend-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    footer {
      text-align: center;
      padding: 30px;
      color: #666;
      border-top: 1px solid #2a2a4a;
      margin-top: 40px;
    }
    footer a { color: #00d4ff; }
  </style>
</head>
<body>
  <header>
    <h1>PageSpeed Insights Report</h1>
    <p>${SITE_URL}</p>
    <p class="timestamp">Generated: ${timestamp}</p>
  </header>

  <div class="container">
    <div class="legend">
      <div class="legend-item">
        <div class="legend-dot" style="background: #0cce6b;"></div>
        <span>Good (90-100)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background: #ffa400;"></div>
        <span>Needs Improvement (50-89)</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot" style="background: #ff4e42;"></div>
        <span>Poor (0-49)</span>
      </div>
    </div>

    <div class="summary-grid">
      <div class="summary-card">
        <h3>📱 Mobile Average</h3>
        ${Object.entries(avgScores.mobile).map(([key, score]) => `
          <div class="score-row">
            <span class="score-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
            <span class="score-value" style="background: ${getScoreColor(score)}; color: #fff;">${score}</span>
          </div>
        `).join('')}
      </div>
      <div class="summary-card">
        <h3>💻 Desktop Average</h3>
        ${Object.entries(avgScores.desktop).map(([key, score]) => `
          <div class="score-row">
            <span class="score-label">${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
            <span class="score-value" style="background: ${getScoreColor(score)}; color: #fff;">${score}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <section class="pages-section">
      <h2>📄 All Pages (${results.length})</h2>

      ${results.map((result, index) => `
        <div class="page-card">
          <div class="page-header" onclick="toggleDetails(${index})">
            <span class="page-url">${result.url.replace(SITE_URL, '') || '/'}</span>
            <div class="page-scores">
              ${result.mobile ? `
                <div class="mini-score" style="background: ${getScoreColor(result.mobile.scores.performance)};" title="Mobile Performance">
                  ${result.mobile.scores.performance}
                </div>
              ` : ''}
              ${result.desktop ? `
                <div class="mini-score" style="background: ${getScoreColor(result.desktop.scores.performance)};" title="Desktop Performance">
                  ${result.desktop.scores.performance}
                </div>
              ` : ''}
            </div>
          </div>
          <div class="page-details" id="details-${index}">
            <div class="strategy-tabs">
              <button class="strategy-tab active" onclick="showStrategy(${index}, 'mobile')">📱 Mobile</button>
              <button class="strategy-tab" onclick="showStrategy(${index}, 'desktop')">💻 Desktop</button>
            </div>

            ${['mobile', 'desktop'].map(strategy => `
              <div class="strategy-content strategy-${strategy}" id="${strategy}-${index}" style="${strategy === 'desktop' ? 'display:none;' : ''}">
                ${result[strategy] ? `
                  <div class="metrics-grid">
                    <div class="metric-card">
                      <div class="metric-label">Performance</div>
                      <div class="metric-value" style="color: ${getScoreColor(result[strategy].scores.performance)}">${result[strategy].scores.performance}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">LCP</div>
                      <div class="metric-value" style="color: ${getScoreColor(result[strategy].metricScores.lcp * 100)}">${result[strategy].metrics.lcp}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">FCP</div>
                      <div class="metric-value" style="color: ${getScoreColor(result[strategy].metricScores.fcp * 100)}">${result[strategy].metrics.fcp}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">TBT</div>
                      <div class="metric-value" style="color: ${getScoreColor(result[strategy].metricScores.tbt * 100)}">${result[strategy].metrics.tbt}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">CLS</div>
                      <div class="metric-value" style="color: ${getScoreColor(result[strategy].metricScores.cls * 100)}">${result[strategy].metrics.cls}</div>
                    </div>
                    <div class="metric-card">
                      <div class="metric-label">Speed Index</div>
                      <div class="metric-value" style="color: ${getScoreColor(result[strategy].metricScores.si * 100)}">${result[strategy].metrics.si}</div>
                    </div>
                  </div>

                  ${result[strategy].opportunities.length > 0 ? `
                    <div class="opportunities">
                      <h4>🔧 Opportunities</h4>
                      ${result[strategy].opportunities.map(opp => `
                        <div class="opportunity-item">
                          <span class="opportunity-title">${opp.title}</span>
                          <span class="opportunity-savings">${opp.savings >= 1000 ? (opp.savings / 1000).toFixed(1) + 's' : opp.savings + 'ms'}</span>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  ${result[strategy].diagnostics.length > 0 ? `
                    <div class="diagnostics">
                      <h4>📋 Diagnostics</h4>
                      ${result[strategy].diagnostics.map(diag => `
                        <div class="diagnostic-item">
                          <span class="opportunity-title">${diag.title}${diag.displayValue ? ` - ${diag.displayValue}` : ''}</span>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}
                ` : '<p>No data available</p>'}
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </section>
  </div>

  <footer>
    <p>Generated using <a href="https://developers.google.com/speed/docs/insights/v5/get-started" target="_blank">PageSpeed Insights API</a></p>
    <p>Thresholds: LCP &lt; 2.5s | FCP &lt; 1.8s | TBT &lt; 200ms | CLS &lt; 0.1</p>
  </footer>

  <script>
    function toggleDetails(index) {
      const details = document.getElementById('details-' + index);
      details.classList.toggle('active');
    }

    function showStrategy(index, strategy) {
      const mobile = document.getElementById('mobile-' + index);
      const desktop = document.getElementById('desktop-' + index);
      const tabs = document.querySelectorAll('#details-' + index + ' .strategy-tab');

      tabs.forEach(tab => tab.classList.remove('active'));
      event.target.classList.add('active');

      if (strategy === 'mobile') {
        mobile.style.display = 'block';
        desktop.style.display = 'none';
      } else {
        mobile.style.display = 'none';
        desktop.style.display = 'block';
      }
    }
  </script>
</body>
</html>`;
}

// Main function
async function main() {
  console.log('🚀 PageSpeed Insights Audit');
  console.log('=' .repeat(50));
  console.log(`Site: ${SITE_URL}`);
  console.log('');

  const urls = getUrlsFromSitemap();
  console.log(`📄 Found ${urls.length} pages in sitemap\n`);

  const results = [];
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short'
  });

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const pageName = url.replace(SITE_URL, '') || '/';
    console.log(`[${i + 1}/${urls.length}] Analyzing: ${pageName}`);

    const result = { url, mobile: null, desktop: null };

    for (const strategy of STRATEGIES) {
      try {
        process.stdout.write(`  📊 ${strategy}... `);
        const data = await fetchPSI(url, strategy);

        if (data.error) {
          console.log(`❌ Error: ${data.error.message}`);
          continue;
        }

        result[strategy] = extractMetrics(data);
        const score = result[strategy].scores.performance;
        const indicator = getScoreIndicator(score);
        console.log(`${indicator} ${score}/100 (LCP: ${result[strategy].metrics.lcp})`);

        await sleep(DELAY_BETWEEN_REQUESTS);
      } catch (error) {
        console.log(`❌ Error: ${error.message}`);
      }
    }

    results.push(result);
  }

  // Generate HTML report
  const html = generateHTML(results, timestamp);
  const reportPath = path.join(__dirname, '..', 'pagespeed-report.html');
  fs.writeFileSync(reportPath, html);

  console.log('\n' + '=' .repeat(50));
  console.log('✅ Report generated: pagespeed-report.html');
  console.log(`📊 Open in browser to view full details`);

  // Print summary
  const mobileScores = results.filter(r => r.mobile).map(r => r.mobile.scores.performance);
  const avgMobile = Math.round(mobileScores.reduce((a, b) => a + b, 0) / mobileScores.length);

  console.log('\n📱 Mobile Performance Summary:');
  console.log(`   Average Score: ${getScoreIndicator(avgMobile)} ${avgMobile}/100`);

  results.forEach(r => {
    if (r.mobile) {
      const name = r.url.replace(SITE_URL, '') || '/';
      const score = r.mobile.scores.performance;
      console.log(`   ${getScoreIndicator(score)} ${name}: ${score}/100 (LCP: ${r.mobile.metrics.lcp})`);
    }
  });
}

main().catch(console.error);
