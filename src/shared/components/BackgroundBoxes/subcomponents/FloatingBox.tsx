import { useEffect, type ComponentType, type SVGProps } from 'react'
import { m, useMotionValue, useSpring } from 'motion/react'
import type { MotionValue } from 'motion/react'
import type { BoxData } from '../types'
import { cn } from '@/shared/utils/cn'
import { LAYOUT } from '@/shared/constants/tokens'

/** Props del componente FloatingBox: datos de la caja y valores de mouse para parallax */
interface FloatingBoxProps {
  box: BoxData
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

/**
 * Una caja flotante con icono: posición en %, animación de entrada, flotación
 * infinita y desplazamiento parallax según la posición del mouse.
 *
 * @param props - box (BoxData), mouseX y mouseY (MotionValue)
 * @returns {JSX.Element} Ítem de lista animado con icono centrado.
 */
export function FloatingBox({ box, mouseX, mouseY }: FloatingBoxProps) {
  const stiffness = 50 + Math.abs(box.depth) * 30
  const pxVal = useMotionValue(0)
  const pyVal = useMotionValue(0)
  const px = useSpring(pxVal, { stiffness, damping: 22 })
  const py = useSpring(pyVal, { stiffness, damping: 22 })

  useEffect(() => {
    const strength = 22 * box.depth
    const u1 = mouseX.on('change', (v: number) => pxVal.set(v * strength))
    const u2 = mouseY.on('change', (v: number) => pyVal.set(v * strength))
    return () => {
      u1()
      u2()
    }
  }, [mouseX, mouseY, box.depth, pxVal, pyVal])

  const Icon = box.Icon as ComponentType<SVGProps<SVGSVGElement>>

  return (
    <m.li
      className="absolute list-none"
      aria-hidden="true"
      style={{
        left: `${box.x}%`,
        top: `${box.y}%`,
        x: px,
        y: py,
        width: box.size,
        height: box.size,
      }}
      initial={{ opacity: 0, translateX: box.fromLeft ? -100 : 100 }}
      animate={{ opacity: box.opacity, translateX: 0 }}
      transition={{
        opacity: { duration: 0.5, delay: 0.1 + box.id * 0.035 },
        translateX: {
          duration: 1,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.1 + box.id * 0.035,
        },
      }}
    >
      <m.div
        className="h-full w-full"
        animate={{ y: [0, -box.floatAmp, 0] }}
        transition={{
          duration: box.floatDur,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 2 + box.floatDelay,
        }}
      >
        <div
          className={cn(
            'bg-bg-weak',
            LAYOUT.flex.center,
            'h-full w-full rounded-xl select-none md:rounded-2xl',
            'shadow-elevation-lg'
          )}
        >
          <Icon
            aria-hidden="true"
            className="h-[60%] w-[60%] shrink-0 sm:h-[55%] sm:w-[55%] md:h-[50%] md:w-[50%]"
          />
        </div>
      </m.div>
    </m.li>
  )
}
