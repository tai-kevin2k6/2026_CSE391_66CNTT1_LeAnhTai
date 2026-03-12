const btnAdd = document.querySelector(".btn-success");
const btnSrc = document.querySelector(".btn-search");
const tbody = document.querySelector(".table-body");
const keywordInput = document.getElementById("keyword");
const gradeFilter = document.getElementById("grade-filter");
const sortMark = document.getElementById("sort-mark");
const sortArrow = document.getElementById("sort-arrow");

let students = [];
let filteredStudents = [];
let isSort = 0; // 0: no sort, 1: ascending, -1: descending
let index = 0;

btnAdd.onclick = function () {
  const nameInput = document.querySelector('input[name="full-name"]');
  const markInput = document.querySelector('input[name="mark"]');

  const nameStudent = nameInput.value;
  const markStudent = parseFloat(markInput.value);

  if (nameStudent === "") {
    alert("Vui lòng nhập họ tên");
    return;
  }

  if (isNaN(markStudent) || markStudent < 0 || markStudent > 10) {
    alert("Vui lòng nhập điểm (0-10)");
    return;
  }

  let xepLoai = "";
  if (markStudent >= 8.5) xepLoai = "Giỏi";
  else if (markStudent >= 7) xepLoai = "Khá";
  else if (markStudent >= 5) xepLoai = "Trung Bình";
  else xepLoai = "Yếu";

  students.push({
    id: index + 1,
    name: nameStudent,
    mark: markStudent,
    grade: xepLoai,
  });
  index = index + 1;

  applyFilters();
  nameInput.value = "";
  markInput.value = "";
  nameInput.focus();
};

btnSrc.addEventListener("click", function () {
  applyFilters();
});

keywordInput.addEventListener("input", function () {
  applyFilters();
});

gradeFilter.addEventListener("change", function () {
  applyFilters();
});

sortMark.addEventListener("click", function () {
  if (isSort === 0) {
    isSort = 1;
  } else if (isSort === 1) {
    isSort = -1;
  } else {
    isSort = 0;
  }
  applyFilters();
});

tbody.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-danger")) {
    const id = parseInt(e.target.dataset.id);
    students = students.filter((student) => student.id !== id);
    applyFilters();
  }
});

function applyFilters() {
  const keyword = keywordInput.value.toLowerCase().trim();
  const selectedGrade = gradeFilter.value;

  filteredStudents = students.filter((student) => {
    const matchesKeyword = !keyword || student.name.toLowerCase().includes(keyword);
    const matchesGrade = !selectedGrade || student.grade === selectedGrade;
    return matchesKeyword && matchesGrade;
  });

  if (isSort !== 0) {
    filteredStudents.sort((a, b) => {
      if (isSort === 1) {
        return a.mark - b.mark;
      } else {
        return b.mark - a.mark;
      }
    });
  }

  updateSortArrow();
  renderTable(filteredStudents);
}

function updateSortArrow() {
  if (isSort === 1) {
    sortArrow.textContent = "▲";
  } else if (isSort === -1) {
    sortArrow.textContent = "▼";
  } else {
    sortArrow.textContent = "";
  }
}

function renderTable(dataArray) {
  tbody.innerHTML = "";
  if (dataArray.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan ="5" class = "text-center">Không có kết quả</td></tr>';
    return;
  }

  dataArray.forEach((student) => {
    const bgColor =
      student.grade === "Yếu" ? "style='background-color: yellow;'" : "";
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td ${bgColor}>${student.id}</td>
    <td ${bgColor}>${student.name}</td>
    <td ${bgColor}>${student.mark}</td>
    <td ${bgColor}>${student.grade}</td>
    <td ${bgColor}><button class = "btn btn-danger" data-id="${student.id}">Xóa</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Initial render
applyFilters();
