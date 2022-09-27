import { FC, MouseEventHandler, useCallback } from 'react';
import { Container, VStack, Heading, Button, Text, HStack, useModal } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Disconnected: FC = () => {
    const modalState = useWalletModal()
    const { wallet, connect } = useWallet()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (event.defaultPrevented) return

            if (!wallet) {
                modalState.setVisible(true)
            } else {
                connect().catch(() => { })
            }

        }, [wallet, connect, modalState]
    )

    return (
        <Container>
            <VStack spacing={20}>
                <Heading
                    color="white"
                    size='xl'
                    noOfLines={2}
                    textAlign='center'
                >
                    Mint your nerdoo. Earn $NRD. Make him smarter.
                </Heading>
                <Button
                    bgColor="accent"
                    color="white"
                    maxW="380px"
                    onClick={handleClick}
                >
                    <HStack>
                        <Text>Become a nerdoo</Text>
                        <ArrowForwardIcon />
                    </HStack>
                </Button>
            </VStack>
        </Container>
    )
}

export default Disconnected