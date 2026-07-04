import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '@hooks/useDebounce'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { FILTERS_ROOT } from '@services/internationalization/roots/sortAndFilter.constants'
import { isAtLeast } from '@utilities/number.utils'
import CheckboxInputField from '@components/CheckboxInputField/CheckboxInputField'
import NumberInputField from '@components/NumberInputField/NumberInputField'
import InputFieldHelper from '@components/InputFieldHelper/InputFieldHelper'
import './PageCountBookFilter.scss'
import type { ReactNode } from 'react'
import type { PageCountFilterOptions } from '@models/bookCatalog.models'
import type { WithRequired } from '@customTypes/customUtilityTypes'

export type PageCountBookFilterProps<
	PageCountT extends WithRequired<
		Partial<PageCountFilterOptions>,
		'minPages' | 'maxPages'
	>,
> = {
	currentPageCount: PageCountT
	min: number
	max: number
	applyPageCountFilter: (pageCount: PageCountT) => void
	className?: string
}

export default function PageCountBookFilter<
	PageCountT extends WithRequired<
		Partial<PageCountFilterOptions>,
		'minPages' | 'maxPages'
	>,
>({
	currentPageCount,
	min,
	max,
	applyPageCountFilter,
	className = '',
}: PageCountBookFilterProps<PageCountT>): ReactNode {
	const formatPageCount = (): { minPages: string; maxPages: string } => ({
		minPages: currentPageCount.minPages ? `${currentPageCount.minPages}` : '',
		maxPages: currentPageCount.maxPages ? `${currentPageCount.maxPages}` : '',
	})
	const { t } = useTranslation(TRANSLATIONS_NS.sortAndFilter)
	const [pageCount, setPageCount] = useState(() => formatPageCount())
	const [isFocused, setIsFocused] = useState(false)

	const isPageCountUnchanged = (minPages: number, maxPages: number): boolean =>
		currentPageCount.minPages === minPages && currentPageCount.maxPages === maxPages

	useDebounce(pageCount, 600, debouncedPageCount => {
		const minPages =
			debouncedPageCount.minPages === '0' ? 1 : +debouncedPageCount.minPages
		const maxPages = +debouncedPageCount.maxPages

		if (isPageCountUnchanged(minPages, maxPages)) return

		applyPageCountFilter({
			...currentPageCount,
			minPages,
			maxPages:
				debouncedPageCount.maxPages === '' && debouncedPageCount.minPages !== ''
					? max
					: isAtLeast(maxPages, minPages)
						? maxPages
						: minPages,
		})
	})

	useEffect(() => {
		if (isFocused || isPageCountUnchanged(+pageCount.minPages, +pageCount.maxPages))
			return

		setPageCount(formatPageCount())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPageCount, isFocused])

	return (
		<div className={`page-count-book-filter ${className}`}>
			{currentPageCount.isUnspecifiedExcluded !== undefined ? (
				<CheckboxInputField
					className='page-count-book-filter__unspecified-page-count-input-field'
					onChange={e => {
						applyPageCountFilter({
							...currentPageCount,
							isUnspecifiedExcluded: e.target.checked,
							minPages: +pageCount.minPages,
							maxPages: +pageCount.maxPages,
						})
					}}
					checked={currentPageCount.isUnspecifiedExcluded}
				>
					{t(FILTERS_ROOT.pagesRange.excludeUnspecified)}
				</CheckboxInputField>
			) : null}

			<div
				className='page-count-book-filter__input-field-container'
				onFocus={() => setIsFocused(true)}
				onBlur={e => {
					if (!e.currentTarget.contains(e.relatedTarget)) {
						setIsFocused(false)
					}
				}}
			>
				<NumberInputField
					label={t(FILTERS_ROOT.pagesRange.min.label)}
					classNameContainer='page-count-book-filter__page-count-input-field'
					id='page-count-min'
					aria-describedby='page-count-min-description'
					name='minPages'
					value={pageCount.minPages}
					onChange={e => {
						setPageCount(pageCount => ({
							...pageCount,
							minPages: e.target.value,
						}))
					}}
				>
					<InputFieldHelper id='page-count-min-description'>
						{t(FILTERS_ROOT.pagesRange.min.description)}: {min}
					</InputFieldHelper>
				</NumberInputField>

				<NumberInputField
					label={t(FILTERS_ROOT.pagesRange.max.label)}
					classNameContainer='page-count-book-filter__page-count-input-field'
					id='page-count-max'
					aria-describedby='page-count-max-description'
					name='maxPages'
					value={pageCount.maxPages}
					onChange={e => {
						setPageCount(pageCount => ({
							...pageCount,
							maxPages: e.target.value,
						}))
					}}
				>
					<InputFieldHelper id='page-count-max-description'>
						{t(FILTERS_ROOT.pagesRange.max.description)}: {max}
					</InputFieldHelper>
				</NumberInputField>
			</div>
		</div>
	)
}
