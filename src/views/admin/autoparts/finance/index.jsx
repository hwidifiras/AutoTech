// Page Vue Financière
import React from 'react';
import {
  Box,
  SimpleGrid,
  Flex,
  Text,
  useColorModeValue,
  Grid,
  Icon,
} from '@chakra-ui/react';
import {
  MdAttachMoney,
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalance,
} from 'react-icons/md';
import Card from 'components/card/Card';
import StatCard from 'components/card/StatCard';
import LineChart from 'components/charts/LineChart';
import BarChart from 'components/charts/BarChart';
import { sales, purchases, salesOverTime } from 'data/autoPartsData';

export default function Finance() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');

  // Calculs
  const totalRevenue = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalExpenses = purchases.reduce((acc, purchase) => acc + purchase.total, 0);
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = ((netProfit / totalRevenue) * 100).toFixed(1);

  // Données pour graphique cashflow
  const cashflowData = [
    {
      name: 'Revenus',
      data: salesOverTime.map((item) => item.sales),
    },
    {
      name: 'Dépenses',
      data: salesOverTime.map((item) => item.purchases),
    },
    {
      name: 'Bénéfice',
      data: salesOverTime.map((item) => item.sales - item.purchases),
    },
  ];

  const cashflowOptions = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 3 },
    xaxis: {
      categories: salesOverTime.map((item) => item.month),
      labels: {
        style: { colors: '#A3AED0', fontSize: '12px' },
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#A3AED0', fontSize: '12px' },
      },
    },
    legend: { show: true, position: 'top' },
    grid: { show: false },
    colors: ['#4318FF', '#FF5757', '#01B574'],
  };

  // Données pour bar chart mensuel
  const monthlyData = [
    {
      name: 'Ventes',
      data: salesOverTime.slice(-6).map((item) => item.sales),
    },
    {
      name: 'Achats',
      data: salesOverTime.slice(-6).map((item) => item.purchases),
    },
  ];

  const monthlyOptions = {
    chart: {
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: '60%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: salesOverTime.slice(-6).map((item) => item.month),
      labels: {
        style: { colors: '#A3AED0', fontSize: '12px' },
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#A3AED0', fontSize: '12px' },
      },
    },
    legend: { show: true, position: 'top' },
    colors: ['#4318FF', '#6AD2FF'],
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* KPIs Financiers */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
        <StatCard
          name="Revenus Total"
          value={`${totalRevenue.toLocaleString()} DH`}
          growth="+12.5%"
          icon={MdAttachMoney}
        />
        <StatCard
          name="Dépenses Total"
          value={`${totalExpenses.toLocaleString()} DH`}
          growth="+8.3%"
          icon={MdTrendingDown}
        />
        <StatCard
          name="Bénéfice Net"
          value={`${netProfit.toLocaleString()} DH`}
          growth="+18.2%"
          icon={MdTrendingUp}
        />
        <StatCard
          name="Marge Bénéficiaire"
          value={`${profitMargin}%`}
          icon={MdAccountBalance}
        />
      </SimpleGrid>

      {/* Graphiques */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr' }} gap="20px" mb="20px">
        <Card p="20px">
          <Text fontSize="xl" color={textColor} fontWeight="700" mb="20px">
            Cashflow Annuel
          </Text>
          <Box h="350px">
            <LineChart chartData={cashflowData} chartOptions={cashflowOptions} />
          </Box>
        </Card>
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="20px">
        <Card p="20px">
          <Text fontSize="xl" color={textColor} fontWeight="700" mb="20px">
            Comparaison 6 Derniers Mois
          </Text>
          <Box h="300px">
            <BarChart chartData={monthlyData} chartOptions={monthlyOptions} />
          </Box>
        </Card>

        {/* Répartition */}
        <Card p="20px">
          <Text fontSize="xl" color={textColor} fontWeight="700" mb="20px">
            Répartition Financière
          </Text>
          <Flex direction="column" gap="20px" mt="30px">
            <Flex align="center" justify="space-between" p="15px" bg="green.50" borderRadius="15px">
              <Flex align="center">
                <Icon as={MdTrendingUp} w="24px" h="24px" color="green.500" mr="15px" />
                <Text fontSize="md" fontWeight="600" color={textColor}>
                  Revenus Total
                </Text>
              </Flex>
              <Text fontSize="xl" fontWeight="700" color="green.500">
                {totalRevenue.toLocaleString()} DH
              </Text>
            </Flex>

            <Flex align="center" justify="space-between" p="15px" bg="red.50" borderRadius="15px">
              <Flex align="center">
                <Icon as={MdTrendingDown} w="24px" h="24px" color="red.500" mr="15px" />
                <Text fontSize="md" fontWeight="600" color={textColor}>
                  Dépenses Total
                </Text>
              </Flex>
              <Text fontSize="xl" fontWeight="700" color="red.500">
                {totalExpenses.toLocaleString()} DH
              </Text>
            </Flex>

            <Flex align="center" justify="space-between" p="15px" bg="blue.50" borderRadius="15px">
              <Flex align="center">
                <Icon as={MdAttachMoney} w="24px" h="24px" color={brandColor} mr="15px" />
                <Text fontSize="md" fontWeight="600" color={textColor}>
                  Bénéfice Net
                </Text>
              </Flex>
              <Text fontSize="xl" fontWeight="700" color={brandColor}>
                {netProfit.toLocaleString()} DH
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
}
