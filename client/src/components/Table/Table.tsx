import './Table.scss'
import type {
	ThHTMLAttributes,
	HTMLAttributes,
	TdHTMLAttributes,
	TableHTMLAttributes,
	ReactNode,
} from 'react'

export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
	isStriped?: boolean
	isRounded?: boolean
}

export default function Table({
	isStriped = false,
	isRounded = false,
	className = '',
	...props
}: TableProps): ReactNode {
	return (
		<table
			className={`table ${className} ${isStriped ? 'table--striped-rows' : ''} ${
				isRounded ? 'table--round-border' : ''
			}`}
			{...props}
		/>
	)
}

export type HeadProps = HTMLAttributes<HTMLTableSectionElement>

function Head(props: HeadProps): ReactNode {
	return <thead {...props} />
}

export type BodyProps = HTMLAttributes<HTMLTableSectionElement>

function Body(props: BodyProps): ReactNode {
	return <tbody {...props} />
}

export type RowProps = HTMLAttributes<HTMLTableRowElement>

function Row(props: RowProps): ReactNode {
	return <tr {...props} />
}

export type ThProps = ThHTMLAttributes<HTMLTableCellElement>

function Th(props: ThProps): ReactNode {
	return <th {...props} />
}

export type TdProps = TdHTMLAttributes<HTMLTableCellElement>

function Td(props: TdProps): ReactNode {
	return <td {...props} />
}

Table.Head = Head
Table.Th = Th
Table.Td = Td
Table.Body = Body
Table.Row = Row
