// api/redirect.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const groupLinks = [
  'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
  'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
  'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
  'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
  'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
];

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('Czechgirls')
      .select('clicks')
      .eq('id', 1)
      .single();

    if (error) throw error;

    const currentClick = data?.clicks || 0;
    const newClick = currentClick + 1;

    const { error: updateError } = await supabase
      .from('Czechgirls')
      .update({ clicks: newClick })
      .eq('id', 1);

    if (updateError) throw updateError;

    const index = currentClick % groupLinks.length;
    const redirectUrl = groupLinks[index];

    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (err) {
    console.error('Redirect failed:', err);
    res.status(500).json({ error: 'Redirection error', message: err.message });
  }
}
