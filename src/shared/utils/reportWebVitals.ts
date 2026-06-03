/**
 * Utilidad `ReportWebVitals` en la capa compartida del proyecto.
 *
 * @fileoverview Funciones puras o helpers sin acoplar a una sección concreta del portfolio.
 * @remarks Preferir pruebas unitarias directas; evitar importar React salvo que el módulo lo requiera.
 */

import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'

import type { Metric } from 'web-vitals'

/**
 * Punto único para registrar Core Web Vitals (CLS, INP, LCP, FCP, TTFB).
 *
 * Por defecto: en desarrollo registra **`console.warn`** con nombre y valor para depuración;
 * en producción no imprime hasta que enlaces **`onReport`** a analíticas o ingestión propia.
 *
 * @param onReport - Callback opcional (`sendBeacon`, dataLayer, Datadog…).
 *
 * @module shared/utils/reportWebVitals
 */
export function reportWebVitals(onReport?: (metric: Metric) => void): void {
  const report = onReport ?? defaultReportHandler

  onCLS(report)
  onINP(report)
  onLCP(report)
  onFCP(report)
  onTTFB(report)
}

function defaultReportHandler(metric: Metric): void {
  if (!import.meta.env.DEV) {
    return
  }

  console.warn('[web-vitals]', metric.name, {
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  })
}
