// Archivo: api/redirect.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('Czechgirls')
      .select('clicks')
      .eq('id', 1)
      .single();

    if (error) {
      console.log("Error al leer datos:", error.message);
      return res.status(500).json({ step: "select", message: error.message });
    }

    const currentClick = data?.clicks || 0;
    const newClick = currentClick + 1;

    const { error: updateError } = await supabase
      .from('Czechgirls')
      .update({ clicks: newClick })
      .eq('id', 1);

    if (updateError) {
      console.log("Error al actualizar:", updateError.message);
      return res.status(500).json({ step: "update", message: updateError.message });
    }

    const groupLinks = [
      'https://chat.whatsapp.com/HsaBuLsrdPO4V21yjIQv47',
      'https://chat.whatsapp.com/LgnVlowLUYT9cZae0bEI5V',
      'https://chat.whatsapp.com/D4qSliHepxsEVmCFHm7fZK',
      'https://chat.whatsapp.com/KFm5iHFYDgdA5RJ7LXWddZ',
      'https://chat.whatsapp.com/Db2qc5V6ramIhAMh3eLcIC'
    ];

    const index = currentClick % groupLinks.length;
    const redirectUrl = groupLinks[index];

    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (err) {
    console.log("Error general:", err.message);
    return res.status(500).json({ step: "catch", message: err.message });
  }
}
