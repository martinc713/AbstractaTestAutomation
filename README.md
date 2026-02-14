# Demoblaze Playwright TypeScript - Automation Framework

Un framework robusto de automatización de pruebas end-to-end (E2E) construido con **Playwright** y **TypeScript** para probar la tienda de demostración Demoblaze (https://www.demoblaze.com).

## 📋 Descripción del Proyecto

Este framework automatiza pruebas críticas de una tienda de electrónica:
- **Scraping de productos**: Extrae información de las primeras 2 páginas de productos (nombre, precio, link).
- **Compra de productos**: Automatiza el flujo completo de compra con validación de confirmación.
- **Gestión del carrito**: Prueba agregar 2 artículos y eliminar uno, verificando integridad.
- **Autenticación**: Crea una cuenta, hace login y verifica el mensaje de bienvenida.

## 🏗️ Arquitectura - Page Objects

El framework implementa el patrón **Page Object Model** para máxima mantenibilidad:

- **`pages/BasePage.ts`**: Clase base con utilidades compartidas.
- **`pages/HomePage.ts`**: Gestiona la página principal, listado de productos y navegación.
- **`pages/ProductPage.ts`**: Acciones sobre la página de un producto (agregar al carrito).
- **`pages/CartPage.ts`**: Maneja el carrito (ver items, eliminar, hacer pedido).
- **`pages/AuthPage.ts`**: Signup, login y verificación de autenticación.

## 📁 Estructura de Archivos

```
demoblaze-playwright-ts/
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── AuthPage.ts
├── tests/
│   ├── scraping.spec.ts          # Extrae productos de 2 páginas
│   ├── purchase.spec.ts          # Compra un producto
│   ├── add_remove_cart.spec.ts   # Agrega 2 items y elimina 1
│   └── signup_login.spec.ts      # Signup, login y verifica welcome
├── utils/
│   └── fileWriter.ts             # Escribe productos a archivo .txt
├── playwright.config.ts          # Configuración de Playwright
├── tsconfig.json                 # Configuración de TypeScript
├── package.json                  # Dependencias
└── README.md
```

## 🚀 Instalación y Configuración

### Requisitos
- Node.js 16+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/demoblaze-playwright-ts.git
   cd demoblaze-playwright-ts
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Instalar navegadores de Playwright (primera ejecución)**
   ```bash
   npx playwright install
   ```

## ✅ Ejecutar Pruebas

### Todos los tests
```bash
npm run test
```

### Test específico
```bash
npx playwright test tests/scraping.spec.ts
npx playwright test tests/purchase.spec.ts
npx playwright test tests/add_remove_cart.spec.ts
npx playwright test tests/signup_login.spec.ts
```

### Con modo headed (ver navegador)
```bash
npx playwright test --headed
```

### Ver reporte HTML
```bash
npm run test
npx playwright show-report
```

## 📊 Detalles de Pruebas

### 1. **Scraping de Productos** (`scraping.spec.ts`)
- Navega a la página principal.
- Extrae nombre, precio y link de todos los productos visibles (primera página).
- Pulsa "Next" y extrae la segunda página.
- Genera `products.txt` con URLs absolutas (`https://www.demoblaze.com/prod.html?idp_=N`).

**Salida**: Archivo `products.txt` con información de productos para análisis competitivo.

### 2. **Compra de Producto** (`purchase.spec.ts`)
- Navega a inicio y selecciona el primer producto.
- Agrega al carrito (maneja diálogo de confirmación).
- Navega al carrito.
- Rellena formulario de compra con datos de prueba.
- Verifica mensaje de confirmación ("Thank you").

**Validación**: Aserciona que el popup de éxito contiene "Thank you".

### 3. **Agregar y Eliminar del Carrito** (`add_remove_cart.spec.ts`)
- Agrega dos productos distintos al carrito.
- Navega al carrito.
- Verifica que ambos están presentes.
- Elimina el primero.
- Verifica que solo queda uno y que el eliminado no aparece.

**Validación**: Cuenta de items y búsqueda de nombre del producto eliminado.

### 4. **Signup, Login y Bienvenida** (`signup_login.spec.ts`)
- Crea una cuenta con username único (basado en timestamp).
- Hace logout e intenta login con las credenciales creadas.
- Verifica que aparece el mensaje "Welcome <username>" en la esquina superior derecha.

**Validación**: Presencia y contenido de `#nameofuser`.

## 🔧 Tecnologías Utilizadas

- **Playwright**: Framework de automatización E2E
- **TypeScript**: Tipado estático
- **Node.js / npm**: Runtime y gestor de paquetes

## 📝 Buenas Prácticas Implementadas

✅ **Page Object Model (POM)**: Encapsulación de selectores y acciones por página.
✅ **Esperas inteligentes**: Uso de `waitForSelector`, `waitForURL`, `waitForFunction` en lugar de sleeps.
✅ **Manejo de diálogos**: Captura y aceptación de alertas/popups.
✅ **Selectores robustos**: Uso de selectores específicos para evitar ambigüedad en strict mode.
✅ **TypeScript**: Tipado fuerte para evitar errores.
✅ **Configuración centralizada**: `playwright.config.ts` con baseURL y opciones globales.

