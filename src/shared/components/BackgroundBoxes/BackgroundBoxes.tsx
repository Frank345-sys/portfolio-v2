import { useEffect, useState } from 'react'
import type { BoxData } from './types'
import { generateBoxes } from './hooks/useBackgroundBoxes'
import { useParallaxMouse } from './hooks/useParallaxMouse'
import { FloatingBox } from './subcomponents/FloatingBox'

export interface BackgroundBoxesProps {
  children?: React.ReactNode
}

export function BackgroundBoxes({ children }: BackgroundBoxesProps) {
  const { mouseX, mouseY } = useParallaxMouse()
  const [boxes, setBoxes] = useState<BoxData[]>(() =>
    typeof window !== 'undefined'
      ? generateBoxes(window.innerWidth)
      : generateBoxes(1440)
  )

  useEffect(() => {
    const onResize = () => {
      setBoxes(generateBoxes(window.innerWidth))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="relative h-screen max-h-[800px] min-h-[640px] w-full overflow-hidden">
      <ul className="absolute inset-0">
        {boxes.map((box: BoxData) => (
          <FloatingBox key={box.id} box={box} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </ul>
      <div
        className="relative flex h-full flex-col items-center justify-center backdrop-blur-[1px]"
        data-testid="background-boxes-content"
      >
        {children}
      </div>
    </div>
  )
}
