interface MenuType {
  id: number
  name: string
  path: string
  children?: MenuType[]
  hidden?: boolean
  icon?: string
}

export const menus: MenuType[] = []