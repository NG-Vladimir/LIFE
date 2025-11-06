// === index.html ===
if(document.getElementById('welcomeForm')) {

  const storedName = localStorage.getItem('userName');
  const storedBirth = localStorage.getItem('userBirthdate');
  if(storedName && storedBirth){
    window.location.href = 'menu.html';
  }

  document.getElementById('welcomeForm').addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const birthdate = document.getElementById('birthdate').value;

    if(!name || !birthdate){
      alert("Заполните все поля!");
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
      document.getElementById('profileBirthdate').textContent = date.toLocaleDateString('ru-RU',{day:'2-digit',month:'long'});

      let nextBirthday = new Date(new Date().getFullYear(), date.getMonth(), date.getDate());
      if(nextBirthday < new Date()) nextBirthday.setFullYear(new Date().getFullYear()+1);
      const diffDays = Math.ceil((nextBirthday - new Date())/(1000*60*60*24));
      document.getElementById('daysUntilBirthday').textContent = diffDays + ' дней';
    }

    // Telegram WebApp
    if(window.Telegram && Telegram.WebApp){
      const tg = Telegram.WebApp;
      tg.expand();

      const profileContent = document.getElementById('profileContent');
      const btn = document.createElement('button');
      btn.textContent = "Отправить данные боту";
      btn.style.marginTop = "15px";
      btn.onclick = () => {
        const data = {
          name: localStorage.getItem('userName'),
          birthdate: localStorage.getItem('userBirthdate')
        };
        tg.sendData(JSON.stringify(data));
      };
      profileContent.appendChild(btn);
    }

    switchTab('main', document.querySelector('.nav-item.active'));
  });

  window.switchTab = function(tab, element){
    document.querySelectorAll('.menu-content').forEach(el => el.style.display = 'none');
    document.getElementById(tab+'Content').style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if(element) element.classList.add('active');
  }
}