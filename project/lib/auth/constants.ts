export const AUTH_PROVIDERS = ['email'] as const;

export const AUTH_APPEARANCE = {
  theme: {
    colors: {
      brand: 'rgb(37 99 235)',
      brandAccent: 'rgb(29 78 216)',
      inputBackground: 'transparent',
      inputText: 'inherit',
      inputBorder: 'rgb(226 232 240)',
      inputBorderHover: 'rgb(148 163 184)',
      inputBorderFocus: 'rgb(37 99 235)',
    },
  },
  className: {
    anchor: 'text-blue-600 hover:text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    container: 'space-y-4',
    divider: 'bg-gray-200',
    input: 'rounded-lg border bg-transparent px-3 py-2 text-sm',
    label: 'text-sm font-medium',
    loader: 'text-blue-600',
    message: 'text-red-600 text-sm',
  },
} as const;