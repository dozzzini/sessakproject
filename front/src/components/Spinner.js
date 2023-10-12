import { Spinner } from '@chakra-ui/react'
import styled from 'styled-components';

const Div =styled.div`
height: 100%;
/* margin-top: 400px; */
display: flex;
justify-content: center;
align-items: center;
`
const Main = styled.div`
	/* width: 100%; */
	margin-top: 300px;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const SpinnerCompo = () => {
	return(
		<Div>
			<Main>
				<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='blue.500'
				size='xl'
			/>
			</Main>
			
		</Div>
	)
};

export default SpinnerCompo;