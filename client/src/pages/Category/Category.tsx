import { useTranslation } from 'react-i18next'
import { useLoaderData } from 'react-router-dom'
import { useCategoryBooks } from './hooks/useCategoryBooks'
import { TRANSLATIONS_NS } from '@services/internationalization/locale.constants'
import { CATEGORIES_ROOT } from '@services/internationalization/roots/category.constants'
import { getCategoryBanner } from './services/categoryBanners/banner.services'
import ErrorFallback from '@components/ErrorFallback/ErrorFallback'
import FetchedDataProvider from '@contexts/FetchedDataContext/FetchedDataProvider'
import CategoryCatalogProvider from './contexts/CategoryCatalogContext/CategoryCatalogProvider'
import Catalog from './components/Catalog/Catalog'
import './Category.scss'
import type { ReactNode } from 'react'
import type { CategoriesRouteParams } from '@router/routeParams.models'

export default function Category(): ReactNode {
	const { category } = useLoaderData<CategoriesRouteParams>()
	const { results, isLoading, isError } = useCategoryBooks(category)

	return (
		<main className='categories-page'>
			<Banner category={category} />
			
			{isError ? (
				<ErrorFallback />
			) : (
				<FetchedDataProvider
					data={results}
					isLoading={isLoading}
					isError={isError}
					dataLength={results.length}
					inputValue={category}
				>
					<CategoryCatalogProvider>
						<Catalog />
					</CategoryCatalogProvider>
				</FetchedDataProvider>
			)}
		</main>
	)
}

type BannerProps = CategoriesRouteParams

function Banner({ category }: BannerProps): ReactNode {
	const { t } = useTranslation(TRANSLATIONS_NS.category)

	return (
		<div className='categories-page__banner'>
			<img
				src={getCategoryBanner(category)}
				alt={`${t(CATEGORIES_ROOT[category])} - banner`}
			/>
			<h1 className='categories-page__title'>{t(CATEGORIES_ROOT[category])}</h1>
		</div>
	)
}
