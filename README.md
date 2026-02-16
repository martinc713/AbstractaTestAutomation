Demoblaze & Petstore Playwright TypeScript - Automation Framework
Framework completo de automatización de pruebas end-to-end (E2E) y pruebas de API, construido con Playwright y TypeScript. Incluye:

Automatización de la tienda Demoblaze (web scraping, compra, carrito, autenticación)
Pruebas de API sobre Petstore (https://petstore.swagger.io)

## 📋 Descripción del Proyecto

Este framework automatiza pruebas críticas de una tienda de electrónica:
- **Scraping de productos**: Extrae información de las primeras 2 páginas de productos (nombre, precio, link).
- **Compra de productos**: Automatiza el flujo completo de compra con validación de confirmación.
- **Gestión del carrito**: Prueba agregar 2 artículos y eliminar uno, verificando integridad.
- **Autenticación**: Crea una cuenta, hace login y verifica el mensaje de bienvenida.

Además probamos la Petstore API: Validando escenarios de negocio sobre una API REST pública, generando y verificando datos sintéticos.

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
├── pages/                  # Page Objects para Demoblaze
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── AuthPage.ts
├── tests/
│   ├── scraping.spec.ts          # Scraping de productos Demoblaze
│   ├── purchase.spec.ts          # Flujo de compra Demoblaze
│   ├── add_remove_cart.spec.ts   # Carrito Demoblaze
│   ├── signup_login.spec.ts      # Sign Up y Login Demoblaze
│   └── api/
│       └── petstore.spec.ts      # Pruebas API Petstore
├── apis/
│   └── PetStoreAPI.ts            # Cliente API Petstore
├── utils/
│   ├── fileWriter.ts             # Utilidad para escribir productos
│   └── petData.ts                # Helpers de datos Petstore
├── playwright.config.ts          # Configuración Playwright
├── tsconfig.json                 # Configuración TypeScript
├── package.json                  # Dependencias
├── README.md                     # Esta guía
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

### Test específicos
```bash
npx playwright test tests/scraping.spec.ts
npx playwright test tests/purchase.spec.ts
npx playwright test tests/add_remove_cart.spec.ts
npx playwright test tests/signup_login.spec.ts
npx playwright test tests/api/petstore.spec.ts
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

Petstore API
1. Crear Mascotas y Consultar

- Crea 10 mascotas (5 available, 4 pending, 1 sold).
- Consulta la mascota sold y validando su status.
- Listar y Ordenar Mascotas

2. Lista 5 mascotas available.
- Crea una orden por cada una, validando la respuesta.

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

## **Pruebas de API (Petstore)**

Se incluyen pruebas API que validan funcionalidades del servicio de ejemplo Petstore (https://petstore.swagger.io). Estas pruebas están en `tests/api/petstore.spec.ts` y usan el cliente en `apis/PetStoreAPI.ts` y los helpers en `utils/petData.ts`.

- **Part 1** (`tests/api/petstore.spec.ts` - test "Part1: create 10 pets and get sold pet"): crea 10 mascotas (5 `available`, 4 `pending`, 1 `sold`), guarda los ids y consulta la mascota `sold` comprobando que su `status` es `sold`.
- **Part 2** (`tests/api/petstore.spec.ts` - test "Part2: list available and create orders for 5 pets"): lista mascotas `available`, selecciona 5 y crea una orden por cada una; valida respuestas y campos devueltos.

Cómo ejecutar las pruebas API:

```bash
# Ejecutar todas las pruebas API
npx playwright test tests/api/petstore.spec.ts

# Ejecutar solo Part1
npx playwright test tests/api/petstore.spec.ts -g "Part1: create 10 pets and get sold pet"

# Ejecutar solo Part2
npx playwright test tests/api/petstore.spec.ts -g "Part2: list available and create orders for 5 pets"
```

Ver logs y verificar datos creados:

- Los tests imprimen logs identificables:
   - `CREATED_PET <id> <name> <status>` al crear cada mascota.
   - `CREATED_ORDER <id> <petId> <status>` al crear órdenes.

- En PowerShell filtra la salida del test para ver los IDs:

```powershell
npx playwright test tests/api/petstore.spec.ts -g "Part1: create 10 pets and get sold pet" 2>&1 | Select-String -Pattern "CREATED_PET"
npx playwright test tests/api/petstore.spec.ts -g "Part2: list available and create orders for 5 pets" 2>&1 | Select-String -Pattern "CREATED_ORDER"
```

- Alternativa: usar Swagger UI (https://petstore.swagger.io) → `pet` → `GET /pet/findByStatus` o `GET /pet/{petId}` y buscar `name` con prefijo `available-`, `pending-` o `sold-` (los tests prefijan nombres para facilitar la identificación).

Notas operativas:

- Las órdenes en el servidor de prueba aceptan `orderId` válidos entre 1 y 10 para ciertos endpoints; los helpers garantizan IDs únicos en ese rango durante la ejecución de la suite para evitar colisiones.
- Si necesitas limpieza, puedes añadir llamadas `DELETE /v2/pet/{petId}` o `DELETE /v2/store/order/{orderId}` al final de los tests o ejecutar un script de limpieza manual desde Swagger/Curl.
- Los tests usan datos sintéticos; no emplees datos personales reales.

Ficheros clave:

- Cliente API: `apis/PetStoreAPI.ts`
- Helpers de datos: `utils/petData.ts`
- Tests: `tests/api/petstore.spec.ts`
- README específico: `README_API.md`


