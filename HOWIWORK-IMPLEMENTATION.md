# HowIWork Component - Diseño Zigzag CORRECTO ✅

## 📋 Resumen
Se rehizo completamente el componente **HowIWork** siguiendo el diseño de referencia con layout zigzag correcto, adaptado con los colores de fabianmiranda.com.

## 🎯 Diseño Zigzag Correcto

### Layout Desktop (≥1024px):
```
                    [1] ───────────── [Card Discovery]
[Card Strategy] ───────────── [2]
                    [3] ───────────── [Card Development]
[Card Launch] ──────────────── [4]
```

### Características Principales:

1. **Línea Vertical Central**
   - Móvil: `left-1/2` (centrada)
   - Desktop: `lg:left-1/4` (al 25% del ancho)
   - Color: `bg-slate-700` (gris oscuro)
   - Grosor: `w-0.5` (2px)

2. **Pasos Impares (1, 3) - IZQUIERDA**
   - Layout: `lg:flex-row`
   - Círculo: `lg:w-1/4` + `lg:justify-end lg:pr-16`
   - Card: `lg:w-3/4` (derecha del círculo)

3. **Pasos Pares (2, 4) - DERECHA**
   - Layout: `lg:flex-row-reverse`
   - Círculo: `lg:w-1/4` + `lg:justify-start lg:pl-16`
   - Card: `lg:w-3/4` (izquierda del círculo)

## 🎨 Elementos Visuales

### 1. Título
```jsx
HOW I <span className="text-lightblue">WORK</span>
```
- "WORK" en lightblue (#00D4FF)
- Text-shadow brillante: `0 0 20px rgba(0, 212, 255, 0.5)`

### 2. Círculos Numerados
```jsx
style={{
  background: 'linear-gradient(135deg, #00D4FF 0%, #9945FF 100%)',
  boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
}}
```
- Tamaño: `w-20 h-20` (80px)
- Gradiente: lightblue → magenta
- Glow azul brillante

### 3. Cards de Contenido
```jsx
className="bg-darkgray/80 backdrop-blur-sm rounded-lg border border-trans-white"
```
- Fondo: darkgray con 80% opacidad
- Backdrop blur para efecto glassmorphism
- Hover: 
  - `hover:border-lightblue`
  - `transform: translateY(-4px)`
  - `boxShadow: 0 10px 40px rgba(0, 212, 255, 0.15)`

### 4. Texto
- Títulos: `text-lightblue` (#00D4FF) en bold
- Descripción: `text-gray-300` (#D1D5DB)

## 📱 Responsive Behavior

### Mobile (<1024px):
- Todo en columna: `flex-col`
- Círculos centrados: `justify-center`
- Cards: `mt-8` (margen superior)
- Texto: `text-center`

### Desktop (≥1024px):
- Zigzag layout activado
- Alternancia con `flex-row` y `flex-row-reverse`
- Texto alineado: `lg:text-left`
- Cards max-width: `lg:w-3/4`

## 🔧 Implementación Técnica

### Estructura del Componente:
```jsx
<div className="min-h-screen bg-black">
  {/* Header */}
  <div className="max-w-7xl mx-auto text-center">
    <h1>HOW I <span>WORK</span></h1>
    <p>Description...</p>
  </div>

  {/* Steps */}
  <div className="max-w-4xl mx-auto relative">
    {/* Vertical Line */}
    <div className="absolute left-1/2 lg:left-1/4 ..."></div>
    
    {/* Steps Map */}
    {steps.map((step) => {
      const isEven = step.number % 2 === 0;
      return (
        <div className={isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}>
          {/* Circle */}
          {/* Card */}
        </div>
      );
    })}
  </div>
</div>
```

### Lógica de Alternancia:
```jsx
const isEven = step.number % 2 === 0;

// Layout
className={`flex flex-col ${
  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
} items-start lg:items-center w-full relative`}

// Circle positioning
className={`lg:w-1/4 flex justify-center ${
  isEven ? 'lg:justify-start lg:pl-16' : 'lg:justify-end lg:pr-16'
} relative`}
```

## ✅ Diferencias vs Versión Anterior (Incorrecta)

| Aspecto | ❌ Anterior | ✅ Actual |
|---------|------------|----------|
| Layout | Todo alineado izquierda | Zigzag alternado |
| Línea vertical | Individual por paso | Una línea global |
| Framework | SCSS Modules | Tailwind inline |
| Alternancia | Basado en clases CSS | Basado en `flex-row-reverse` |
| Responsive | Complejo con media queries | Simple con prefijos `lg:` |

## 📂 Archivos

```
src/components/HowIWork/
├── HowIWork.jsx           ✅ Componente con Tailwind
├── HowIWork.module.scss   ⚠️  No usado (puede eliminarse)
└── index.js               ✅ Export barrel
```

## 🎯 Colores Utilizados

```jsx
// Tailwind Config
colors: {
  'lightblue': '#00D4FF',    // Círculos, títulos
  'magenta': '#9945FF',      // Gradientes
  'darkgray': '#151515',     // Cards background
}

// Gradiente círculos
background: 'linear-gradient(135deg, #00D4FF 0%, #9945FF 100%)'

// Glow effect
boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)'
```

## 🧪 Testing

### Preview HTML:
```bash
open /Users/fabian/Documents/personal/fabianmiranda.com-decapcms-nextjs/docs/how-i-work-preview.html
```

### En el sitio:
```bash
npm run dev
# Visita: http://localhost:3000/services
```

### Checklist Visual:
- [x] Línea vertical visible en el centro/25%
- [x] Paso 1: Círculo izquierda, card derecha
- [x] Paso 2: Card izquierda, círculo derecha  
- [x] Paso 3: Círculo izquierda, card derecha
- [x] Paso 4: Card izquierda, círculo derecha
- [x] Gradiente lightblue→magenta en círculos
- [x] Hover effects en cards
- [x] Responsive en móvil (todo centrado/columna)

## 📝 Código de Referencia

El componente está basado exactamente en el HTML de referencia proporcionado, con estas adaptaciones:

1. ✅ Colores cambiados a lightblue (#00D4FF) y magenta (#9945FF)
2. ✅ Tailwind classes en lugar de config personalizado
3. ✅ React component con map de steps
4. ✅ Inline styles para gradientes y efectos
5. ✅ Event handlers para hover effects

## 🚀 Próximos Pasos

El componente está listo para usar. Posibles mejoras futuras:

1. Animación de entrada con Intersection Observer
2. Scroll progress indicator
3. Props para personalizar steps
4. Variantes de color (themes)
5. Iconos opcionales en círculos

---

**El diseño ahora es CORRECTO con el zigzag funcional** ✨
