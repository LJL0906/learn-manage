interface MenuType {
  id: number
  name: string
  path: string
  children?: MenuType[]
  hidden?: boolean
  icon?: string
}

interface CrumbsType {
  name: string
  path: string
  id: number
}

export type { MenuType, CrumbsType }