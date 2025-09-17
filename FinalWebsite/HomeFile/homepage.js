 const loggedUser = localStorage.getItem("loggedUser");
  const loggedRole = localStorage.getItem("loggedRole");

  if (loggedUser) {
    // Palitan ang Login button ng Profile
    const loginContainer = document.querySelector(".container_login");
    loginContainer.innerHTML = `
       <div class="profile-menu">
    <div class="profile-icon">👤</div>
    <div class="dropdown-box" id="dropdownBox">
      <div class="dropdown-header">
        <strong>Jzro Xiccro</strong>
        <small>jzroxiccro@gmail.com</small>
      </div>
      <a href="#" id="profileSettings">
        Profile Settings
        <span>Update your profile and account settings</span>
      </a>
     <button class="logout" id="logoutBtn" onclick="logout()">${loggedRole} Logout</button>
    </div>
  </div>
    `;
  }

  function logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedRole");
    window.location.href = "../HomeFile/Homepage.html";
  }

   const profileIcon = document.querySelector('.profile-icon');
    const dropdownBox = document.getElementById('dropdownBox');
    const profileView = document.getElementById('profileView');
    const editForm = document.getElementById('editForm');
    const profileSettings = document.getElementById('profileSettings');
    const saveBtn = document.getElementById('saveBtn');
    const savePopup = document.getElementById('savePopup');
    const closeSavePopup = document.getElementById('closeSavePopup');

    const logoutBtn = document.getElementById('logoutBtn');
    const logoutPopup = document.getElementById('logoutPopup');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    // Dropdown toggle
    profileIcon.addEventListener('click', () => {
      dropdownBox.style.display = dropdownBox.style.display === 'block' ? 'none' : 'block';
    });

    // Profile Settings → Show Edit Form
    profileSettings.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownBox.style.display = 'none';
      profileView.style.display = 'none';
      editForm.style.display = 'block';
    });

    // Save Button → Show Save Confirmation Popup
    saveBtn.addEventListener('click', () => {
      savePopup.style.display = 'flex';
    });

    closeSavePopup.addEventListener('click', () => {
      savePopup.style.display = 'none';
      editForm.style.display = 'none';
      profileView.style.display = 'block'; // balik sa view mode
    });

    // Logout popup
    logoutBtn.addEventListener('click', () => {
      dropdownBox.style.display = 'none';
      logoutPopup.style.display = 'flex';
    });

    cancelLogout.addEventListener('click', () => {
      logoutPopup.style.display = 'none';
    });

    confirmLogout.addEventListener('click', () => {
      window.location.href = "login.html"; //connect sa login
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.profile-menu')) {
        dropdownBox.style.display = 'none';
      }
    });