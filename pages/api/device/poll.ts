import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    const { device_code } = req.body;

    if (!device_code) {
      return res.status(400).json({ error: 'device_code is required' });
    }

    // Get device code record
    const { data: deviceRecord, error: fetchError } = await supabase
      .from('device_codes')
      .select('*')
      .eq('device_code', device_code)
      .single();

    if (fetchError || !deviceRecord) {
      return res.status(400).json({ error: 'Invalid device code' });
    }

    // Check if expired
    if (new Date(deviceRecord.expires_at) < new Date()) {
      // Clean up expired record
      await supabase
        .from('device_codes')
        .delete()
        .eq('device_code', device_code);
      
      return res.json({ status: 'expired' });
    }

    // Check if approved
    if (deviceRecord.user_id && deviceRecord.approved_at) {
      // Get user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', deviceRecord.user_id)
        .single();

      // Generate tokens
      const accessToken = jwt.sign(
        { 
          sub: deviceRecord.user_id,
          email: profile?.email,
          type: 'access'
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '1h' }
      );

      const refreshToken = jwt.sign(
        { 
          sub: deviceRecord.user_id,
          type: 'refresh'
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '30d' }
      );

      // Clean up device code
      await supabase
        .from('device_codes')
        .delete()
        .eq('device_code', device_code);

      return res.json({
        status: 'approved',
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 3600, // 1 hour
      });
    }

    // Still pending
    res.json({ status: 'pending' });
  } catch (error) {
    console.error('Device poll error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
