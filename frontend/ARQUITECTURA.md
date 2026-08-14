# PIPERS Admin - Arquitectura

## Objetivo

Este proyecto está desarrollado con Angular 20 utilizando Standalone Components,
Signals y Angular Material como base tecnológica.

El objetivo principal es construir un sistema modular, reutilizable y fácil de
mantener, donde Angular Material sea un detalle de implementación y no forme
parte de la interfaz pública de la aplicación.

---

# Principios

## Reutilización

Los componentes reutilizables se desarrollan una sola vez y viven dentro de
`shared/components`.

Ejemplos:

- Button
- Input
- Select
- Card
- Table
- Dialog

Las pantallas nunca utilizarán directamente componentes de Angular Material.

Ejemplo:

✔ Correcto

<app-button></app-button>

❌ Incorrecto

<button mat-flat-button></button>

---

## Separación de responsabilidades

La aplicación se divide en tres grandes áreas:

### Core

Contiene elementos únicos de la aplicación.

Ejemplos:

- Layout
- Guards
- Interceptors
- Servicios globales
- Configuración

### Shared

Contiene todo aquello que puede reutilizarse en cualquier módulo.

- Componentes
- Pipes
- Directivas
- Interfaces
- Modelos
- Utilidades

### Features

Contiene únicamente lógica de negocio.

Cada carpeta representa un módulo funcional.

Ejemplos:

- Clientes
- Presupuestos
- Trabajos
- Productos
- Usuarios

---

# Diseño

Toda la identidad visual se define mediante Design Tokens.

Nunca se utilizarán colores o tamaños hardcodeados dentro de los componentes.

Ejemplo:

✔ Correcto

background: var(--color-primary);

❌ Incorrecto

background: #f97316;

---

# Angular Material

Angular Material se utilizará únicamente como implementación interna.

Los módulos de negocio nunca dependerán directamente de Material.

Si en el futuro se decide cambiar la librería visual, el impacto será mínimo.

---

# Objetivo final

Construir una plataforma escalable, consistente y fácil de mantener,
basada en componentes reutilizables y una identidad visual propia.