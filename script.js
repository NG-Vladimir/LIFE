// === index.html ===
if (document.getElementById('welcomeForm')) {

  // Проверка localStorage: если данные есть, сразу идём в menu.html
  const storedName = localStorage.getItem('userName');
  const storedBirth = localStorage.getItem('userBirthdate');
  if(storedName && storedBirth){
    window.location.href = 'menu.html';
  }

  document.getElementById('welcomeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const birthdate = document.getElementById('birthdate').value;

    if(!name || !birthdate){
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if(birthdate > today){
      alert("Дата рождения не может быть из будущего!");
      return;
    }

    localStorage.setItem('userName', name);
    localStorage.setItem('userBirthdate', birthdate);
    window.location.href = 'menu.html';
  });
}

// === menu.html ===
if(document.querySelector('.nav-bar')){
  document.addEventListener('DOMContentLoaded', () => {
    const name = localStorage.getItem('userName');
    const birthdate = localStorage.getItem('userBirthdate');

    if(name && birthdate){
      document.getElementById('profileName').textContent = name;
      const date = new Date(birthdate);
      document.getElementById('profileBirthdate').textContent = date.toLocaleDateString('ru-RU', {day:'2-digit', month:'long'});
      let nextBirthday = new Date(new Date().getFullYear(), date.getMonth(), date.getDate());
      if(nextBirthday < new Date()) nextBirthday.setFullYear(new Date().getFullYear()+1);
      const diffDays = Math.ceil((nextBirthday - new Date())/(1000*60*60*24));
      document.getElementById('daysUntilBirthday').textContent = diffDays + ' дней';
    }

    // показываем главную вкладку по умолчанию
    switchTab('main', document.querySelector('.nav-item.active'));
  });

  window.switchTab = function(tab, element){
    document.querySelectorAll('.menu-content').forEach(el => el.classList.remove('active'));
    document.getElementById(tab+'Content').classList.add('active');

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(element) element.classList.add('active');
  }
}