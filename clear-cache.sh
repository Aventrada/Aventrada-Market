#!/bin/bash
echo "Limpiando caché de Next.js..."
rm -rf .next
rm -rf node_modules/.cache
echo "Caché limpiada. Reiniciando servidor de desarrollo..."
npm run dev
