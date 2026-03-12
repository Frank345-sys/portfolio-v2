import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import type { MotionValue } from 'motion/react'
import type { BoxData } from '../types'
import { cn } from '@/shared/utils/cn'
import { SHADOW } from '@/shared/constants/tokens'

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

  const Icon = box.Icon

  return (
    <motion.li
      className="absolute list-none"
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
      <motion.div
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
            'flex h-full w-full items-center justify-center rounded-2xl border backdrop-blur-sm select-none',
            'bg-floating-box-bg border-floating-box-border',
            SHADOW.xlg
          )}
        >
          <Icon />
        </div>
      </motion.div>
    </motion.li>
  )
}
