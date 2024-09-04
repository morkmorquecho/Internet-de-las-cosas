// Función para cargar una animación Lottie
function loadAnimation(path) {
    return lottie.loadAnimation({
        container: document.getElementById('lottie-container'), // Contenedor para la animación Lottie
        renderer: 'svg',
        loop: true, // Hacer que la animación se repita
        autoplay: true, // Reproducir automáticamente al cargar
        path: path // Ruta al archivo Lottie
    });
}

// Cargar la animación inicial
var animation = loadAnimation('off.json'); // Ruta al archivo Lottie por defecto

document.getElementById('Breaker1').addEventListener('change', function() {
    var isChecked = this.checked;
    var output = document.getElementById('state1');
    var body = document.body;

    // Actualizar el texto y el color de fondo según el estado del toggle
    output.innerText = isChecked ? 'On' : 'Off';
    if (isChecked) {
        body.classList.remove('blue-bg');
        body.classList.add('black-bg');
        // Destruir la animación actual y cargar la nueva
        animation.destroy(); // Destruir la animación actual
        animation = loadAnimation('off.json'); // Cargar la nueva animación
    } else {
        body.classList.remove('black-bg');
        body.classList.add('blue-bg');
        // Destruir la animación actual y cargar la nueva
        animation.destroy(); // Destruir la animación actual
        animation = loadAnimation('on.json'); // Cargar la nueva animación
    }

    // Enviar comando a Particle
    var Salida1 = isChecked ? '1' : '0'; // 1 para On, 0 para Off
    particle.callFunction({
        deviceId: '25001d000847313037363132',
        name: 'led',
        argument: Salida1,
        auth: token,
    }).then(
        function(data) {
            console.log('Function called successfully:', data);
        },
        function(err) {
            console.log('An error occurred:', err);
        }
    );
});
