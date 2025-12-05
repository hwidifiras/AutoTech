// Page de gestion des fournisseurs et achats
import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
} from '@chakra-ui/react';
import { MdSearch, MdAdd, MdBusiness } from 'react-icons/md';
import Card from 'components/card/Card';
import StatCard from 'components/card/StatCard';
import SupplierCard from 'components/card/SupplierCard';
import { suppliers, purchases } from 'data/autoPartsData';

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgHover = useColorModeValue('gray.50', 'navy.700');

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSuppliers = suppliers.length;
  const totalDebtToSuppliers = suppliers.reduce(
    (acc, s) => acc + s.currentDebt,
    0
  );
  const totalPurchases = purchases.reduce((acc, p) => acc + p.total, 0);
  const avgPaymentScore = Math.round(
    suppliers.reduce((acc, s) => {
      const total = s.onTimePayments + s.latePayments;
      return acc + (total > 0 ? (s.onTimePayments / total) * 100 : 100);
    }, 0) / suppliers.length
  );

  const handleSelectSupplier = (supplier) => {
    alert(`Détails du fournisseur: ${supplier.name}`);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
        <StatCard
          name="Total Fournisseurs"
          value={totalSuppliers}
          icon={MdBusiness}
        />
        <StatCard
          name="Notre Dette Fournisseurs"
          value={`${totalDebtToSuppliers.toLocaleString()} DH`}
          subtitle="Montant que nous devons"
        />
        <StatCard
          name="Total Achats"
          value={`${totalPurchases.toLocaleString()} DH`}
        />
        <StatCard
          name="Score Paiements"
          value={`${avgPaymentScore}%`}
          subtitle="Paiements à temps"
        />
      </SimpleGrid>

      {/* Tabs */}
      <Card p="0">
        <Tabs variant="enclosed" colorScheme="brand">
          <TabList px="20px" pt="20px">
            <Tab>Fournisseurs</Tab>
            <Tab>Historique Achats</Tab>
          </TabList>

          <TabPanels>
            {/* Tab Fournisseurs */}
            <TabPanel>
              <Flex gap="15px" align="center" mb="20px">
                <InputGroup flex="1">
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MdSearch} color="secondaryGray.600" />
                  </InputLeftElement>
                  <Input
                    placeholder="Rechercher un fournisseur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Button leftIcon={<Icon as={MdAdd} />} colorScheme="blue">
                  Nouveau Fournisseur
                </Button>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="20px">
                {filteredSuppliers.map((supplier) => (
                  <SupplierCard
                    key={supplier.id}
                    supplier={supplier}
                    onSelect={handleSelectSupplier}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>

            {/* Tab Achats */}
            <TabPanel>
              <Flex justify="space-between" align="center" mb="20px">
                <Text fontSize="lg" color={textColor} fontWeight="700">
                  Historique des Achats
                </Text>
                <Button leftIcon={<Icon as={MdAdd} />} colorScheme="blue">
                  Nouvel Achat
                </Button>
              </Flex>

              <Box overflowX="auto">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Numéro</Th>
                      <Th>Date</Th>
                      <Th>Fournisseur</Th>
                      <Th>Articles</Th>
                      <Th>Total</Th>
                      <Th>Statut Réception</Th>
                      <Th>Statut Paiement</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {purchases.map((purchase) => {
                      const supplier = suppliers.find(
                        (s) => s.id === purchase.supplierId
                      );
                      return (
                        <Tr key={purchase.id} _hover={{ bg: bgHover }}>
                          <Td fontWeight="700" color={brandColor}>
                            #{purchase.id}
                          </Td>
                          <Td>{purchase.date}</Td>
                          <Td>{supplier?.name}</Td>
                          <Td>{purchase.items.length}</Td>
                          <Td fontWeight="700">
                            {purchase.total.toLocaleString()} DH
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                purchase.status === 'received'
                                  ? 'green'
                                  : 'orange'
                              }
                            >
                              {purchase.status === 'received'
                                ? 'Reçu'
                                : 'En attente'}
                            </Badge>
                          </Td>
                          <Td>
                            <Badge
                              colorScheme={
                                purchase.paymentStatus === 'paid'
                                  ? 'green'
                                  : purchase.paymentStatus === 'partial'
                                  ? 'orange'
                                  : 'red'
                              }
                            >
                              {purchase.paymentStatus === 'paid'
                                ? 'Payé'
                                : purchase.paymentStatus === 'partial'
                                ? 'Partiel'
                                : 'Non payé'}
                            </Badge>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Box>
  );
}
