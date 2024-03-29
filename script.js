const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false,
  updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "أضف ملاحظة جديدة";
  addBtn.innerText = "أضف الملاحظة";
  popupBox.classList.add("show");
  document.body.style.overflow = 'hidden'
  titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  document.body.style.overflow = 'auto'
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
});

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notes.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>تعديل</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>حذف</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "تحديث الملاحظة";
  addBtn.innerText = "تحديث الملاحظة";
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();

  if (title || description) {
    let currentDate = new Date(),
      // month = months[currentDate.getMonth()],
      month = currentDate.getMonth() + 1,
      day = currentDate.getDate(),
      year = currentDate.getFullYear(),
      hour = currentDate.getHours(),
      minit = currentDate.getMinutes(),
      AMPM = (hour > 12 ? "PM" : "AM"),
      the_month = (month > 9 ? month : `0${month}`)

    let noteInfo = { title, description, date: `${day},${the_month},${year} ${hour-12}:${minit} ${AMPM}` };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});


function deleteNote(noteId) {
  let response = confirm("هل تريد حذف الملاحظة ؟")
  if(!response ) return ;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();

}

