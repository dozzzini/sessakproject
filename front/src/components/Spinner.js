import { Spinner } from '@chakra-ui/react'
import styled from 'styled-components';

const Div =styled.div`
/* height: 100%; */
margin-top: 400px;
display: flex;
justify-content: center;
align-items: center;
`

const SpinnerCompo = () => {
	return(
		<Div>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
		</Div>
	)
};

export default SpinnerCompo;