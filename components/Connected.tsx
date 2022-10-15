import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from 'react'
import { Container, VStack, Heading, Button, Text, HStack, useModal } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { PublicKey } from '@solana/web3.js'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Metaplex, walletAdapterIdentity, CandyMachineV2 } from '@metaplex-foundation/js'
import { useRouter } from 'next/router'

const Connected: FC = () => {
    const { connection } = useConnection()
    const walletAdapter = useWallet()
    const [candyMachine, setCandyMachine] = useState<CandyMachineV2>()
    const [isMinting, setIsMinting] = useState(false)


    const metaplex = useMemo(() => {
        return Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter))
    }, [connection, walletAdapter])


    useEffect(() => {
        if (!metaplex) return

        metaplex
            .candyMachinesV2()
            .findByAddress({
                address: new PublicKey("E1SNZLrt2bujtoZ6rwBoqTn2232zCZfdRsvYk9at6Atj"),
            })
            .then((candyMachine) => {
                console.log(candyMachine)
                setCandyMachine(candyMachine)
            })
            .catch((error) => {
                alert(error)
            })
    }, [metaplex])

    const router = useRouter()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            if (event.defaultPrevented) return

            if (!walletAdapter.connected || !candyMachine) {
                return
            }

            try {
                setIsMinting(true)
                const nft = await metaplex.candyMachinesV2().mint({ candyMachine })

                console.log(nft)
                router.push(`/newMint?mint=${nft.nft.address.toBase58()}`)
            } catch (error) {
                alert(error)
            } finally {
                setIsMinting(false)
            }
        },
        [metaplex, walletAdapter, candyMachine]
    )


    return (
        <VStack spacing={20}>
            <Container>
                <VStack spacing={8}>
                    <Heading color="white" as='h1' size='2xl' noOfLines={1} textAlign='center'>
                        Welcome Nerdoo.
                    </Heading>
                    <Text color="white" fontSize="xl" textAlign="center">
                        Each Nerdoo is randomly generated, and can be staked to receive
                        <Text as="b"> $NRD</Text> Use your <Text as="b"> $NRD </Text> to make your nerdoo smarter.
                    </Text>
                </VStack>
            </Container>
            <HStack spacing={10}>
                <Image src="avatar1.png" alt="" />
                <Image src="avatar2.png" alt="" />
                <Image src="avatar3.png" alt="" />
                <Image src="avatar4.png" alt="" />
                <Image src="avatar5.png" alt="" />
            </HStack>

            <Button bgColor="accent" color="white" maxW="380px" onClick={handleClick}>
                <Text>Mint your Nerdoo</Text>
            </Button>
        </VStack>
    )
}

export default Connected