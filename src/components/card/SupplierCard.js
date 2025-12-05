// Composant pour afficher un fournisseur
import React from 'react';
import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Progress,
  useColorModeValue,
  Icon,
  Avatar,
} from '@chakra-ui/react';
import { MdPhone, MdEmail, MdLocationOn, MdTrendingUp } from 'react-icons/md';
import Card from 'components/card/Card';

export default function SupplierCard({ supplier, onSelect }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgSecondary = useColorModeValue('secondaryGray.300', 'navy.700');

  const debtPercentage = (supplier.currentDebt / supplier.debtLimit) * 100;
  const debtColor = debtPercentage > 75 ? 'red' : debtPercentage > 50 ? 'orange' : 'green';

  // Score de paiement
  const totalPayments = supplier.onTimePayments + supplier.latePayments;
  const paymentScore = totalPayments > 0 ? Math.round((supplier.onTimePayments / totalPayments) * 100) : 100;

  return (
    <Card p="20px">
      <Flex direction="column" h="100%">
        <Flex align="center" mb="20px">
          <Avatar
            name={supplier.name}
            bg="blue.500"
            color="white"
            size="md"
            mr="15px"
          />
          <Box flex="1">
            <Text fontSize="lg" color={textColor} fontWeight="700">
              {supplier.name}
            </Text>
            <Text fontSize="sm" color="secondaryGray.600">
              {supplier.contact}
            </Text>
          </Box>
          <Badge
            colorScheme={paymentScore >= 90 ? 'green' : paymentScore >= 75 ? 'orange' : 'red'}
            fontSize="md"
            borderRadius="8px"
            px="10px"
            py="4px"
          >
            {paymentScore}% paiements à temps
          </Badge>
        </Flex>

        {/* Contact Info */}
        <Flex direction="column" gap="8px" mb="15px">
          <Flex align="center" fontSize="sm" color="secondaryGray.600">
            <Icon as={MdPhone} mr="8px" />
            <Text>{supplier.phone}</Text>
          </Flex>
          <Flex align="center" fontSize="sm" color="secondaryGray.600">
            <Icon as={MdEmail} mr="8px" />
            <Text>{supplier.email}</Text>
          </Flex>
          <Flex align="center" fontSize="sm" color="secondaryGray.600">
            <Icon as={MdLocationOn} mr="8px" />
            <Text noOfLines={1}>{supplier.address}</Text>
          </Flex>
        </Flex>

        {/* Debt Info */}
        <Box mb="15px" p="15px" bg={bgSecondary} borderRadius="15px">
          <Flex justify="space-between" mb="8px">
            <Text fontSize="sm" fontWeight="600" color={textColor}>
              Notre dette envers fournisseur
            </Text>
            <Text fontSize="sm" fontWeight="700" color="red.500">
              {supplier.currentDebt.toLocaleString()} DH
            </Text>
          </Flex>
          <Progress
            value={debtPercentage}
            colorScheme={debtColor}
            borderRadius="8px"
            size="sm"
            mb="8px"
          />
          <Flex justify="space-between" fontSize="xs" color="secondaryGray.600">
            <Text>Limite: {supplier.debtLimit.toLocaleString()} DH</Text>
            <Text>Délai: {supplier.paymentTerms}</Text>
          </Flex>
          <Text fontSize="xs" color="secondaryGray.600" mt="4px">
            Dernier paiement: {supplier.lastPaymentDate}
          </Text>
        </Box>

        {/* Stats */}
        <Flex align="center" justify="space-between" mb="20px" p="12px" bg={bgSecondary} borderRadius="12px">
          <Flex align="center">
            <Icon as={MdTrendingUp} color="green.500" w="20px" h="20px" mr="8px" />
            <Box>
              <Text fontSize="xs" color="secondaryGray.600">
                Total Achats
              </Text>
              <Text fontSize="lg" color={textColor} fontWeight="700">
                {supplier.totalPurchases.toLocaleString()} DH
              </Text>
            </Box>
          </Flex>
        </Flex>

        {/* Action */}
        <Button
          variant="solid"
          colorScheme="blue"
          w="100%"
          onClick={() => onSelect && onSelect(supplier)}
        >
          Voir détails
        </Button>
      </Flex>
    </Card>
  );
}
