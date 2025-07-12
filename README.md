
# 🎰 Casino Bingo - Sistema Profesional de Bingo en Vivo

Un sistema completo de bingo desarrollado con React, TypeScript y Tailwind CSS que simula la experiencia de un casino profesional.

## 📋 Descripción del Proyecto

Casino Bingo es una aplicación web completa que permite:
- **Juego automático en vivo**: Sorteo automático de bolas del 1 al 90 con intervalos configurables
- **Generación de cartones**: Creación de cartones individuales y tiras europeas
- **Administración**: Consulta del estado de cartones y verificación de premios
- **Interfaz profesional**: Diseño que simula la experiencia de un casino real

## 🎯 Características Principales

### 🎮 Juego Automático en Vivo
- Sorteo automático con intervalos configurables (5, 10, 20, 30 segundos)
- Tablero visual ampliado con todas las bolas (01-90)
- Historial completo de bolas sorteadas
- Controles de inicio automático, pausa, reanudación y nuevo juego
- Estado persistente al cambiar entre pestañas
- Opción de sorteo manual durante el juego

### 🎲 Generador de Cartones
- **Cartones Individuales**: Generación de cartones únicos con números aleatorios (hasta 20,000)
- **Tiras Europeas**: Conjuntos de 6 cartones que contienen todos los números del 1 al 90 (hasta 10,000 tiras)
- Números de serie únicos para cada cartón
- Formato de exportación profesional (PDF y HTML)

### 🔍 Sistema de Administración
- Búsqueda de cartones por número de serie
- Verificación automática de premios:
  - **Línea**: Completar una fila completa (5 números)
  - **Cartón Lleno**: Completar todos los números del cartón (15 números)
- Estado visual de números acertados
- Información detallada de cada cartón

## 🚀 Cómo Usar la Aplicación

### Instalación y Configuración

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

# 2. Navegar al directorio del proyecto
cd casino-bingo

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

### Uso Paso a Paso

#### 1. Generar Cartones
1. Ve a la pestaña "🎲 GENERADOR DE CARTONES"
2. Elige entre:
   - **Cartones Individuales**: Para cartones únicos (hasta 20,000)
   - **Tiras Europeas**: Para conjuntos de 6 cartones (hasta 10,000 tiras)
3. Selecciona la cantidad deseada
4. Haz clic en "GENERAR"
5. Los cartones se mostrarán con sus números de serie únicos
6. Exporta a PDF o HTML para impresión

#### 2. Iniciar un Juego Automático
1. Ve a la pestaña "🎯 JUEGO EN VIVO"
2. Configura el intervalo de tiempo (5, 10, 20 o 30 segundos)
3. Haz clic en "INICIAR JUEGO" para comenzar el sorteo automático
4. Usa "PAUSAR" y "REANUDAR" para controlar el juego
5. Usa "MANUAL" para sacar balotas manualmente cuando sea necesario
6. Observa el tablero ampliado y el historial de bolas
7. El estado del juego se mantiene al cambiar entre pestañas

#### 3. Verificar Premios
1. Ve a la pestaña "🔍 ADMINISTRACIÓN"
2. Ingresa el número de serie del cartón
3. Haz clic en "BUSCAR"
4. El sistema mostrará:
   - Estado actual del cartón
   - Números acertados
   - Premios obtenidos (Línea o Cartón Lleno)

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── BingoGame.tsx            # Juego principal con funcionalidad automática
│   ├── BingoGameboard.tsx       # Tablero ampliado de números
│   ├── BingoCardGenerator.tsx   # Generador de cartones
│   ├── BingoAdministration.tsx  # Sistema de administración
│   ├── DrawnBalls.tsx           # Historial de bolas
│   ├── GameControls.tsx         # Controles automáticos del juego
│   └── ui/                      # Componentes de interfaz
├── utils/                # Utilidades
│   └── bingoCardUtils.ts        # Lógica de generación de cartones
├── pages/                # Páginas principales
│   └── Index.tsx                # Página principal
└── hooks/                # Hooks personalizados
    └── use-toast.ts             # Sistema de notificaciones
```

### Archivos Importantes

- **`bingoCardUtils.ts`**: Contiene toda la lógica para generar cartones únicos, tiras europeas y gestionar números de serie
- **`BingoAdministration.tsx`**: Implementa el sistema de búsqueda y verificación de premios
- **`BingoGame.tsx`**: Coordina el flujo del juego automático y el sorteo de bolas
- **`GameControls.tsx`**: Maneja los controles automáticos, intervalos de tiempo y estado del juego
- **`Index.tsx`**: Página principal que organiza las pestañas del sistema

## 🎮 Reglas del Juego

### Cartones de Bingo
- Cada cartón tiene 3 filas y 9 columnas
- Cada fila contiene exactamente 5 números y 4 espacios vacíos
- Los números van del 1 al 90 distribuidos por columnas:
  - Columna 1: números 1-10
  - Columna 2: números 11-20
  - ... y así sucesivamente hasta la columna 9: números 81-90

### Condiciones de Victoria
1. **Línea**: Completar los 5 números de cualquier fila
2. **Cartón Lleno**: Completar todos los 15 números del cartón

### Tiras Europeas
- Conjuntos de 6 cartones
- Contienen todos los números del 1 al 90 distribuidos
- Cada número aparece exactamente una vez en la tira

## 🎛️ Funcionalidades del Juego Automático

### Intervalos de Tiempo Configurables
- **5 segundos**: Juego rápido
- **10 segundos**: Velocidad estándar (predeterminado)
- **20 segundos**: Juego moderado
- **30 segundos**: Juego lento

### Controles de Juego
- **INICIAR JUEGO**: Comienza el sorteo automático
- **PAUSAR**: Detiene temporalmente el sorteo automático
- **REANUDAR**: Continúa el sorteo automático desde donde se pausó
- **MANUAL**: Permite sacar balotas manualmente durante el juego
- **NUEVO JUEGO**: Reinicia completamente el juego

### Persistencia de Estado
- El juego mantiene su estado al cambiar entre pestañas
- Las bolas sorteadas se conservan
- Los temporizadores continúan funcionando en segundo plano

## 🛠 Tecnologías Utilizadas

- **React 18**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos y diseño responsivo
- **Shadcn/UI**: Componentes de interfaz
- **Vite**: Herramienta de construcción
- **Lucide React**: Iconografía

## 📱 Características Técnicas

- ✅ Diseño completamente responsivo
- ✅ Generación de cartones únicos con algoritmo anti-duplicados
- ✅ Sistema de números de serie con formato fecha
- ✅ Validación automática de premios
- ✅ Interfaz visual profesional tipo casino
- ✅ Notificaciones en tiempo real
- ✅ Historial completo de bolas sorteadas
- ✅ Juego automático con intervalos configurables
- ✅ Estado persistente entre pestañas
- ✅ Tablero de números ampliado para mejor visibilidad

## 🎨 Personalización

El sistema está diseñado para ser fácilmente personalizable:
- Colores y temas en `tailwind.config.ts`
- Componentes modulares y reutilizables
- Lógica de negocio separada en utilidades
- Intervalos de tiempo configurables

## 🤝 Contribuir

Para contribuir al proyecto:
1. Haz fork del repositorio
2. Crea una rama para tu funcionalidad
3. Realiza los cambios necesarios
4. Envía un pull request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## 🚀 Despliegue

### Usando Lovable
1. Abre el proyecto en [Lovable](https://lovable.dev)
2. Haz clic en "Share" → "Publish"
3. Tu aplicación estará disponible en línea

### Dominio Personalizado
Para conectar un dominio personalizado:
1. Ve a Configuración del Proyecto → Dominios
2. Haz clic en "Conectar Dominio"
3. Sigue las instrucciones de configuración

## 📞 Soporte

Para soporte y preguntas:
- Revisa la documentación en el código
- Consulta los ejemplos de uso
- Verifica la consola del navegador para errores

---

**¡Disfruta jugando Casino Bingo con su nuevo sistema automático!** 🎰🎯🏆

### Novedades de la Versión Actual

- **🔄 Juego Automático**: Sorteo automático con intervalos configurables
- **📊 Tablero Ampliado**: Mejor visualización de los números 01-90
- **⏱️ Control de Tiempo**: Selección de intervalos de 5, 10, 20 y 30 segundos
- **🎮 Controles Avanzados**: Inicio, pausa, reanudación y nuevo juego
- **💾 Estado Persistente**: El juego no se reinicia al cambiar pestañas
- **📈 Límites Aumentados**: Hasta 10,000 tiras europeas
- **🎯 Interfaz Optimizada**: Eliminación de elementos redundantes para mejor experiencia
