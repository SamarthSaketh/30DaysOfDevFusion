let db;
let currentGroupIndex = 0;
let groups = [];

const dbRequest = indexedDB.open("ImageGalleryDB", 1);

dbRequest.onupgradeneeded = function (e) {
  db = e.target.result;
  db.createObjectStore("groups", { keyPath: "id", autoIncrement: true });
};

dbRequest.onsuccess = function (e) {
  db = e.target.result;
  loadGroupsFromDB();
};

dbRequest.onerror = function () {
  alert("Failed to open database");
};

// DOM elements
const groupView = document.getElementById("groupView");
const createGroupBtn = document.getElementById("createGroupBtn");
const groupPopup = document.getElementById("groupPopup");
const addGroupBtn = document.getElementById("addGroup");
const cancelGroupBtn = document.getElementById("cancelGroup");
const groupNameInput = document.getElementById("groupName");
const groupImagesInput = document.getElementById("groupImages");

const groupDetailView = document.getElementById("groupDetailView");
const groupTitle = document.getElementById("groupTitle");
const groupImagesContainer = document.getElementById("groupImagesContainer");
const backToHome = document.getElementById("backToHome");
const layoutSelector = document.getElementById("layoutSelector");

const imageModal = document.getElementById("imageModal");
const imageModalImg = document.getElementById("imageModalImg");
const imageModalClose = document.getElementById("imageModalClose");

const addPhotosBtn = document.getElementById("addPhotosBtn");
const renameGroupBtn = document.getElementById("renameGroupBtn");
const deleteGroupBtn = document.getElementById("deleteGroupBtn");

createGroupBtn.addEventListener("click", () => groupPopup.classList.remove("hidden"));
cancelGroupBtn.addEventListener("click", () => {
  groupPopup.classList.add("hidden");
  groupNameInput.value = "";
  groupImagesInput.value = "";
});

addGroupBtn.addEventListener("click", () => {
  const name = groupNameInput.value.trim();
  const files = Array.from(groupImagesInput.files);
  if (!name || files.length === 0) return alert("Name and images required");

  const images = [];
  let loaded = 0;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      images.push(e.target.result);
      loaded++;
      if (loaded === files.length) {
        const newGroup = { name, images };
        saveGroupToDB(newGroup);
        groupPopup.classList.add("hidden");
        groupNameInput.value = "";
        groupImagesInput.value = "";
      }
    };
    reader.readAsDataURL(file);
  });
});

function saveGroupToDB(group) {
  const tx = db.transaction("groups", "readwrite");
  const store = tx.objectStore("groups");
  store.add(group);
  tx.oncomplete = loadGroupsFromDB;
}

function loadGroupsFromDB() {
  const tx = db.transaction("groups", "readonly");
  const store = tx.objectStore("groups");
  const request = store.getAll();

  request.onsuccess = function () {
    groups = request.result;
    renderGroups();
  };
}

function updateGroupInDB(group) {
  const tx = db.transaction("groups", "readwrite");
  const store = tx.objectStore("groups");
  store.put(group);
}

function deleteGroupFromDB(id) {
  const tx = db.transaction("groups", "readwrite");
  const store = tx.objectStore("groups");
  store.delete(id);
  tx.oncomplete = loadGroupsFromDB;
}

function renderGroups() {
  groupView.innerHTML = "";
  groups.forEach((group, index) => {
    const card = document.createElement("div");
    card.className = "group-card";
    card.innerHTML = `
      <img src="${group.images[0]}" alt="cover" />
      <h3>${group.name}</h3>
    `;
    card.addEventListener("click", () => openGroup(index));
    groupView.appendChild(card);
  });
}

function openGroup(index) {
  currentGroupIndex = index;
  const group = groups[index];
  groupDetailView.classList.remove("hidden");
  groupView.style.display = "none";
  groupTitle.textContent = group.name;
  layoutSelector.value = "masonry"; // default
  updateLayout();
}

function renderGroupImages(group, layout) {
  groupImagesContainer.innerHTML = "";
  groupImagesContainer.className = "gallery";

  const layoutClasses = {
    masonry: "masonry-layout",
    grid: "grid-layout",
    columns: "columns-layout",
    circle: "circle-layout",
    carousel: "carousel-layout"
  };

  groupImagesContainer.classList.add(layoutClasses[layout]);

  group.images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Photo";
    img.loading = "lazy";
    img.addEventListener("click", () => {
      imageModal.style.display = "flex";
      imageModalImg.src = src;
    });
    groupImagesContainer.appendChild(img);
  });
}

function updateLayout() {
  const layout = layoutSelector.value;
  const group = groups[currentGroupIndex];
  renderGroupImages(group, layout);
}

layoutSelector.addEventListener("change", updateLayout);

addPhotosBtn.addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.multiple = true;

  input.addEventListener("change", () => {
    const files = Array.from(input.files);
    const images = [];
    let loaded = 0;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        images.push(e.target.result);
        loaded++;
        if (loaded === files.length) {
          const group = groups[currentGroupIndex];
          group.images.push(...images);
          updateGroupInDB(group);
          updateLayout();
        }
      };
      reader.readAsDataURL(file);
    });
  });

  input.click();
});

renameGroupBtn.addEventListener("click", () => {
  const newName = prompt("Enter new group name:", groups[currentGroupIndex].name);
  if (newName && newName.trim()) {
    const group = groups[currentGroupIndex];
    group.name = newName.trim();
    groupTitle.textContent = newName.trim();
    updateGroupInDB(group);
    renderGroups();
  }
});

deleteGroupBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete this group?")) {
    const group = groups[currentGroupIndex];
    deleteGroupFromDB(group.id);
    groupDetailView.classList.add("hidden");
    groupView.style.display = "grid";
  }
});

backToHome.addEventListener("click", () => {
  groupDetailView.classList.add("hidden");
  groupView.style.display = "grid";
});

imageModalClose.addEventListener("click", () => {
  imageModal.style.display = "none";
});
imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) imageModal.style.display = "none";
});
