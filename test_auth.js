const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  const timestamp = Date.now();
  
  const users = [
    { name: 'Admin User', email: `admin${timestamp}@test.com`, password: 'Password123!', role: 'admin' },
    { name: 'Moderator User', email: `mod${timestamp}@test.com`, password: 'Password123!', role: 'moderator' },
    { name: 'Regular User', email: `user${timestamp}@test.com`, password: 'Password123!', role: 'user' }
  ];

  const tokens = {};

  console.log('--- Registering Users ---');
  for (const user of users) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`Registered ${user.role} successfully`);
    } else {
      console.error(`Failed to register ${user.role}:`, data);
      return;
    }
  }

  console.log('\n--- Logging In ---');
  for (const user of users) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, password: user.password })
    });
    const data = await res.json();
    if (res.ok) {
      tokens[user.role] = data.token;
      console.log(`Logged in as ${user.role}`);
    } else {
      console.error(`Failed to login as ${user.role}:`, data);
      return;
    }
  }

  const endpoints = [
    { path: '/users/admin-profile', role: 'admin' },
    { path: '/users/moderator-profile', role: 'moderator' },
    { path: '/users/profile', role: 'user' }
  ];

  console.log('\n--- Testing Authorization ---');
  for (const endpoint of endpoints) {
    console.log(`\nEndpoint: ${endpoint.path} (Requires ${endpoint.role})`);
    for (const userRole in tokens) {
      const res = await fetch(`${BASE_URL}${endpoint.path}`, {
        headers: { 'x-auth-token': tokens[userRole] }
      });
      const status = res.status;
      let data = {};
      if (res.ok) {
        data = await res.json();
      }
      
      let result = '';
      const hasAccess = (userRole === endpoint.role) || (userRole === 'admin');
      
      if (hasAccess) {
        result = status === 200 ? '✅ SUCCESS' : '❌ FAIL (Should have access)';
      } else {
        result = status === 403 ? '✅ CORRECTLY DENIED' : `❌ FAIL (Should be 403, got ${status})`;
      }
      
      console.log(`  User: ${userRole.padEnd(10)} | Status: ${status} | ${result}`);
      if (status === 200) console.log(`    Message: ${data.message}`);
    }
  }
}

runTests().catch(err => console.error('Test error:', err));
