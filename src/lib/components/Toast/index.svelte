<script lang="ts">
  import { Toaster, Toast } from '@ark-ui/svelte/toast'
  import { toaster } from './toaster'
  import { RootStyles, TitleStyles, DescriptionStyles, CloseButtonStyles } from './styles'
</script>

<Toaster {toaster}>
  {#snippet children(toast)}
    <Toast.Root class={RootStyles}>
      <Toast.Title class={TitleStyles}>{toast().title}</Toast.Title>
      {#if toast().description}
        <Toast.Description class={DescriptionStyles}>
          {toast().description}
        </Toast.Description>
      {/if}
      <Toast.CloseTrigger aria-label="close" class={CloseButtonStyles}>
        <i aria-hidden="true" class="fa-solid fa-xmark"></i>
      </Toast.CloseTrigger>
    </Toast.Root>
  {/snippet}
</Toaster>
