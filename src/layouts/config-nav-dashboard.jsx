import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard },
      // { title: 'Ecommerce', path: paths.dashboard.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
      // { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
      // { title: 'Booking', path: paths.dashboard.general.booking, icon: ICONS.booking },
      // { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
      // { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },
    ],
  },
  /**
   * Management
   */
  {
    subheader: 'Management',
    items: [
      {
        title: 'Catalogs',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'Pending Approval List', path: paths.dashboard.product.new },
          { title: 'Product List', path: paths.dashboard.product.root },

          // { title: 'Details', path: paths.dashboard.product.demo.details },
          // { title: 'Edit', path: paths.dashboard.product.demo.edit },
          {
            title: 'Bulk Upload',
            path: paths.dashboard.product.massive,
          },
        ],
      },
      {
        title: 'Order',
        path: paths.dashboard.order.root,
        icon: ICONS.order,
        children: [
          { title: 'List', path: paths.dashboard.order.root },
          // { title: 'Details', path: paths.dashboard.order.demo.details },
        ],
      },
      {
        title: 'Return',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        children: [
          { title: 'Retun List', path: paths.dashboard.post.demo.details },
          // { title: ' Return details', path: paths.dashboard.post.root },
          // { title: 'Create', path: paths.dashboard.post.new },
          //   { title: 'Edit', path: paths.dashboard.post.demo.edit },
        ],
      },

      {
        title: 'Seller',
        path: paths.dashboard.tour.root,
        icon: ICONS.tour,
        children: [
          { title: 'Pending Seller Approvals', path: paths.dashboard.tour.root },
          // { title: 'Details', path: paths.dashboard.tour.demo.details },
          { title: 'Approved Sellers', path: paths.dashboard.tour.new },
          // { title: 'Edit', path: paths.dashboard.tour.demo.edit },
        ],
      },
      {
        title: 'Invoice',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.root },
          { title: 'Details', path: paths.dashboard.invoice.demo.details },
          { title: 'Create', path: paths.dashboard.invoice.new },
          { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
        ],
      },

      {
        title: 'Legal Terms Management',
        path: paths.dashboard.mail,
        icon: ICONS.mail,
        // info: (
        //   <Label color="error" variant="inverted">
        //     +32
        //   </Label>
        // ),
      },

      { title: 'Reviews', path: paths.dashboard.fileManager, icon: ICONS.folder },
      {
        title: 'Help & Support',
        path: paths.dashboard.job.root,
        icon: ICONS.job,
        // children: [
        //   { title: 'List', path: paths.dashboard.job.root },
        //   { title: 'Details', path: paths.dashboard.job.demo.details },
        //   { title: 'Create', path: paths.dashboard.job.new },
        //   { title: 'Edit', path: paths.dashboard.job.demo.edit },
        // ],
      },

      {
        title: 'User',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          // { title: 'User', path: paths.dashboard.user.account },l
          { title: ' Open Support Tickets', path: paths.dashboard.user.root },
          // { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'User List', path: paths.dashboard.user.list },
          // { title: 'Create', path: paths.dashboard.user.new },
          // { title: 'Edit', path: paths.dashboard.user.demo.edit },
        ],
      },

      // { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      // { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      { title: 'Commission Managment', path: paths.dashboard.kanban, icon: ICONS.kanban },
    ],
  },
];
