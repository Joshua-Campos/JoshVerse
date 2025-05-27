const botonOscuro = document.getElementById('modoOscuro');

// Verifica si el modo oscuro está habilitado previamente
if (localStorage.getItem('dark-mode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Cambia entre el modo oscuro y claro al hacer clic en el botón
botonOscuro.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  // Guarda la preferencia en el localStorage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
  } else {
    localStorage.setItem('dark-mode', 'disabled');
  }
});
