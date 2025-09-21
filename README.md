# Session Conditional Card

Tarjeta personalizada para Lovelace que permite mostrar u ocultar contenido según condiciones locales del navegador y del usuario de sesión.

## Características

- Condiciones por `user_id` de sesión.
- Condiciones por `localStorage` y `sessionStorage`.
- Evaluación de expresiones JavaScript.
- No requiere entidades globales en Home Assistant.

## Ejemplo de uso

```yaml
type: custom:session-conditional-card
conditions:
  - type: user
    id: 1234567890abcdef
  - type: localStorage
    key: modo_vista
    value: Avanzado
content: |
  <p>¡Hola! Esta tarjeta solo se muestra si estás en modo avanzado y eres el usuario correcto.</p>
