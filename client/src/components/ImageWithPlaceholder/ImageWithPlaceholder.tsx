import { useState, useEffect, useRef } from 'react'
import './ImageWithPlaceholder.scss'
import type { ImgHTMLAttributes, Dispatch, SetStateAction, ReactNode } from 'react'

export type ImageWithPlaceholderProps = Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    'ref' | 'onLoad'
> & {
    containerClassName?: string
    isLazy?: boolean
}

export default function ImageWithPlaceholder({
    isLazy = true,
    containerClassName = '',
    ...imgAttributes
}: ImageWithPlaceholderProps): ReactNode {
    const [isLoaded, setIsLoaded] = useState(false)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const imgElement = imageRef.current

        if (!imgElement) return

        setIsLoaded(imgElement.complete && imgElement.naturalWidth > 0)
    }, [imgAttributes.src])

    return (
        <div
            className={`image-with-placeholder ${
                isLoaded
                    ? 'image-with-placeholder--load'
                    : 'image-with-placeholder--no-load'
            } ${containerClassName}`}
        >
            {isLazy ? (
                <LazyImage
                    isLoaded={isLoaded}
                    setIsLoaded={setIsLoaded}
                    {...imgAttributes}
                />
            ) : (
                <img
                    {...imgAttributes}
                    ref={imageRef}
                    onLoad={() => {
                        setIsLoaded(true)
                    }}
                />
            )}
        </div>
    )
}

type LazyImageProps = Omit<ImageWithPlaceholderProps, 'classNameContainer' | 'isLazy'> & {
    isLoaded: boolean
    setIsLoaded: Dispatch<SetStateAction<boolean>>
}

function LazyImage({
    isLoaded,
    setIsLoaded,
    src,
    ...imgAttributes
}: LazyImageProps): ReactNode {
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const imgElement = imageRef.current

        if (!imgElement) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsLoaded(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' },
        )

        observer.observe(imgElement)

        return () => {
            observer.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <img
            {...imgAttributes}
            src={isLoaded ? src : undefined}
            ref={imageRef}
            onLoad={() => {
                if (!isLoaded) {
                    setIsLoaded(true)
                }
            }}
        />
    )
}
