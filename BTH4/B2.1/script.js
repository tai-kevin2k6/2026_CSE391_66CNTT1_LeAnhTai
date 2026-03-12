function showError(fieldId, message) {
  const err = document.getElementById('error-' + fieldId);
  if (err) {
    err.textContent = message;
  }
}

function clearError(fieldId) {
  const err = document.getElementById('error-' + fieldId);
  if (err) {
    err.textContent = '';
  }
}

function validateFullname() {
  const fld = document.getElementById('form-row-fullname');
  const val = fld.value.trim();
  clearError('fullname');
  if (!val) {
    showError('fullname', 'Họ và tên không được để trống');
    return false;
  }
  if (val.length < 3) {
    showError('fullname', 'Phải có ít nhất 3 ký tự');
    return false;
  }
  if (!/^[A-Za-zÀ-ỹ\s]+$/.test(val)) {
    showError('fullname', 'Chỉ chứa chữ cái và khoảng trắng');
    return false;
  }
  return true;
}

function validateEmail() {
  const fld = document.getElementById('form-row-email');
  const val = fld.value.trim();
  clearError('email');
  if (!val) {
    showError('email', 'Email không được để trống');
    return false;
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(val)) {
    showError('email', 'Email không hợp lệ');
    return false;
  }
  return true;
}

function validatePhone() {
  const fld = document.getElementById('form-row-phone');
  const val = fld.value.trim();
  clearError('phone');
  if (!val) {
    showError('phone', 'Số điện thoại không được để trống');
    return false;
  }
  if (!/^0\d{9}$/.test(val)) {
    showError('phone', 'Phải là 10 chữ số và bắt đầu bằng 0');
    return false;
  }
  return true;
}

function validatePassword() {
  const fld = document.getElementById('form-row-password');
  const val = fld.value;
  clearError('password');
  if (!val) {
    showError('password', 'Mật khẩu không được để trống');
    return false;
  }
  if (val.length < 8) {
    showError('password', 'Phải có ít nhất 8 ký tự');
    return false;
  }
  if (!/[A-Z]/.test(val)) {
    showError('password', 'Phải có ít nhất 1 chữ hoa');
    return false;
  }
  if (!/[a-z]/.test(val)) {
    showError('password', 'Phải có ít nhất 1 chữ thường');
    return false;
  }
  if (!/\d/.test(val)) {
    showError('password', 'Phải có ít nhất 1 số');
    return false;
  }
  return true;
}

function validateRePassword() {
  const fld = document.getElementById('form-row-re-password');
  const val = fld.value;
  const pwd = document.getElementById('form-row-password').value;
  clearError('re-password');
  if (val !== pwd) {
    showError('re-password', 'Mật khẩu không khớp');
    return false;
  }
  return true;
}

function validateGender() {
  clearError('gender');
  const male = document.getElementById('form-row-gender-male');
  const female = document.getElementById('form-row-gender-female');
  if (!male.checked && !female.checked) {
    showError('gender', 'Phải chọn giới tính');
    return false;
  }
  return true;
}

function validateTerm() {
  clearError('term');
  const chk = document.getElementById('form-row-term');
  if (!chk.checked) {
    showError('term', 'Bạn phải đồng ý điều khoản');
    return false;
  }
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ok =
      validateFullname() &
      validateEmail() &
      validatePhone() &
      validatePassword() &
      validateRePassword() &
      validateGender() &
      validateTerm();
    if (ok) {
      form.style.display = 'none';
      const name = document.getElementById('form-row-fullname').value.trim();
      const msg = document.getElementById('success-message');
      msg.textContent = `Đăng ký thành công! 🎉 Chào mừng ${name}`;
      msg.style.display = 'block';
    }
  });

  const fields = [
    {id: 'fullname', fn: validateFullname},
    {id: 'email', fn: validateEmail},
    {id: 'phone', fn: validatePhone},
    {id: 'password', fn: validatePassword},
    {id: 're-password', fn: validateRePassword},
    {id: 'gender', fn: validateGender},
    {id: 'term', fn: validateTerm},
  ];

  fields.forEach(f => {
    if (f.id === 'gender' || f.id === 'term') {
      return;
    }
    const el = document.getElementById('form-row-' + f.id);
    if (el) {
      el.addEventListener('blur', f.fn);
      el.addEventListener('input', () => clearError(f.id));
    }
  });

  ['form-row-gender-male','form-row-gender-female'].forEach(id => {
    const r = document.getElementById(id);
    if (r) {
      r.addEventListener('change', () => {
        clearError('gender');
      });
      r.addEventListener('blur', validateGender);
    }
  });

  const termEl = document.getElementById('form-row-term');
  if (termEl) {
    termEl.addEventListener('change', () => clearError('term'));
    termEl.addEventListener('blur', validateTerm);
  }
});
