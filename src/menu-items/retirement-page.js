import {FormattedMessage} from 'react-intl';

// assets
import {IconCreditCardPay} from '@tabler/icons-react';

const icons = {
    IconCreditCardPay
};
const retirementPage = {
    id: 'retirement-page',
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'retirement',
            title: <FormattedMessage id="retirement" />,
            type: 'collapse',
            icon: icons.IconCreditCardPay,
            children: [
                {
                    id: 'pending',
                    title: <FormattedMessage id="pending"/>,
                    type: 'item',
                    url: '/retirement',
                },
                {
                    id: 'history',
                    title: <FormattedMessage id="history"/>,
                    type: 'item',
                    url: '/retirement/history',
                },
                {
                    id: 'finance',
                    title: <FormattedMessage id="finance"/>,
                    type: 'item',
                    url: '/retirement/finance',
                }
            ]
        }
    ]
};

export default retirementPage;
