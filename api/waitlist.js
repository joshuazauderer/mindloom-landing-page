// api/waitlist.js - Serverless function for waitlist submissions
const { createClient } = require('@supabase/supabase-js');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }

    // Initialize Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('[waitlist] Missing Supabase environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
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
      return res.status(200).json({
        message: "You're already on the waitlist!",
        alreadyExists: true,
      });
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
      return res.status(500).json({ error: 'Failed to add email to waitlist' });
    }

    return res.status(200).json({
      message: 'Successfully added to waitlist!',
      success: true,
    });
  } catch (error) {
    console.error('[waitlist] Unexpected error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
};



















