import {FormattedMessage} from 'react-intl';

// assets
import {IconLuggage} from '@tabler/icons-react';

const icons = {
    IconLuggage
};
const travelPage = {
    id: 'travel',
    title: <FormattedMessage id="travel" />,
    icon: icons.IconLuggage,
    type: 'group',
    url: '/travel'
};

export default travelPage;
