// Composant pour afficher un client
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
  Tooltip,
} from '@chakra-ui/react';
import { MdPhone, MdEmail, MdLocationOn, MdBusiness, MdPerson, MdWarning } from 'react-icons/md';
import Card from 'components/card/Card';

export default function ClientCard({ client, onSelect }) {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgSecondary = useColorModeValue('secondaryGray.300', 'navy.700');

  const debtPercentage = (client.currentDebt / client.debtLimit) * 100;
  const debtColor = debtPercentage > 75 ? 'red' : debtPercentage > 50 ? 'orange' : 'green';

  // Score de crédibilité avec couleurs
  const getCreditScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 75) return 'blue';
    if (score >= 60) return 'orange';
    return 'red';
  };

  // Type de client
  const clientTypeConfig = {
    business: {
      label: client.businessType === 'garage' ? 'Garage' : client.businessType === 'workshop' ? 'Atelier' : 'Société',
      icon: MdBusiness,
      color: 'blue',
    },
    individual: {
      label: 'Particulier',
      icon: MdPerson,
      color: 'purple',
    },
  };

  const typeInfo = clientTypeConfig[client.type] || clientTypeConfig.individual;

  return (
    <Card p="20px">
      <Flex direction="column" h="100%">
        <Flex align="center" mb="20px">
          <Avatar
            name={client.name}
            bg={brandColor}
            color="white"
            size="md"
            mr="15px"
          />
          <Box flex="1">
            <Flex align="center" gap="8px" mb="4px">
              <Text fontSize="lg" color={textColor} fontWeight="700">
                {client.name}
              </Text>
              <Badge
                colorScheme={typeInfo.color}
                fontSize="xs"
                borderRadius="6px"
                px="8px"
                py="2px"
              >
                <Flex align="center" gap="4px">
                  <Icon as={typeInfo.icon} boxSize="12px" />
                  {typeInfo.label}
                </Flex>
              </Badge>
            </Flex>
            <Text fontSize="sm" color="secondaryGray.600">
              {client.contact}
            </Text>
          </Box>
          <Tooltip label={`Score de crédibilité basé sur l'historique de paiements`} placement="top">
            <Badge
              colorScheme={getCreditScoreColor(client.creditScore)}
              fontSize="md"
              borderRadius="8px"
              px="10px"
              py="4px"
            >
              {client.creditScore}/100
            </Badge>
          </Tooltip>
        </Flex>

        {/* Contact Info */}
        <Flex direction="column" gap="8px" mb="15px">
          <Flex align="center" fontSize="sm" color="secondaryGray.600">
            <Icon as={MdPhone} mr="8px" />
            <Text>{client.phone}</Text>
          </Flex>
          <Flex align="center" fontSize="sm" color="secondaryGray.600">
            <Icon as={MdEmail} mr="8px" />
            <Text>{client.email}</Text>
          </Flex>
          <Flex align="center" fontSize="sm" color="secondaryGray.600">
            <Icon as={MdLocationOn} mr="8px" />
            <Text noOfLines={1}>{client.address}</Text>
          </Flex>
        </Flex>

        {/* Debt Info */}
        <Box mb="15px" p="15px" bg={bgSecondary} borderRadius="15px">
          <Flex justify="space-between" mb="8px" align="center">
            <Text fontSize="sm" fontWeight="600" color={textColor}>
              Leur dette envers nous
            </Text>
            <Flex align="center" gap="6px">
              {client.overdueDebt > 0 && (
                <Tooltip label={`${client.overdueDebt.toLocaleString()} DH en retard`}>
                  <Icon as={MdWarning} color="red.500" boxSize="16px" />
                </Tooltip>
              )}
              <Text fontSize="sm" fontWeight="700" color={client.overdueDebt > 0 ? 'red.500' : 'green.500'}>
                {client.currentDebt.toLocaleString()} DH
              </Text>
            </Flex>
          </Flex>
          <Progress
            value={debtPercentage}
            colorScheme={debtColor}
            borderRadius="8px"
            size="sm"
            mb="8px"
          />
          <Flex justify="space-between" fontSize="xs" color="secondaryGray.600">
            <Text>Limite: {client.debtLimit.toLocaleString()} DH</Text>
            <Text>Délai: {client.paymentTerms}</Text>
          </Flex>
          <Text fontSize="xs" color="secondaryGray.600" mt="4px">
            Dernier paiement: {client.lastPaymentDate}
          </Text>
        </Box>

        {/* Stats */}
        <Flex justify="space-between" mb="20px">
          <Box>
            <Text fontSize="xs" color="secondaryGray.600">
              Total Achats
            </Text>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              {client.totalPurchases.toLocaleString()} DH
            </Text>
          </Box>
          <Box textAlign="right">
            <Text fontSize="xs" color="secondaryGray.600">
              Paiements
            </Text>
            <Text fontSize="sm" color={textColor} fontWeight="600">
              <Text as="span" color="green.500">{client.onTimePayments}</Text>
              {' / '}
              <Text as="span" color="red.500">{client.latePayments}</Text>
            </Text>
          </Box>
        </Flex>

        {/* Action */}
        <Button
          variant="solid"
          colorScheme="brand"
          w="100%"
          onClick={() => onSelect && onSelect(client)}
        >
          Voir détails
        </Button>
      </Flex>
    </Card>
  );
}
