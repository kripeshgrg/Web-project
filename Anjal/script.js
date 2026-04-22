<script>
  const msg = document.getElementById('message');
  msg.addEventListener('input', () => {
    document.getElementById('charCount').textContent = msg.value.length;
    if (msg.value.trim().length >= 20) clearError('message');
  });

  document.getElementById('firstName').addEventListener('blur', () => validateName('firstName'));
  document.getElementById('lastName').addEventListener('blur', () => validateName('lastName'));
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('phone').addEventListener('blur', validatePhone);
  document.getElementById('subject').addEventListener('change', validateSubject);
  document.getElementById('message').addEventListener('blur', validateMessage);
  document.getElementById('agree').addEventListener('change', validateAgree);

  function validateName(id) {
    const val = document.getElementById(id).value.trim();
    if (val.length < 2) { setError(id, `Name must be at least 2 characters.`); return false; }
    clearError(id); markValid(id); return true;
  }

  function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) { setError('email', 'Please enter a valid email address.'); return false; }
    clearError('email'); markValid('email'); return true;
  }

  function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    if (val === '') return true;
    const re = /^\+?[\d\s\-()]{7,15}$/;
    if (!re.test(val)) { setError('phone', 'Enter a valid phone number (7–15 digits).'); return false; }
    clearError('phone'); markValid('phone'); return true;
  }

  function validateSubject() {
    const val = document.getElementById('subject').value;
    if (!val) { setError('subject', 'Please select a subject.'); return false; }
    clearError('subject'); return true;
  }

  function validateMessage() {
    const val = document.getElementById('message').value.trim();
    if (val.length < 20) { setError('message', 'Message must be at least 20 characters.'); return false; }
    clearError('message'); return true;
  }

  function validateAgree() {
    if (!document.getElementById('agree').checked) { setError('agree', 'You must agree to proceed.'); return false; }
    clearError('agree'); return true;
  }

  function setError(id, msg) {
    const field = document.getElementById('field-' + id);
    const errEl = document.getElementById('err-' + id);
    const input = document.getElementById(id);
    if (field) field.classList.add('has-error');
    if (errEl) errEl.textContent = msg;
    if (input) { input.classList.remove('valid'); input.classList.add('invalid'); }
  }

  function clearError(id) {
    const field = document.getElementById('field-' + id);
    const input = document.getElementById(id);
    if (field) field.classList.remove('has-error');
    if (input) input.classList.remove('invalid');
  }

  function markValid(id) {
    const input = document.getElementById(id);
    if (input) input.classList.add('valid');
  }

  function submitForm() {
    const v1 = validateName('firstName');
    const v2 = validateName('lastName');
    const v3 = validateEmail();
    const v4 = validatePhone();
    const v5 = validateSubject();
    const v6 = validateMessage();
    const v7 = validateAgree();

    if (v1 && v2 && v3 && v4 && v5 && v6 && v7) {
      const btn = document.getElementById('submitBtn');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        document.getElementById('formView').style.display = 'none';
        document.getElementById('successView').style.display = 'block';
      }, 1200);
    } else {
      const firstErr = document.querySelector('.has-error');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function resetForm() {
    document.getElementById('formView').style.display = 'block';
    document.getElementById('successView').style.display = 'none';
    document.getElementById('submitBtn').textContent = 'Send Message →';
    document.getElementById('submitBtn').disabled = false;
    ['firstName','lastName','email','phone','message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = ''; el.classList.remove('valid','invalid'); }
    });
    document.getElementById('subject').value = '';
    document.getElementById('agree').checked = false;
    document.getElementById('charCount').textContent = '0';
    document.querySelectorAll('.field').forEach(f => f.classList.remove('has-error'));
    document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
  }

  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  hamburger.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
</script>