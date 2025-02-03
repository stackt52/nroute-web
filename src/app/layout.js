import PropTypes from 'prop-types';
import './globals.css';

// PROJECT IMPORTS
import ProviderWrapper from 'store/ProviderWrapper';

export const metadata = {
	title: 'nRoute',
	description:
		'A Travel Authorization application.'
};


export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ProviderWrapper>{children}</ProviderWrapper>
			</body>
		</html>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node
};
