document.addEventListener('DOMContentLoaded', function () {
  var burgerBtn = document.getElementById('burgerBtn');
  var mainNav = document.getElementById('mainNav');

  burgerBtn.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('.nav-link, .header-phone').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  var orderForm = document.getElementById('orderForm');
  var formSuccess = document.getElementById('formSuccess');

  orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // TODO: заменить на реальную отправку заявки (API / почтовый сервис)
    // при интеграции с бэкендом.
    var data = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      comment: document.getElementById('comment').value
    };
    console.log('Заявка (заглушка, без реальной отправки):', data);

    formSuccess.hidden = false;
    orderForm.reset();
  });
});
