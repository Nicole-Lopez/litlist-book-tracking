import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { getBookDetailsLink } from '@router/routeFormatters.utils'
import { Link } from 'react-router-dom'
import GridBookCard from '@components/GridBookCard/GridBookCard'
import './BookSlider.scss'
import type { ReactNode } from 'react'
import type { BookSummary } from '@models/book.models'

export type BookSliderProps = {
	books: BookSummary[]
	label: ReactNode
	className?: string
}

export default function BookSlider({
	books,
	label,
	className = '',
}: BookSliderProps): ReactNode {
	const [controls, setControls] = useState({
		isPrevDisabled: true,
		isNextDisabled: false,
	})
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })

	useEffect(() => {
		if (!emblaApi) return

		const checkDisabledControls = (): void => {
			setControls({
				isPrevDisabled: !emblaApi.canScrollPrev(),
				isNextDisabled: !emblaApi.canScrollNext(),
			})
		}

		emblaApi.on('reInit', checkDisabledControls)
		emblaApi.on('select', checkDisabledControls)
	}, [emblaApi])

	return (
		<div className={`book-slider ${className}`}>
			<div className='book-slider__header'>
				<p className='book-slider__label'>{label}</p>

				<div className='book-slider__controls'>
					<button
						className='book-slider__control-btn'
						onClick={() => {
							emblaApi?.scrollPrev()
						}}
						disabled={controls.isPrevDisabled}
					>
						&#10094;
					</button>

					<button
						className='book-slider__control-btn'
						onClick={() => {
							emblaApi?.scrollNext()
						}}
						disabled={controls.isNextDisabled}
					>
						&#10095;
					</button>
				</div>
			</div>

			<div className='book-slider__viewport' ref={emblaRef}>
				<div className='book-slider__list'>
					{books.map(book => (
						<div className='book-slider__slide' key={book.id}>
							<Link {...getBookDetailsLink(book)}>
								<GridBookCard
									title={book.title}
									authors={book.authors}
									cover={book.cover}
									isHoverable
								/>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
