# Sistema de Diseño Agnóstico

Este sistema de diseño está completamente desacoplado de Angular Material, permitiendo cambiar a otro framework UI sin afectar tus componentes.

## Estructura

```
src/styles/
├── _material-abstractions.scss  ← Todas las dependencias de Material
├── _components-abstractions.scss ← Clases agnósticas del sistema
├── _index.scss                   ← Importa ambas abstracciones
└── ... (resto de estilos)
```

## Cómo Funciona

### 1. Abstracciones de Material (`_material-abstractions.scss`)

Encapsula **TODOS** los estilos específicos de Material Design. Si cambias a otro framework:
- Solo modifica este archivo
- El resto del código sigue funcionando

**Ejemplo:**
```scss
// Antes (acoplado a Material):
::ng-deep .mat-mdc-select-value-text {
  padding: 10px;
}

// Ahora (abstracto):
.select-input__value {
  ::ng-deep(.mat-mdc-select-value-text) {
    padding: 10px;
  }
}
```

### 2. Abstracciones de Componentes (`_components-abstractions.scss`)

Clases agnósticas que definen la interfaz del sistema sin depender de ningún framework:

- `.field-select` - Select agnóstico
- `.search-input` - Input de búsqueda
- `.table` - Tabla agnóstica
- `.chip` - Chip/Tag agnóstico
- `.dropdown-menu` - Menú desplegable
- `.form-group` - Grupo de formulario
- Y muchas más...

## Cómo Usar

### Enfoque 1: @extend (Reutilizar clases)

```scss
// En tu componente
.my-select {
  @extend .field-select;
  @extend .field-select--search; // variante
}
```

### Enfoque 2: Mixins (Reutilizar estilos)

```scss
// Crear un mixin en el componente
.my-input {
  @include form-input-styles;
  // ... estilos adicionales
}
```

### Enfoque 3: Variables CSS

```scss
:root {
  --select-padding: 10px;
  --select-border-radius: 4px;
}

.my-select {
  padding: var(--select-padding);
  border-radius: var(--select-border-radius);
}
```

## Migrar de Material a Otro Framework

### Paso 1: Mantener la interfaz agnóstica
Los componentes usan las clases agnósticas:

```html
<select class="field-select field-select--search">
  <option>Opción 1</option>
</select>
```

### Paso 2: Cambiar `_material-abstractions.scss`

**Antes (Material):**
```scss
.select-input__value {
  ::ng-deep(.mat-mdc-select-value-text) {
    padding: 10px;
  }
}
```

**Después (Otro framework, ej: Bootstrap):**
```scss
.select-input__value {
  .form-select {
    padding: 10px;
  }
}
```

### Paso 3: Actualizar imports en componentes

Cambiar de:
```scss
@use 'src/styles/material-abstractions' as mat;
```

A:
```scss
@use 'src/styles/bootstrap-abstractions' as bootstrap;
```

## Clases Disponibles

### Selects
- `.field-select` - Select base
- `.field-select__input` - Input del select
- `.field-select__label` - Label
- `.field-select__error` - Mensaje de error
- `.field-select--search` - Variante con búsqueda

### Tablas
- `.table` - Tabla base
- `.table__header-cell` - Celda de encabezado
- `.table__cell` - Celda normal
- `.table__row` - Fila

### Chips
- `.chip` - Chip base
- `.chip--primary` - Variante primaria
- `.chip--success`, `.chip--warning`, `.chip--error` - Variantes de estado

### Menús
- `.dropdown-menu` - Menú desplegable
- `.dropdown-menu__item` - Item del menú
- `.dropdown-menu__divider` - Separador

### Formularios
- `.form-group` - Grupo de formulario
- `.form-group__label` - Label
- `.form-group__input` - Input
- `.form-group__error` - Error
- `.form-group__help` - Texto de ayuda

## Variables CSS del Sistema

Personaliza el diseño con variables:

```css
:root {
  /* Colores */
  --color-primary: #3399ff;
  --color-text: #000;
  --color-background: #fff;
  --color-border: #e0e0e0;
  
  /* Espaciado */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  
  /* Bordes */
  --radius-md: 4px;
  
  /* Sombras */
  --shadow-md: 0 2px 8px rgba(0,0,0,0.1);
}
```

## Beneficios

✅ **Desacoplado**: Sin dependencias de Material  
✅ **Reutilizable**: Clases agnósticas  
✅ **Escalable**: Fácil de mantener y extender  
✅ **Flexible**: Cambiar frameworks sin reescribir código  
✅ **Documentado**: Clases claras y auto-explicativas  

## Ejemplos de Componentes Refactorizados

### select-custom-search
Antes: Lleno de `.mat-mdc-*`  
Ahora: Usa `.field-select`, `.search-input`, `.chip`

### table-dinamic
Antes: Lleno de `.mat-mdc-*`  
Ahora: Usa `.data-table`, `.chip`, `.dropdown-menu`

### button
Antes: Genérico  
Ahora: Importa abstracciones para iconos de Material

## Próximos Pasos

1. ✅ Crear abstracciones de Material
2. ✅ Refactorizar componentes principales
3. ⏳ Crear abstracciones para otros frameworks (Bootstrap, Tailwind, etc.)
4. ⏳ Documentar variantes de componentes
5. ⏳ Crear componentes adicionales agnósticos

---

**Nota**: El sistema aún usa Material Design internamente (en `_material-abstractions.scss`), pero puedes cambiar estos estilos sin tocar el código de tus componentes.
