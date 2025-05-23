# MicroFrontend Remoto de Rick and Morty!

Este repositorio contiene el microfrontend remoto `rick_morty_remote`, diseñado para ser consumido por un Host principal en una arquitectura de microfrontends. Provee componentes clave como el buscador de personajes, las tarjetas individuales de personajes, los filtros y la vista de detalles.

---

## Instalación y Ejecución

Para instalar las dependencias y ejecutar el microfrontend, se deben seguir los siguientes pasos:

1.  **Clonar el repositorio:**
   
3.  **Instalar las dependencias:**
    ```bash
    npm install
    ```
4.  **Ejecuta el proyecto en modo desarrollo:**
    ```bash
    npm start
    # o
    yarn start
    ```
    Esto levantará el microfrontend en un servidor de desarrollo local, para posteriormente ser consumido por el repositorio Host.

---

## Arquitectura del Microfrontend

`rick_morty_remote` está construido como un **módulo independiente** que expone los componentes a través de un sistema de módulos federados (Module Federation).

Sus componentes principales son:

* **`CharacterSearcher`**: Un componente de UI para buscar personajes.
* **`CharacterCard`**: Muestra la información esencial de un personaje en un formato de tarjeta.
* **`CharactersFilters`**: Ofrece opciones para filtrar la lista de personajes.
* **`CharacterDetails`**: Un componente para mostrar información detallada de un personaje mediante un modal.

---

## Dependencias Usadas

Este proyecto utiliza las siguientes dependencias:

* **React**: Biblioteca principal para la construcción de la interfaz de usuario.
* **TypeScript**: Para un desarrollo más robusto y tipado estático.
* **Webpack (con Module Federation)**: Para empaquetar la aplicación y exponer los componentes como módulos federados.
* **React Bootstrap**: Para componentes de UI pre-estilizados.
* **@testing-library/react**: Para probar componentes React.
* **Jest**: El ejecutor de pruebas.

---

## Cómo Correr los Tests

Para ejecutar las pruebas unitarias y de componentes de este microfrontend, se debe usar el siguiente comando:

```bash
npm test
