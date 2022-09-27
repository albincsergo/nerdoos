import { FC } from 'react';
import { Container, VStack, Heading, Button, Text, HStack, useModal } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';

const Connected: FC = () => {
    return (
        <VStack spacing={20}>
            <Container>
                <VStack spacing={8}>
                    <Heading color="white" as='h1' size='2xl' noOfLines={1} textAlign='center'>
                        Welcome Nerdoo.
                    </Heading>
                    <Text color="white" fontSize="xl" textAlign="center">
                        Each nerdoo is randomly generated, and can be staked to receive
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

            <Button bgColor="accent" color="white" maxW="380px">
                <Text>Mint nerdoo</Text>
            </Button>
        </VStack>
    )
}

export default Connected