import {FormattedMessage} from 'react-intl';

// assets
import {IconSettings} from '@tabler/icons-react';

const icons = {
    IconSettings
};
const settingPage = {
    // id: 'setting',
    // title: <FormattedMessage id="setting" />,
    // icon: icons.IconSettings,
    // type: 'group',
    // url: '/setting'
    id: 'setting',
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'setting',
            title: <FormattedMessage id="setting" />,
            type: 'collapse',
            icon: icons.IconSettings,
            children: [
                {
                    id: 'general',
                    title: <FormattedMessage id="general"/>,
                    type: 'item',
                    url: '/setting',
                },
                {
                    id: 'departments',
                    title: <FormattedMessage id="departments"/>,
                    type: 'item',
                    url: '/setting/departments',
                },
                {
                    id: 'users',
                    title: <FormattedMessage id="users"/>,
                    type: 'item',
                    url: '/setting/users',
                },
                {
                    id: 'cost-center',
                    title: <FormattedMessage id="cost-center"/>,
                    type: 'item',
                    url: '/setting/cost-center',
                }
            ]
        }
    ]
};

export default settingPage;
