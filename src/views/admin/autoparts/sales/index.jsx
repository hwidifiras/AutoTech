// Page de gestion des ventes et factures
import React, { useState } from 'react';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Input,
  Grid,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import {
  MdAttachMoney,
  MdReceipt,
  MdAdd,
  MdVisibility,
} from 'react-icons/md';
import Card from 'components/card/Card';
import StatCard from 'components/card/StatCard';
import { sales, clients, parts } from 'data/autoPartsData';

export default function Sales() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgHover = useColorModeValue('gray.50', 'navy.700');

  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const paidSales = sales.filter((s) => s.status === 'paid').length;
  const pendingSales = sales.filter((s) => s.status === 'pending').length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <StatCard
          name="Total Ventes"
          value={`${totalSales.toLocaleString()} DH`}
          growth="+15.3%"
          icon={MdAttachMoney}
        />
        <StatCard
          name="Factures Payées"
          value={paidSales}
          icon={MdReceipt}
        />
        <StatCard
          name="En Attente"
          value={pendingSales}
          icon={MdReceipt}
        />
      </SimpleGrid>

      {/* Liste des ventes */}
      <Card p="20px">
        <Flex justify="space-between" align="center" mb="20px">
          <Text fontSize="xl" color={textColor} fontWeight="700">
            Liste des Ventes
          </Text>
          <Button
            leftIcon={<Icon as={MdAdd} />}
            colorScheme="brand"
            onClick={onOpen}
          >
            Nouvelle Facture
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
                <Th>Total HT</Th>
                <Th>TVA</Th>
                <Th>Total TTC</Th>
                <Th>Statut</Th>
                <Th>Mode Paiement</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sales.map((sale) => {
                const client = clients.find((c) => c.id === sale.clientId);
                return (
                  <Tr key={sale.id} _hover={{ bg: bgHover }}>
                    <Td fontWeight="700" color={brandColor}>
                      #{sale.id}
                    </Td>
                    <Td>{sale.date}</Td>
                    <Td>{client?.name}</Td>
                    <Td>{sale.items.length}</Td>
                    <Td>{sale.subtotal.toLocaleString()} DH</Td>
                    <Td>{sale.tax.toLocaleString()} DH</Td>
                    <Td fontWeight="700">{sale.total.toLocaleString()} DH</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(sale.status)}>
                        {getStatusLabel(sale.status)}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge>
                        {sale.paymentMethod === 'cash' && '💵 Espèces'}
                        {sale.paymentMethod === 'credit' && '💳 Crédit'}
                        {sale.paymentMethod === 'transfer' && '🏦 Virement'}
                      </Badge>
                    </Td>
                    <Td>
                      <Button
                        size="sm"
                        leftIcon={<Icon as={MdVisibility} />}
                        variant="outline"
                        colorScheme="brand"
                      >
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

      {/* Modal nouvelle facture */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Créer une nouvelle facture</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Flex direction="column" gap="15px">
              <FormControl>
                <FormLabel>Client</FormLabel>
                <Select placeholder="Sélectionnez un client">
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input type="date" />
              </FormControl>

              <FormControl>
                <FormLabel>Articles (simplifiée)</FormLabel>
                <Select placeholder="Ajouter une pièce">
                  {parts.slice(0, 5).map((part) => (
                    <option key={part.id} value={part.id}>
                      {part.name} - {part.price} DH
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Grid templateColumns="1fr 1fr" gap="15px">
                <FormControl>
                  <FormLabel>Mode de paiement</FormLabel>
                  <Select>
                    <option value="cash">Espèces</option>
                    <option value="credit">Crédit</option>
                    <option value="transfer">Virement</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Statut</FormLabel>
                  <Select>
                    <option value="paid">Payée</option>
                    <option value="pending">En attente</option>
                  </Select>
                </FormControl>
              </Grid>

              <Flex gap="10px" mt="10px">
                <Button flex="1" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button flex="1" colorScheme="brand" onClick={onClose}>
                  Créer Facture
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
