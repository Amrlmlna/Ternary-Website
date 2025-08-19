import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Generate a random user code (6 uppercase letters/numbers)
function generateUserCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Generate device code and user code
    const deviceCode = uuidv4();
    const userCode = generateUserCode();
    const verificationUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ternary-beta-domain.vercel.app'}/auth/device`;
    const expiresIn = 600; // 10 minutes
    const interval = 5; // Poll every 5 seconds

    // Store in database
    const { error } = await supabase
      .from('device_codes')
      .insert({
        device_code: deviceCode,
        user_code: userCode,
        verification_uri: verificationUri,
        expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
        interval_seconds: interval,
      });

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to create device code' });
    }

    res.json({
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: verificationUri,
      expires_in: expiresIn,
      interval: interval,
    });
  } catch (error) {
    console.error('Device start error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
