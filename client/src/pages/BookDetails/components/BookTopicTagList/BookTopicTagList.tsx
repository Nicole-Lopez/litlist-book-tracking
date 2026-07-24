import ExpandableWrapPreview from '@components/ExpandableWrapPreview/ExpandableWrapPreview'
import TagPill from '@components/TagPill/TagPill'
import type { ReactNode } from 'react'

export type BookTopicTagListProps = {
	items: string[] | undefined
	label: string
	fallback?: ReactNode
}

export default function BookTopicTagList({
	items,
	label,
	fallback,
}: BookTopicTagListProps): ReactNode {
	if (!items?.length && !fallback) {
		return null
	}

	return (
		<ExpandableWrapPreview
			className='book-details-page-topic'
			label={`${label} (${items?.length ?? 0})`}
		>
			{items?.length ? (
				items.map((item, index) => (
					<TagPill key={`${item}-${index}`}>{item}</TagPill>
				))
			) : (
				<p className='book-details-page-topic__fallback'>{fallback}</p>
			)}
		</ExpandableWrapPreview>
	)
}
