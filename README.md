
# 🎰 Casino Bingo - Sistema Profesional de Bingo en Vivo

Un sistema completo de bingo desarrollado con React, TypeScript y Tailwind CSS que simula la experiencia de un casino profesional.

## 📋 Descripción del Proyecto

Casino Bingo es una aplicación web completa que permite:
- **Juego en vivo**: Sorteo automático de bolas del 1 al 90 con interfaz visual
- **Generación de cartones**: Creación de cartones individuales y tiras europeas
- **Administración**: Consulta del estado de cartones y verificación de premios
- **Interfaz profesional**: Diseño que simula la experiencia de un casino real

## 🎯 Características Principales

### 🎮 Juego en Vivo
- Sorteo aleatorio de bolas del 1 al 90
- Tablero visual con todas las bolas
- Historial completo de bolas sorteadas
- Controles de inicio, pausa y reinicio de juego

### 🎲 Generador de Cartones
- **Cartones Individuales**: Generación de cartones únicos con números aleatorios
- **Tiras Europeas**: Conjuntos de 6 cartones que contienen todos los números del 1 al 90
- Números de serie únicos para cada cartón
- Formato de exportación profesional

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
   - **Cartones Individuales**: Para cartones únicos
   - **Tiras Europeas**: Para conjuntos de 6 cartones
3. Selecciona la cantidad deseada
4. Haz clic en "GENERAR"
5. Los cartones se mostrarán con sus números de serie únicos

#### 2. Iniciar un Juego
1. Ve a la pestaña "🎯 JUEGO EN VIVO"
2. Haz clic en "INICIAR JUEGO"
3. Usa "SACAR BOLA" para sortear números
4. Observa el tablero y el historial de bolas

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
│   ├── BingoGame.tsx            # Juego principal
│   ├── BingoGameboard.tsx       # Tablero de números
│   ├── BingoCardGenerator.tsx   # Generador de cartones
│   ├── BingoAdministration.tsx  # Sistema de administración
│   ├── BallDisplay.tsx          # Visualización de bola actual
│   ├── DrawnBalls.tsx           # Historial de bolas
│   ├── GameControls.tsx         # Controles del juego
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
- **`BingoGame.tsx`**: Coordina el flujo del juego y el sorteo de bolas
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

## 🎨 Personalización

El sistema está diseñado para ser fácilmente personalizable:
- Colores y temas en `tailwind.config.ts`
- Componentes modulares y reutilizables
- Lógica de negocio separada en utilidades

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

**¡Disfruta jugando Casino Bingo!** 🎰🎯🏆
