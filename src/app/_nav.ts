import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Agency',
    url: '/agency',
    icon: 'fa fa-building',
  },
  {
    name: 'Staff',
    url: '/staff',
    icon: 'fa fa-users',
  },
  {
    name: 'Pet Owner',
    url: '/pet-owner',
    icon: 'fa fa-users',
  },
  {
    name: 'Pets',
    url: '/pets',
    icon: 'fa fa-paw',
  },
  // {
  //   name: 'Pet Activity',
  //   url: '/pet-activity',
  //   icon: 'fa fa-history',
  // },
  {
    name: 'Settings',
    url: 'setting',
    icon: 'icon-settings',
    children: [
      {
        name: 'Pet Type',
        url: '/setting/pet-type',
      },
      {
        name: 'Activity',
        url: '/setting/activity',
      },
      {
        name: 'Allergies',
        url: '/setting/allergies',
      }
    ]
  },
];
