// third-party
import {FormattedMessage} from 'react-intl';

// assets
import {IconLuggage} from '@tabler/icons-react';

// constant
const icons = {
    IconLuggage
};

const travelAuthPage = {
    id: 'travelAuthPage',
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'travel-auth',
            title: <FormattedMessage id="travel-auth" />,
            type: 'collapse',
            icon: icons.IconLuggage,
            children: [
                {
                    id: 'apply',
                    title: <FormattedMessage id="apply"/>,
                    type: 'item',
                    url: '/travel',
                },
                {
                    id: 'approve',
                    title: <FormattedMessage id="approve"/>,
                    type: 'item',
                    url: '/travel/approve',
                },
                {
                    id: 'payment',
                    title: <FormattedMessage id="payment"/>,
                    type: 'item',
                    url: '/travel/payment',
                }
            ]
        }
    ]
};

export default travelAuthPage;
