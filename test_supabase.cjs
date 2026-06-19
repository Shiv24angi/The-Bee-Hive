const supabaseUrl = 'https://kmefxirvdxzgwjcjbsyf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttZWZ4aXJ2ZHh6Z3dqY2pic3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MTk3NzAsImV4cCI6MjA5NjM5NTc3MH0.C0HI5K3HqzViYSfjqJntut603A14cti96aOuCfWVKZk';

async function checkSchema() {
  const pRes = await fetch(`${supabaseUrl}/rest/v1/publications?limit=1`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  });
  console.log("Publications table row:", await pRes.text());

  const aRes = await fetch(`${supabaseUrl}/rest/v1/archive?limit=1`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  });
  console.log("Archive table row:", await aRes.text());
}
checkSchema();
