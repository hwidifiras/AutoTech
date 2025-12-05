// Page de gestion des clients
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
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MdSearch, MdAdd, MdPeople, MdWarning, MdFilterList, MdBusiness, MdPerson } from 'react-icons/md';
import Card from 'components/card/Card';
import StatCard from 'components/card/StatCard';
import ClientCard from 'components/card/ClientCard';
import { clients } from 'data/autoPartsData';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // 'all', 'business', 'individual'
  const [scoreFilter, setScoreFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // Filtrage
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || client.type === typeFilter;
    
    let matchesScore = true;
    if (scoreFilter === 'high') matchesScore = client.creditScore >= 85;
    else if (scoreFilter === 'medium') matchesScore = client.creditScore >= 60 && client.creditScore < 85;
    else if (scoreFilter === 'low') matchesScore = client.creditScore < 60;
    
    return matchesSearch && matchesType && matchesScore;
  });

  // Statistiques
  const totalClients = clients.length;
  const businessClients = clients.filter(c => c.type === 'business').length;
  const individualClients = clients.filter(c => c.type === 'individual').length;
  const totalDebt = clients.reduce((acc, c) => acc + c.currentDebt, 0);
  const overdueDebt = clients.reduce((acc, c) => acc + c.overdueDebt, 0);
  const totalRevenue = clients.reduce((acc, c) => acc + c.totalPurchases, 0);
  const averageScore = Math.round(clients.reduce((acc, c) => acc + c.creditScore, 0) / clients.length);

  const handleSelectClient = (client) => {
    alert(`Détails du client: ${client.name}`);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Stats */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
        <StatCard
          name="Total Clients"
          value={totalClients}
          subtitle={`${businessClients} sociétés, ${individualClients} particuliers`}
          icon={MdPeople}
        />
        <StatCard
          name="Créances Clients"
          value={`${totalDebt.toLocaleString()} DH`}
          subtitle={overdueDebt > 0 ? `${overdueDebt.toLocaleString()} DH en retard` : 'Aucun retard'}
          growth={overdueDebt > 0 ? `-${Math.round((overdueDebt / totalDebt) * 100)}%` : '+0%'}
          icon={MdWarning}
        />
        <StatCard
          name="Chiffre d'Affaires"
          value={`${totalRevenue.toLocaleString()} DH`}
          growth="+12%"
        />
        <StatCard
          name="Score Moyen"
          value={`${averageScore}/100`}
          subtitle="Crédibilité moyenne"
        />
      </SimpleGrid>

      {/* Filtres et recherche */}
      <Card p="20px" mb="20px">
        <Flex gap="15px" align="center" wrap="wrap">
          <InputGroup flex="1" minW="250px">
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="secondaryGray.600" />
            </InputLeftElement>
            <Input
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            maxW="200px"
            icon={<Icon as={MdFilterList} />}
          >
            <option value="all">Tous les types</option>
            <option value="business">Sociétés</option>
            <option value="individual">Particuliers</option>
          </Select>

          <Select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            maxW="200px"
          >
            <option value="all">Tous les scores</option>
            <option value="high">Score élevé (≥85)</option>
            <option value="medium">Score moyen (60-84)</option>
            <option value="low">Score faible (&lt;60)</option>
          </Select>

          <Button leftIcon={<Icon as={MdAdd} />} colorScheme="brand">
            Nouveau Client
          </Button>
        </Flex>
      </Card>

      {/* Résultats */}
      <Text fontSize="sm" color="secondaryGray.600" mb="15px">
        {filteredClients.length} client(s) trouvé(s)
      </Text>

      {/* Grille clients */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onSelect={handleSelectClient}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
