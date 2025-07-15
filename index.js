const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/" || url === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Pro</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }

        .header p {
            color: #666;
            font-size: 1.1rem;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-bottom: 24px;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .card h3 {
            font-size: 1.3rem;
            margin-bottom: 12px;
            color: #333;
        }

        .card p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 16px;
        }

        .btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.2);
            color: #333;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .stats-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 4px;
        }

        .stat-label {
            color: #666;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-2px);
        }

        .feature-icon {
            width: 48px;
            height: 48px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            font-size: 24px;
            color: white;
        }

        .progress-bar {
            background: #e0e0e0;
            border-radius: 10px;
            height: 8px;
            margin: 12px 0;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 10px;
            transition: width 0.3s ease;
        }

        .interactive-demo {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            margin-top: 24px;
        }

        .input-group {
            margin-bottom: 16px;
        }

        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }

        .input-group input,
        .input-group select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }

        .input-group input:focus,
        .input-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }

            .stats-row {
                grid-template-columns: repeat(2, 1fr);
            }

            .feature-grid {
                grid-template-columns: 1fr;
            }

            .header h1 {
                font-size: 2rem;
            }
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateX(0);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Dashboard Pro</h1>
            <p>Modern web application with interactive features and beautiful design</p>
        </div>

        <div class="stats-row">
            <div class="stat-card">
                <div class="stat-number" id="users-count">1,247</div>
                <div class="stat-label">Active Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="revenue-count">$47,892</div>
                <div class="stat-label">Revenue</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="projects-count">156</div>
                <div class="stat-label">Projects</div>
            </div>
            <div class="stat-card">
                <div class="stat-number" id="growth-count">+23%</div>
                <div class="stat-label">Growth</div>
            </div>
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <h3>📊 Analytics Dashboard</h3>
                <p>Monitor your application performance, user engagement, and key metrics in real-time with our comprehensive analytics suite.</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 78%"></div>
                </div>
                <p style="font-size: 0.9rem; color: #888;">Performance: 78%</p>
                <button class="btn" onclick="showNotification('Analytics updated!')">View Analytics</button>
            </div>

            <div class="card">
                <h3>👥 User Management</h3>
                <p>Efficiently manage user accounts, permissions, and access levels with our intuitive user management system.</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 92%"></div>
                </div>
                <p style="font-size: 0.9rem; color: #888;">Active Users: 92%</p>
                <button class="btn btn-secondary" onclick="showNotification('User panel opened!')">Manage Users</button>
            </div>

            <div class="card">
                <h3>⚙️ Settings & Configuration</h3>
                <p>Customize your application settings, configure integrations, and manage system preferences all in one place.</p>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 65%"></div>
                </div>
                <p style="font-size: 0.9rem; color: #888;">Configuration: 65%</p>
                <button class="btn" onclick="showNotification('Settings accessed!')">Open Settings</button>
            </div>
        </div>

        <div class="feature-grid">
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h4>Fast Performance</h4>
                <p>Optimized for speed and efficiency with modern web technologies.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h4>Secure by Design</h4>
                <p>Built with security best practices and enterprise-grade protection.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">📱</div>
                <h4>Mobile Responsive</h4>
                <p>Perfect experience across all devices and screen sizes.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🎨</div>
                <h4>Beautiful UI</h4>
                <p>Modern design with smooth animations and intuitive interfaces.</p>
            </div>
        </div>

        <div class="interactive-demo">
            <h3>Interactive Demo</h3>
            <p style="margin-bottom: 20px;">Try out some interactive features below:</p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div class="input-group">
                    <label for="name-input">Your Name</label>
                    <input type="text" id="name-input" placeholder="Enter your name" onchange="updateGreeting()">
                </div>

                <div class="input-group">
                    <label for="theme-select">Choose Theme</label>
                    <select id="theme-select" onchange="changeTheme()">
                        <option value="default">Default Purple</option>
                        <option value="blue">Ocean Blue</option>
                        <option value="green">Forest Green</option>
                        <option value="orange">Sunset Orange</option>
                    </select>
                </div>
            </div>

            <div style="margin-top: 20px;">
                <button class="btn" onclick="animateStats()">Animate Stats</button>
                <button class="btn btn-secondary" onclick="toggleDarkMode()" style="margin-left: 10px;">Toggle Dark Mode</button>
            </div>

            <div id="greeting" style="margin-top: 20px; padding: 16px; background: rgba(102, 126, 234, 0.1); border-radius: 8px; display: none;">
                <strong>Hello there!</strong> Welcome to Dashboard Pro!
            </div>
        </div>
    </div>

    <div class="notification" id="notification">
        Action completed successfully!
    </div>

    <script>
        function showNotification(message) {
            const notification = document.getElementById('notification');
            notification.textContent = message;
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        function updateGreeting() {
            const name = document.getElementById('name-input').value;
            const greeting = document.getElementById('greeting');
            if (name.trim()) {
                greeting.innerHTML = \`<strong>Hello \${name}!</strong> Welcome to Dashboard Pro!\`;
                greeting.style.display = 'block';
            } else {
                greeting.style.display = 'none';
            }
        }

        function changeTheme() {
            const theme = document.getElementById('theme-select').value;
            const root = document.documentElement;

            switch(theme) {
                case 'blue':
                    document.body.style.background = 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)';
                    break;
                case 'green':
                    document.body.style.background = 'linear-gradient(135deg, #00b894 0%, #00a085 100%)';
                    break;
                case 'orange':
                    document.body.style.background = 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)';
                    break;
                default:
                    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
            showNotification(\`Theme changed to \${theme}!\`);
        }

        function animateStats() {
            const stats = ['users-count', 'revenue-count', 'projects-count'];
            stats.forEach((statId, index) => {
                setTimeout(() => {
                    const element = document.getElementById(statId);
                    element.style.transform = 'scale(1.2)';
                    element.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 300);
                }, index * 200);
            });
            showNotification('Stats animated!');
        }

        let isDarkMode = false;
        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
                document.body.style.color = '#ecf0f1';
                showNotification('Dark mode enabled!');
            } else {
                document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                document.body.style.color = '#333';
                showNotification('Light mode enabled!');
            }
        }

        // Auto-animate stats on page load
        window.addEventListener('load', () => {
            setTimeout(animateStats, 1000);
        });

        // Add some dynamic content updates
        setInterval(() => {
            const userCount = document.getElementById('users-count');
            const currentCount = parseInt(userCount.textContent.replace(',', ''));
            const newCount = currentCount + Math.floor(Math.random() * 3);
            userCount.textContent = newCount.toLocaleString();
        }, 5000);
    </script>
</body>
</html>
    `);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
