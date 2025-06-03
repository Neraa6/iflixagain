
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('https://your-railway-url.up.railway.app/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();
  if (response.ok) {
    // Redirect ke dashboard
    window.location.href = 'dashboard.html';
  } else {
    alert(result.message);
  }
});