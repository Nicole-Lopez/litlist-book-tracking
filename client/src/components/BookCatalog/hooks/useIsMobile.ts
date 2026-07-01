import { useMediaQuery } from '@hooks/useMediaQuery'

export function useIsMobile(): boolean {
	const isMobile = useMediaQuery('(max-width: 1150px)')

	return isMobile
}
