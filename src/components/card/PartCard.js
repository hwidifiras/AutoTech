// Composant Card pour afficher une pièce détachée
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Badge,
  Button,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { MdShoppingCart, MdRemoveRedEye } from 'react-icons/md';
import Card from 'components/card/Card';

export default function PartCard({ part, onView, onAddToCart }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgHover = useColorModeValue('gray.50', 'navy.700');

  const stockStatus = part.stock <= part.minStock ? 'low' : 'good';
  const stockColor = stockStatus === 'low' ? 'red' : 'green';

  return (
    <Card
      p="20px"
      _hover={{ bg: bgHover, transform: 'translateY(-2px)' }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <Flex direction="column" h="100%">
        {/* Image */}
        <Box mb="20px" position="relative">
          <Image
            src={part.images[0]}
            borderRadius="20px"
            w="100%"
            h="180px"
            objectFit="cover"
          />
          <Badge
            position="absolute"
            top="10px"
            right="10px"
            colorScheme={stockColor}
            borderRadius="8px"
            px="8px"
            py="2px"
          >
            Stock: {part.stock}
          </Badge>
        </Box>

        {/* Info */}
        <Flex direction="column" flex="1">
          <Text fontSize="xs" color="secondaryGray.600" mb="5px">
            {part.reference}
          </Text>
          <Text
            fontSize="lg"
            color={textColor}
            fontWeight="700"
            mb="10px"
            noOfLines={2}
          >
            {part.name}
          </Text>
          
          <Flex gap="8px" mb="10px" flexWrap="wrap">
            <Badge colorScheme="purple" borderRadius="8px">
              {part.category}
            </Badge>
            <Badge colorScheme="blue" borderRadius="8px">
              {part.brand}
            </Badge>
          </Flex>

          <Text fontSize="sm" color="secondaryGray.600" mb="15px" noOfLines={2}>
            {part.description}
          </Text>

          {/* Prix */}
          <Flex justify="space-between" align="center" mt="auto">
            <Box>
              <Text fontSize="xs" color="secondaryGray.600">
                Prix
              </Text>
              <Text fontSize="2xl" color={brandColor} fontWeight="700">
                {part.price} DH
              </Text>
            </Box>
          </Flex>
        </Flex>

        {/* Actions */}
        <Flex gap="10px" mt="15px">
          <Button
            variant="outline"
            colorScheme="brand"
            flex="1"
            leftIcon={<Icon as={MdRemoveRedEye} />}
            onClick={() => onView && onView(part)}
          >
            Voir
          </Button>
          <Button
            variant="solid"
            colorScheme="brand"
            flex="1"
            leftIcon={<Icon as={MdShoppingCart} />}
            onClick={() => onAddToCart && onAddToCart(part)}
            isDisabled={part.stock === 0}
          >
            Ajouter
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}
