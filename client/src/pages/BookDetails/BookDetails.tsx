import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useBookDetails } from './hooks/useBookDetails'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { BOOK_CARD_ROOT } from '@services/internationalization/roots/bookCard.constants'
import { BOOK_DETAILS_ROOT } from '@services/internationalization/roots/bookDetails.constants'
import { getBookDetailsLink } from '@router/routeFormatters.utils'
import BookDetailsLoader from './assets/loaders/BookDetailsLoader'
import TabbedContent from '@components/TabbedContent/TabbedContent'
import BookSlider from '@components/BookSlider/BookSlider'
import Table from '@components/Table/Table'
import ErrorFallback from '@components/ErrorFallback/ErrorFallback'
import BookTopicTagList from './components/BookTopicTagList/BookTopicTagList'
import BookCover from '@components/BookCover/BookCover'
import './BookDetails.scss'
import type { ReactNode } from 'react'
import type { BookDetails } from '@models/book.models'
import type {
	BookDetailsRouteParams,
	BookDetailsRouteState,
} from '@router/routeParams.models'

export default function BookDetails(): ReactNode {
	const { id } = useParams<BookDetailsRouteParams>()
	const location = useLocation()
	const state = location.state as BookDetailsRouteState | undefined

	if (!id && !state) throw new Response('Page Not Found', { status: 404 })

	const navigate = useNavigate()
	const { bookDetails, isLoading, isError, isNotFound } = useBookDetails(
		state ?? { id: id!, isExternalId: false, title: '' },
	)

	useEffect(() => {
		if (!id && bookDetails) {
			navigate(getBookDetailsLink(bookDetails).to, { replace: true, state })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookDetails])

	if (isNotFound) throw new Response('Book Not Found', { status: 404 })

	if (isError) {
		return <ErrorFallback />
	}

	if (isLoading) {
		return <BookDetailsLoader />
	}

	return <Content bookDetails={bookDetails!} />
}

type ContentProps = {
	bookDetails: BookDetails
}

function Content({ bookDetails }: ContentProps): ReactNode {
	const { t } = useTranslation([TRANSLATIONS_NS.bookDetails, TRANSLATIONS_NS.bookCard])

	return (
		<main className='book-details-page'>
			<div className='book-details-page-card'>
				<BookCover
					containerClassName='book-details-page-card__cover'
					title={bookDetails.title}
					isLibraryBook={false}
					cover={bookDetails.cover}
					isLazy={false}
				/>

				<div className='book-details-page-card__content'>
					<h1 className='book-details-page-card__title'>{bookDetails.title}</h1>

					{bookDetails.subtitle ? (
						<p className='book-details-page-card__subtitle'>
							{bookDetails.subtitle}
						</p>
					) : null}

					<p className='book-details-page-card__authors'>
						{bookDetails.authors?.join(', ') ??
							t(BOOK_CARD_ROOT.authors.unspecified, {
								ns: TRANSLATIONS_NS.bookCard,
							})}
					</p>
				</div>
			</div>

			<BookTopicTagList
				items={bookDetails.contentWarnings}
				label={t(BOOK_DETAILS_ROOT.topics.contentWarnings.label)}
			/>

			<BookTopicTagList
				items={bookDetails.categories}
				label={t(BOOK_DETAILS_ROOT.topics.categories.label)}
				fallback={t(BOOK_DETAILS_ROOT.topics.categories.empty)}
			/>

			<BookTopicTagList
				items={bookDetails.characters}
				label={t(BOOK_DETAILS_ROOT.topics.characters.label)}
			/>

			<TabbedContent
				className='book-details-page__tabbed-content'
				initialActiveTab={
					bookDetails.description ? 'book-description' : 'book-technical-sheet'
				}
			>
				<TabbedContent.List>
					<TabbedContent.Tab
						id='book-description'
						isMounted={!!bookDetails.description}
					>
						{t(BOOK_DETAILS_ROOT.description.label)}
					</TabbedContent.Tab>
					<TabbedContent.Tab id='book-technical-sheet'>
						{t(BOOK_DETAILS_ROOT.technicalSheet.label)}
					</TabbedContent.Tab>
				</TabbedContent.List>

				<TabbedContent.Panel id='book-description'>
					<p className='book-details-page__description'>
						{bookDetails.description}
					</p>
				</TabbedContent.Panel>

				<TabbedContent.Panel id='book-technical-sheet'>
					<Table
						className='book-details-page__technical-sheet'
						isStriped
						isRounded
					>
						<Table.Body>
							<Table.Row>
								<Table.Th scope='row'>
									{t(
										BOOK_DETAILS_ROOT.technicalSheet.fields.pageCount
											.label,
									)}
								</Table.Th>
								<Table.Td>
									{bookDetails.pageCount ??
										t(BOOK_DETAILS_ROOT.technicalSheet.notAvailable)}
								</Table.Td>
							</Table.Row>
							<Table.Row>
								<Table.Th scope='row'>
									{t(
										BOOK_DETAILS_ROOT.technicalSheet.fields
											.publishedDate.label,
									)}
								</Table.Th>
								<Table.Td>
									{bookDetails.publishedDate ??
										t(BOOK_DETAILS_ROOT.technicalSheet.notAvailable)}
								</Table.Td>
							</Table.Row>
							<Table.Row>
								<Table.Th scope='row'>
									{t(
										BOOK_DETAILS_ROOT.technicalSheet.fields.language
											.label,
									)}
								</Table.Th>
								<Table.Td>
									{bookDetails.lang ??
										t(BOOK_DETAILS_ROOT.technicalSheet.notAvailable)}
								</Table.Td>
							</Table.Row>
							<Table.Row>
								<Table.Th scope='row'>
									{t(
										BOOK_DETAILS_ROOT.technicalSheet.fields.publisher
											.label,
									)}
								</Table.Th>
								<Table.Td>
									{bookDetails.publisher ??
										t(BOOK_DETAILS_ROOT.technicalSheet.notAvailable)}
								</Table.Td>
							</Table.Row>
						</Table.Body>
					</Table>
				</TabbedContent.Panel>
			</TabbedContent>

			{bookDetails.relatedBooks ? (
				<BookSlider
					label={t(BOOK_DETAILS_ROOT.relatedBooks.label)}
					books={bookDetails.relatedBooks}
				/>
			) : null}
		</main>
	)
}
