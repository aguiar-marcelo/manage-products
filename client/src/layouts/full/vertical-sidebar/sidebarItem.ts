import { DashboardIcon, PlusIcon, ListCheckIcon } from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Dashboard' },
  {
    title: 'Home',
    icon: DashboardIcon,
    to: '/dashboard/default'
  },
  { divider: true },
  { header: 'Produto' },
  {
    title: 'Novo Produto',
    icon: PlusIcon,
    to: '/products/add'
  },
  {
    title: 'Produtos',
    icon: ListCheckIcon,
    to: '/products'
  }
];

export default sidebarItem;
