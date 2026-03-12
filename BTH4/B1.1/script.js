const btnAdd = document.querySelector(".btn-success");
const btnDel = document.querySelector(".btn-danger");
const table = document.querySelector(".table");

btnAdd.onclick = function () {
  const nameInput = document.querySelector('input[name="full-name"]');
  const markInput = document.querySelector('input[name="mark"]');

  const name = nameInput.value;
  const mark = parseFloat(markInput.value);

  if (name === "") {
    alert("Vui lòng nhập họ tên");
    return;
  }

  if (isNaN(mark) || mark < 0 || mark > 10) {
    alert("Vui lòng nhập điểm (0-10)");
    return;
  }

  const row = table.insertRow();

  let xepLoai = "";
  if (mark >= 8.5) xepLoai = "Giỏi";
  else if (mark >= 7) xepLoai = "Khá";
  else if (mark >= 5) xepLoai = "Trung Bình";
  else {
    xepLoai = "Yếu";
    row.style.blackgroundColor = "yellow";
  }

  row.innerHTML = `
    <td>${table.rows.length - 1}</td>
    <td>${name}</td>
    <td>${mark}</td>
    <td>${xepLoai}</td>
    <td><button class = "btn btn-danger">Xóa</button></td>
    `;
  nameInput.value = "";
  markInput.value = "";
  nameInput.focus();
};
