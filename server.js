const http = require('http');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const PORT = 3004;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm'
};

const server = http.createServer(async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle API routes
  if (req.url.startsWith('/api/waitlist')) {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed' }));
      return;
    }

    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { email } = JSON.parse(body);

        // Validate email
        if (!email || !email.includes('@')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid email address is required' }));
          return;
        }

        // Initialize Supabase
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseKey) {
          console.error('[waitlist] Missing Supabase environment variables');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Server configuration error' }));
          return;
        }

        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check if email already exists
        const { data: existing } = await supabase
          .from('waitlist')
          .select('email')
          .eq('email', normalizedEmail)
          .maybeSingle();

        if (existing) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: "You're already on the waitlist!",
            alreadyExists: true,
          }));
          return;
        }

        // Insert email
        const { error } = await supabase
          .from('waitlist')
          .insert({
            email: normalizedEmail,
            created_at: new Date().toISOString(),
          });

        if (error) {
          console.error('[waitlist] Error inserting email:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to add email to waitlist' }));
          return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: 'Successfully added to waitlist!',
          success: true,
        }));
      } catch (error) {
        console.error('[waitlist] Unexpected error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'An unexpected error occurred' }));
      }
    });
    return;
  }

  // Serve static files - handle both Vercel serverless and local environments
  const baseDir = process.cwd();
  let filePath;
  
  if (req.url === '/') {
    filePath = path.join(baseDir, 'index.html');
  } else if (req.url.startsWith('/public/')) {
    // Handle /public/ paths - try public directory, then root
    const filename = req.url.replace('/public/', '');
    const publicPath = path.join(baseDir, 'public', filename);
    const rootPath = path.join(baseDir, filename);
    
    if (fs.existsSync(publicPath)) {
      filePath = publicPath;
    } else if (fs.existsSync(rootPath)) {
      filePath = rootPath;
    } else {
      filePath = path.join(baseDir, req.url);
    }
  } else {
    // Direct file requests - try root first, then public
    const rootFile = path.join(baseDir, req.url);
    const publicFile = path.join(baseDir, 'public', req.url);
    
    if (fs.existsSync(rootFile)) {
      filePath = rootFile;
    } else if (fs.existsSync(publicFile)) {
      filePath = publicFile;
    } else {
      filePath = rootFile;
    }
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});








