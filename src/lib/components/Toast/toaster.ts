import { createToaster } from '@ark-ui/svelte/toast'

export const toaster = createToaster({
	placement: 'bottom-end',
	overlap: true,
	gap: 16,
})

export const toast = (opts: Parameters<typeof toaster.create>[0]) => toaster.create(opts)
export const updateToast = (id: string, opts: Parameters<typeof toaster.update>[1]) =>
	toaster.update(id, opts)
export const dismissToast = (id: string) => toaster.dismiss(id)
