#!/usr/bin/env node

/**
 * Compare environment variables between Vercel and local .env/.env.local files
 * Shows which variables match and which don't, without displaying values
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = __dirname;
const TEMP_VERCEL_ENV = path.join(PROJECT_ROOT, '.env.vercel');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseEnvFile(filePath) {
  const vars = {};
  if (!fs.existsSync(filePath)) {
    return vars;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    // Handle both KEY=value and KEY="value" formats
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      // Remove quotes if present
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      vars[key] = value;
    }
  }

  return vars;
}

function getVercelEnvVars() {
  log('📥 Pulling environment variables from Vercel...', 'cyan');
  log('   Note: This pulls Development environment by default', 'yellow');
  log('');
  
  try {
    // Pull Vercel env vars (creates .env.vercel file)
    execSync('vercel env pull', {
      cwd: PROJECT_ROOT,
      stdio: 'pipe',
    });
    
    const vars = parseEnvFile(TEMP_VERCEL_ENV);
    
    // Filter out Vercel-specific variables that aren't user-defined
    const filteredVars = {};
    for (const [key, value] of Object.entries(vars)) {
      // Skip Vercel internal variables
      if (!key.startsWith('VERCEL_')) {
        filteredVars[key] = value;
      }
    }
    
    // Clean up temp file
    if (fs.existsSync(TEMP_VERCEL_ENV)) {
      fs.unlinkSync(TEMP_VERCEL_ENV);
    }
    
    return filteredVars;
  } catch (error) {
    log('❌ Error pulling Vercel environment variables', 'red');
    log(`   Make sure you're logged in: vercel login`, 'yellow');
    log(`   Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

function getLocalEnvVars() {
  const envLocalPath = path.join(PROJECT_ROOT, '.env.local');
  const envPath = path.join(PROJECT_ROOT, '.env');
  
  let localVars = {};
  let sourceFile = null;
  
  // Try .env.local first, then .env
  if (fs.existsSync(envLocalPath)) {
    localVars = parseEnvFile(envLocalPath);
    sourceFile = '.env.local';
  } else if (fs.existsSync(envPath)) {
    localVars = parseEnvFile(envPath);
    sourceFile = '.env';
  } else {
    log('⚠️  No .env.local or .env file found', 'yellow');
    return { vars: {}, file: null };
  }
  
  return { vars: localVars, file: sourceFile };
}

function compareEnvVars(vercelVars, localVars) {
  const vercelKeys = new Set(Object.keys(vercelVars));
  const localKeys = new Set(Object.keys(localVars));
  
  // Variables in both (match)
  const matched = Array.from(vercelKeys).filter(key => localKeys.has(key));
  
  // Variables only in Vercel
  const onlyInVercel = Array.from(vercelKeys).filter(key => !localKeys.has(key));
  
  // Variables only in local
  const onlyInLocal = Array.from(localKeys).filter(key => !vercelKeys.has(key));
  
  return {
    matched,
    onlyInVercel,
    onlyInLocal,
  };
}

function displayResults(results, localFile) {
  log('\n' + '='.repeat(60), 'cyan');
  log('🔍 Environment Variable Comparison Results', 'cyan');
  log('='.repeat(60), 'cyan');
  log('');
  
  if (localFile) {
    log(`📄 Local file: ${localFile}`, 'blue');
  } else {
    log(`📄 Local file: Not found`, 'yellow');
  }
  log(`☁️  Vercel: Production environment`, 'blue');
  log('');
  
  // Matched variables
  if (results.matched.length > 0) {
    log(`✅ Matched Variables (${results.matched.length}):`, 'green');
    results.matched.forEach(key => {
      log(`   ✓ ${key}`, 'green');
    });
    log('');
  } else {
    log(`⚠️  No matching variables found`, 'yellow');
    log('');
  }
  
  // Only in Vercel
  if (results.onlyInVercel.length > 0) {
    log(`☁️  Only in Vercel (${results.onlyInVercel.length}):`, 'yellow');
    results.onlyInVercel.forEach(key => {
      log(`   • ${key}`, 'yellow');
    });
    log('');
  }
  
  // Only in local
  if (results.onlyInLocal.length > 0) {
    log(`📝 Only in Local (${results.onlyInLocal.length}):`, 'yellow');
    results.onlyInLocal.forEach(key => {
      log(`   • ${key}`, 'yellow');
    });
    log('');
  }
  
  // Summary
  log('─'.repeat(60), 'cyan');
  log('Summary:', 'cyan');
  log(`   ✅ Matched: ${results.matched.length}`, 'green');
  log(`   ☁️  Only in Vercel: ${results.onlyInVercel.length}`, 'yellow');
  log(`   📝 Only in Local: ${results.onlyInLocal.length}`, 'yellow');
  log('─'.repeat(60), 'cyan');
  log('');
  
  // Warnings
  if (results.onlyInVercel.length > 0) {
    log('⚠️  Warning: Some variables exist in Vercel but not locally', 'yellow');
    log('   Consider adding them to your local .env.local file', 'yellow');
    log('');
  }
  
  if (results.onlyInLocal.length > 0) {
    log('⚠️  Warning: Some variables exist locally but not in Vercel', 'yellow');
    log('   Consider adding them to Vercel: vercel env add VARIABLE_NAME production', 'yellow');
    log('');
  }
}

function main() {
  log('🔍 Comparing Vercel and Local Environment Variables...', 'cyan');
  log('');
  
  // Get Vercel environment variables
  const vercelVars = getVercelEnvVars();
  
  // Get local environment variables
  const { vars: localVars, file: localFile } = getLocalEnvVars();
  
  // Compare
  const results = compareEnvVars(vercelVars, localVars);
  
  // Display results
  displayResults(results, localFile);
  
  // Exit with appropriate code
  if (results.onlyInVercel.length > 0 || results.onlyInLocal.length > 0) {
    process.exit(1); // Exit with error if there are mismatches
  } else {
    process.exit(0); // Exit successfully if all match
  }
}

// Run the script
main();

