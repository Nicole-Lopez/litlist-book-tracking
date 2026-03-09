import { useEffect, useEffectEvent, useRef } from 'react'
import type { RefObject } from 'react'

export function useOutsideAlerter<ElementRefT extends HTMLElement>(
    onOutsideClick: () => void,
): RefObject<ElementRefT | null> {
    const elementRef = useRef<ElementRefT>(null)
    const onOutside = useEffectEvent(onOutsideClick)

    useEffect(() => {
        const handler = (event: PointerEvent): void => {
            const element = elementRef?.current
            if (!element || event.composedPath().includes(element)) return

            onOutside()
        }

        document.addEventListener('pointerdown', handler)

        return () => {
            document.removeEventListener('pointerdown', handler)
        }
    }, [])

    return elementRef
}
