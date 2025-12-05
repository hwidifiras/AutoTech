// Page de recherche avancée de pièces
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
  Grid,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Divider,
} from '@chakra-ui/react';
import { MdSearch, MdCarCrash, MdCheckCircle } from 'react-icons/md';
import Card from 'components/card/Card';
import {
  parts as allParts,
  carModels,
  carBrands,
  categories,
} from 'data/autoPartsData';

export default function PartFinder() {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [compatibleParts, setCompatibleParts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const bgHover = useColorModeValue('gray.50', 'navy.700');

  // Filtrer les modèles selon la marque
  const availableModels = selectedBrand
    ? carModels.filter((model) => model.brand === selectedBrand)
    : [];

  // Rechercher les pièces compatibles
  const handleSearch = () => {
    if (!selectedModel) {
      alert('Veuillez sélectionner un modèle de voiture');
      return;
    }

    const modelData = carModels.find((m) => m.id === parseInt(selectedModel));

    let results = allParts.filter((part) =>
      part.compatibleModels.includes(modelData.id)
    );

    // Filtrer par catégorie si sélectionnée
    if (selectedCategory) {
      results = results.filter((part) => part.category === selectedCategory);
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      results = results.filter(
        (part) =>
          part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          part.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setCompatibleParts(results);
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedCategory('');
    setSearchTerm('');
    setCompatibleParts([]);
    setShowResults(false);
  };

  const selectedModelData = carModels.find(
    (m) => m.id === parseInt(selectedModel)
  );

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* En-tête */}
      <Card p="30px" mb="20px">
        <Flex align="center" mb="20px">
          <Icon
            as={MdCarCrash}
            w="40px"
            h="40px"
            color={brandColor}
            mr="15px"
          />
          <Box>
            <Text fontSize="2xl" color={textColor} fontWeight="700">
              Recherche Intelligente de Pièces
            </Text>
            <Text fontSize="sm" color="secondaryGray.600">
              Trouvez les pièces compatibles avec votre véhicule
            </Text>
          </Box>
        </Flex>

        <Divider mb="20px" />

        {/* Formulaire de recherche */}
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="15px"
          mb="20px"
        >
          {/* Marque */}
          <Select
            placeholder="Sélectionnez une marque"
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setSelectedModel('');
              setShowResults(false);
            }}
            size="lg"
          >
            {carBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </Select>

          {/* Modèle */}
          <Select
            placeholder="Sélectionnez un modèle"
            value={selectedModel}
            onChange={(e) => {
              setSelectedModel(e.target.value);
              setShowResults(false);
            }}
            size="lg"
            isDisabled={!selectedBrand}
          >
            {availableModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.model} ({model.year})
              </option>
            ))}
          </Select>

          {/* Catégorie (optionnel) */}
          <Select
            placeholder="Catégorie (optionnel)"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setShowResults(false);
            }}
            size="lg"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </Select>

          {/* Recherche texte */}
          <InputGroup size="lg">
            <InputLeftElement pointerEvents="none">
              <Icon as={MdSearch} color="secondaryGray.600" />
            </InputLeftElement>
            <Input
              placeholder="Mots-clés..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(false);
              }}
            />
          </InputGroup>
        </Grid>

        {/* Boutons d'action */}
        <Flex gap="15px">
          <Button
            colorScheme="brand"
            size="lg"
            flex="1"
            onClick={handleSearch}
            isDisabled={!selectedModel}
          >
            🔍 Rechercher les pièces compatibles
          </Button>
          <Button
            variant="outline"
            colorScheme="gray"
            size="lg"
            onClick={handleReset}
          >
            Réinitialiser
          </Button>
        </Flex>

        {/* Véhicule sélectionné */}
        {selectedModelData && (
          <Flex
            mt="20px"
            p="15px"
            bg={bgHover}
            borderRadius="15px"
            align="center"
          >
            <Icon as={MdCheckCircle} color="green.500" w="24px" h="24px" mr="10px" />
            <Text fontSize="md" color={textColor} fontWeight="600">
              Véhicule sélectionné: {selectedModelData.brand}{' '}
              {selectedModelData.model} ({selectedModelData.year})
            </Text>
          </Flex>
        )}
      </Card>

      {/* Résultats */}
      {showResults && (
        <Card p="20px">
          <Flex justify="space-between" align="center" mb="20px">
            <Text fontSize="xl" color={textColor} fontWeight="700">
              Pièces Compatibles
            </Text>
            <Badge colorScheme="green" fontSize="lg" p="10px" borderRadius="10px">
              {compatibleParts.length} résultat(s)
            </Badge>
          </Flex>

          {compatibleParts.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              py="60px"
            >
              <Text fontSize="lg" color="secondaryGray.600" mb="10px">
                Aucune pièce trouvée
              </Text>
              <Text fontSize="sm" color="secondaryGray.600">
                Essayez de modifier vos critères de recherche
              </Text>
            </Flex>
          ) : (
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Image</Th>
                    <Th>Référence</Th>
                    <Th>Nom</Th>
                    <Th>Catégorie</Th>
                    <Th>Marque</Th>
                    <Th>Stock</Th>
                    <Th>Prix</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {compatibleParts.map((part) => (
                    <Tr
                      key={part.id}
                      _hover={{ bg: bgHover }}
                      transition="all 0.2s"
                    >
                      <Td>
                        <Image
                          src={part.images[0]}
                          w="60px"
                          h="60px"
                          objectFit="cover"
                          borderRadius="10px"
                        />
                      </Td>
                      <Td>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          {part.reference}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" fontWeight="600" color={textColor}>
                          {part.name}
                        </Text>
                      </Td>
                      <Td>
                        <Badge colorScheme="purple">{part.category}</Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme="blue">{part.brand}</Badge>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={
                            part.stock <= part.minStock ? 'red' : 'green'
                          }
                        >
                          {part.stock}
                        </Badge>
                      </Td>
                      <Td>
                        <Text
                          fontSize="md"
                          fontWeight="700"
                          color={brandColor}
                        >
                          {part.price} DH
                        </Text>
                      </Td>
                      <Td>
                        <Button size="sm" colorScheme="brand">
                          Détails
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </Card>
      )}
    </Box>
  );
}
