# Luma Beauty

Página de catálogo de maquillaje hecha con Vue 3, HTML, CSS y JavaScript. Es una demostración académica de sitio estático. El catálogo vive en `productos.json`; no necesita un servidor backend ni base de datos.

## Verla en la computadora

Abre `index.html` en un navegador conectado a internet. Vue 3 y las fuentes se cargan desde CDN. Para probar la carga de `productos.json`, sirve la carpeta con un servidor HTTP local o súbela a Nginx; los navegadores bloquean `fetch()` de JSON desde algunas aperturas `file://`.

## Subir el proyecto a GitHub

El repositorio de este proyecto ya está creado en [github.com/Jhomayra21/luma-beauty](https://github.com/Jhomayra21/luma-beauty) y la página ya fue subida. Para publicar futuras modificaciones desde PowerShell en esta carpeta:

```powershell
git add .
git commit -m "Actualizar página"
git push
```

GitHub guarda el código y facilita llevarlo a la VM. No es requisito técnico para que Nginx muestre una página: también podrías copiar los archivos directamente a la máquina. Para el flujo que empezaron en clase, GitHub es una manera práctica de transferir y actualizar la web.

## Publicar en la VM Ubuntu con Nginx

Las capturas muestran Ubuntu, Nginx instalado y activo, y reglas locales para SSH y Nginx. Esta web es estática: no hace falta instalar Node.js en la VM, ejecutar un proceso backend, ni usar `npm run dev` en producción.

Conéctate por SSH a la VM y ejecuta estos comandos:

```bash
sudo apt update
sudo apt install -y git
sudo git clone --depth 1 https://github.com/Jhomayra21/luma-beauty.git /tmp/luma-beauty
sudo rm -f /var/www/html/index.nginx-debian.html
sudo cp -r /tmp/luma-beauty/. /var/www/html/
sudo chown -R www-data:www-data /var/www/html
```

Abre en el navegador `http://IP_PUBLICA_DE_TU_VM`. Cuando hagas cambios en GitHub, actualiza la copia de la VM con:

```bash
sudo git -C /tmp/luma-beauty pull
sudo cp -r /tmp/luma-beauty/. /var/www/html/
```

## Red de Oracle Cloud

Además de que Nginx escuche en el puerto 80, OCI debe permitir el tráfico desde internet hasta la VM. Revisa que la VM tenga IP pública y que la regla de entrada TCP 80 exista en la lista de seguridad de la subnet o en su NSG. La captura de `ufw` muestra que permitieron SSH y `Nginx Full`; al habilitar UFW, conserva la regla SSH (`sudo ufw allow OpenSSH`) antes de activarlo para no perder acceso remoto. La regla de OCI y el firewall de Ubuntu son dos controles distintos.

Los comandos `iptables` de las capturas añaden reglas manuales temporales. Para esta configuración, administra los puertos del sistema con UFW y los de la red desde OCI.

## Personalizar

- Edita productos, nombres, categorías y precios en `productos.json`.
- Los colores y el diseño están en `styles.css`.
- La interacción de filtros, búsqueda, favoritos y bolsa está en `app.js`.
- El formulario de correo es solo una demostración visual; no envía ni almacena correos.

El logo, la marca y los productos son ficticios. Vue y las fuentes se descargan de servicios CDN al abrir la página; hace falta conexión a internet desde el navegador.


