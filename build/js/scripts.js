// Intento 2 => Asociar la función de manejo de scroll al evento de scroll
// window.addEventListener("scroll", handleScroll);


// Intento extra
/* window.onload = function(){
  document.getElementById('videoJs').play();
}
 */


document.addEventListener("DOMContentLoaded", function () {
  reproduceVideo(); // Intento 3
  navegacionFija(); // Barra, navegación fija
  crearGaleria();
  scrollNav(); // SmoothScroll
});


/*=============== handleScroll (Intento 2) => función que al srollear = reproducción automatica  ===============*/
function handleScroll() {
  const video = document.querySelector("#videoJS");
  const videoPosition = video.getBoundingClientRect();

  // Reproduce el video cuando está en el área visible
  if (videoPosition.top < 0) {
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    
    // Intentar reproducir el video
    const promise = video.play();

    // Manejar la promesa para navegadores que requieren interacción del usuario
    if (promise !== undefined) {
      promise.then((_) => {
          console.log("hola");
          // Reproducción iniciada con éxito
        }).catch((error) => {
          // Reproducción automática bloqueada
          // Simular interacción del usuario (puede variar según el navegador)
          document.documentElement.addEventListener("click", () => {
              video.play();
          }, { once: true });
        });
    }  
  }
}


/*=============== SmoothScroll ===============*/
function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlaces) => {
    enlaces.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}


/*=============== Galería ===============*/
function mostrarImagen(index) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `
    <source srcset="build/img/grande/${index}.avif" type="image/avif">
    <source srcset="build/img/grande/${index}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg"
        alt="Imagen galeria"> <!-- fallback -->
    `;

  // 1º Creando Overlay, para darle un poco de oscuridad a las img
  const overlay = document.createElement("DIV"); //oscurecemos un poco la pantalla de fondo.
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");

  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");

  // Elimina el overlay con un click
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove(); // Elimina
  };

  // Elimina el overlay global con un click
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  overlay.appendChild(cerrarModal);

  // 2º Añadiendo al HTML
  const body = document.querySelector("body");
  body.appendChild(overlay); // asi mostramos en el body la imagen
  body.classList.add("fijar-body"); // para evitar el scroll y se quede fijo
}


function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
        <source srcset="build/img/pequeña/${i}.avif" type="image/avif">
        <source srcset="build/img/pequeña/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/pequeña/${i}.jpg"
            alt="Imagen galeria"> <!-- fallback -->
        `;

    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}


/*=============== Barra de navegación fija ===============*/
function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}


/*=============== Reproducir video ===============*/
function reproduceVideo() {
  const video = document.querySelector("#videoJS");
  //console.log(video);
  
  //alert(video);
  // Configurar propiedades del video
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  //video.play() = true;

  // Intentar reproducir el video
  const promise = video.play();

  // Manejar la promesa para navegadores que requieren interacción del usuario
  if (promise !== undefined) {
    promise.then((_) => {
        console.log("hola");
        // Reproducción iniciada con éxito
      })
      .catch((error) => {
        console.log('error');
        // Reproducción automática bloqueada
        // Simular interacción del usuario (puede variar según el navegador)
        document.documentElement.addEventListener("click", () => {
            video.play();
        }, { once: true });
      });
  }else {
    promise.then((_) => {
        console.log("adios");
        // Reproducción iniciada con éxito
      })
      .catch((error) => {
        // Reproducción automática bloqueada
        // Simular interacción del usuario (puede variar según el navegador)
        document.documentElement.addEventListener("click", () => {
          video.play();
        }, { once: true });
      });
  }
}