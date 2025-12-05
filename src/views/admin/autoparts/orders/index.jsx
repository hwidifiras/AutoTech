// Page de gestion des bons de commande
import React from 'react';
import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from '@chakra-ui/react';
import { MdAdd, MdDescription, MdCheckCircle, MdPending } from 'react-icons/md';
import Card from 'components/card/Card';
import StatCard from 'components/card/StatCard';
import { orders, clients } from 'data/autoPartsData';

export default function Orders() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgHover = useColorModeValue('gray.50', 'navy.700');

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const confirmedOrders = orders.filter((o) => o.status === 'confirmed').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'confirmed':
        return 'blue';
      case 'in-progress':
        return 'purple';
      case 'completed':
        return 'green';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'confirmed':
        return 'Confirmée';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      default:
        return status;
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <StatCard
          name="Total Commandes"
          value={totalOrders}
          icon={MdDescription}
        />
        <StatCard
          name="En Attente"
          value={pendingOrders}
          icon={MdPending}
        />
        <StatCard
          name="Confirmées"
          value={confirmedOrders}
          icon={MdCheckCircle}
        />
      </SimpleGrid>

      {/* Liste des commandes */}
      <Card p="20px">
        <Flex justify="space-between" align="center" mb="20px">
          <Text fontSize="xl" color={textColor} fontWeight="700">
            Bons de Commande
          </Text>
          <Button
            leftIcon={<Icon as={MdAdd} />}
            colorScheme="brand"
          >
            Nouvelle Commande
          </Button>
        </Flex>

        <Box overflowX="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Numéro</Th>
                <Th>Date</Th>
                <Th>Client</Th>
                <Th>Articles</Th>
                <Th>Total</Th>
                <Th>Date Livraison</Th>
                <Th>Statut</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => {
                const client = clients.find((c) => c.id === order.clientId);
                return (
                  <Tr key={order.id} _hover={{ bg: bgHover }}>
                    <Td fontWeight="700" color={brandColor}>
                      #{order.id}
                    </Td>
                    <Td>{order.date}</Td>
                    <Td>{client?.name}</Td>
                    <Td>{order.items.length}</Td>
                    <Td fontWeight="700">
                      {order.total.toLocaleString()} DH
                    </Td>
                    <Td>{order.deliveryDate}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </Td>
                    <Td>
                      <Button size="sm" variant="outline" colorScheme="brand">
                        Voir
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Card>
    </Box>
  );
}
