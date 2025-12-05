// Page de gestion du stock
import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  Button,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  Grid,
  Badge,
} from '@chakra-ui/react';
import { MdSearch, MdAdd, MdFilterList } from 'react-icons/md';
import Card from 'components/card/Card';
import PartCard from 'components/card/PartCard';
import { parts as initialParts, categories, suppliers } from 'data/autoPartsData';

export default function StockManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parts, setParts] = useState(initialParts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');

  // Filtrage
  const filteredParts = parts
    .filter((part) => {
      const matchesSearch =
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.brand.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || part.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stock') return a.stock - b.stock;
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

  // Stats rapides
  const totalParts = parts.length;
  const totalStockValue = parts.reduce(
    (acc, part) => acc + part.cost * part.stock,
    0
  );
  const lowStockCount = parts.filter((p) => p.stock <= p.minStock).length;

  const handleViewPart = (part) => {
    alert(`Voir détails de: ${part.name}`);
  };

  const handleAddToCart = (part) => {
    alert(`Ajouter au panier: ${part.name}`);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* Stats rapides */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px" mb="20px">
        <Card p="20px">
          <Text fontSize="sm" color="secondaryGray.600" mb="5px">
            Total Pièces
          </Text>
          <Text fontSize="34px" color={textColor} fontWeight="700">
            {totalParts}
          </Text>
        </Card>
        <Card p="20px">
          <Text fontSize="sm" color="secondaryGray.600" mb="5px">
            Valeur Stock Total
          </Text>
          <Text fontSize="34px" color={brandColor} fontWeight="700">
            {totalStockValue.toLocaleString()} DH
          </Text>
        </Card>
        <Card p="20px">
          <Text fontSize="sm" color="secondaryGray.600" mb="5px">
            Alertes Stock Bas
          </Text>
          <Flex align="center">
            <Text fontSize="34px" color="red.500" fontWeight="700">
              {lowStockCount}
            </Text>
            {lowStockCount > 0 && (
              <Badge colorScheme="red" ml="10px" fontSize="sm">
                Action requise
              </Badge>
            )}
          </Flex>
        </Card>
      </SimpleGrid>

      {/* Barre de recherche et filtres */}
      <Card p="20px" mb="20px">
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr auto' }}
          gap="15px"
          alignItems="center"
        >
          {/* Recherche */}
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="secondaryGray.600" />
            </InputLeftElement>
            <Input
              placeholder="Rechercher par nom, référence, marque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

          {/* Filtre catégorie */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </Select>

          {/* Tri */}
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">Trier par nom</option>
            <option value="stock">Trier par stock</option>
            <option value="price">Trier par prix</option>
          </Select>

          {/* Bouton ajouter */}
          <Button
            leftIcon={<Icon as={MdAdd} />}
            colorScheme="brand"
            onClick={onOpen}
          >
            Ajouter Pièce
          </Button>
        </Grid>

        {/* Résultats */}
        <Flex mt="15px" justify="space-between" align="center">
          <Text fontSize="sm" color="secondaryGray.600">
            {filteredParts.length} pièce(s) trouvée(s)
          </Text>
          {searchTerm && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSearchTerm('')}
            >
              Réinitialiser
            </Button>
          )}
        </Flex>
      </Card>

      {/* Grille de pièces */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap="20px">
        {filteredParts.map((part) => (
          <PartCard
            key={part.id}
            part={part}
            onView={handleViewPart}
            onAddToCart={handleAddToCart}
          />
        ))}
      </SimpleGrid>

      {/* Modal ajout pièce */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter une nouvelle pièce</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="20px">
            <Flex direction="column" gap="15px">
              <FormControl>
                <FormLabel>Référence</FormLabel>
                <Input placeholder="Ex: PLQ-FR-2089-AV" />
              </FormControl>

              <FormControl>
                <FormLabel>Nom de la pièce</FormLabel>
                <Input placeholder="Ex: Plaquettes de frein avant" />
              </FormControl>

              <Grid templateColumns="1fr 1fr" gap="15px">
                <FormControl>
                  <FormLabel>Catégorie</FormLabel>
                  <Select>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Marque</FormLabel>
                  <Input placeholder="Ex: Bosch" />
                </FormControl>
              </Grid>

              <Grid templateColumns="1fr 1fr 1fr" gap="15px">
                <FormControl>
                  <FormLabel>Prix de vente (DH)</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Prix d'achat (DH)</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Stock initial</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </Grid>

              <FormControl>
                <FormLabel>Fournisseur</FormLabel>
                <Select>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description de la pièce..."
                  rows={3}
                />
              </FormControl>

              <Flex gap="10px" mt="10px">
                <Button flex="1" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
                <Button flex="1" colorScheme="brand" onClick={onClose}>
                  Ajouter
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
