const prices = {"Ao":150000, "Quan":200000, "Giay":250000};
const form = document.getElementById('orderForm');
const product = document.getElementById('product');
const quantity = document.getElementById('quantity');
const dateEl = document.getElementById('date');
const address = document.getElementById('address');
const note = document.getElementById('note');
const paymentEls = document.getElementsByName('payment');
const totalEl = document.getElementById('total');
const noteCount = document.getElementById('noteCount');

function setError(el, msg) {
  const span = document.getElementById(el.id + 'Error');
  span.textContent = msg;
}
function clearError(el) {
  const span = document.getElementById(el.id + 'Error');
  span.textContent = '';
}

function validateProduct() {
  if (!product.value) {
    setError(product, 'Phải chọn sản phẩm');
    return false;
  }
  clearError(product);
  return true;
}
function validateQuantity() {
  const v = Number(quantity.value);
  if (!quantity.value || !Number.isInteger(v) || v < 1 || v > 99) {
    setError(quantity, 'Số lượng phải là số nguyên 1-99');
    return false;
  }
  clearError(quantity);
  return true;
}
function validateDate() {
  if (!dateEl.value) {
    setError(dateEl, 'Phải chọn ngày');
    return false;
  }
  const chosen = new Date(dateEl.value).getTime();
  const now = new Date().setHours(0,0,0,0);
  const max = now + 30*24*60*60*1000;
  if (chosen < now) {
    setError(dateEl, 'Không được chọn ngày quá khứ');
    return false;
  }
  if (chosen > max) {
    setError(dateEl, 'Không quá 30 ngày từ hôm nay');
    return false;
  }
  clearError(dateEl);
  return true;
}
function validateAddress() {
  if (!address.value.trim() || address.value.trim().length < 10) {
    setError(address, 'Địa chỉ phải ít nhất 10 ký tự');
    return false;
  }
  clearError(address);
  return true;
}
function validateNote() {
  if (note.value && note.value.length > 200) {
    setError(note, 'Ghi chú tối đa 200 ký tự');
    return false;
  }
  clearError(note);
  return true;
}
function validatePayment() {
  let ok = false;
  for (const r of paymentEls) {
    if (r.checked) ok = true;
  }
  if (!ok) {
    document.getElementById('paymentError').textContent = 'Chọn phương thức thanh toán';
    return false;
  }
  document.getElementById('paymentError').textContent = '';
  return true;
}

function updateTotal() {
  const prod = product.value;
  const qty = Number(quantity.value) || 0;
  const price = prices[prod] || 0;
  const tot = price * qty;
  totalEl.textContent = tot.toLocaleString('vi-VN');
}

product.addEventListener('change', () => { validateProduct(); updateTotal(); });
quantity.addEventListener('input', () => { validateQuantity(); updateTotal(); });
dateEl.addEventListener('blur', validateDate);
address.addEventListener('blur', validateAddress);
note.addEventListener('input', () => {
  noteCount.textContent = `${note.value.length}/200`;
  if (note.value.length > 200) {
    noteCount.style.color = 'red';
  } else {
    noteCount.style.color = '';
  }
  validateNote();
});
paymentEls.forEach(r => r.addEventListener('change', validatePayment));

form.addEventListener('submit', e => {
  e.preventDefault();
  const valid = [validateProduct(), validateQuantity(), validateDate(), validateAddress(), validateNote(), validatePayment()].every(v=>v);
  if (!valid) return;
  const summary = document.getElementById('summary');
  summary.innerHTML = `Sản phẩm: ${product.options[product.selectedIndex].text}<br>
Số lượng: ${quantity.value}<br>
Tổng tiền: ${totalEl.textContent} VND<br>
Ngày giao: ${dateEl.value}`;
  document.getElementById('confirm').style.display = 'block';
});

document.getElementById('confirmBtn').addEventListener('click', () => {
  document.getElementById('confirm').style.display = 'none';
  document.getElementById('success').style.display = 'block';
  form.reset();
  totalEl.textContent = '0';
  noteCount.textContent = '0/200';
});
document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('confirm').style.display = 'none';
});
