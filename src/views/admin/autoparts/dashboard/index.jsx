/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Box,
  SimpleGrid,
  Grid,
  Flex,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import {
  MdAttachMoney,
  MdShoppingCart,
  MdInventory,
  MdTrendingUp,
  MdWarning,
  MdCheckCircle,
  MdPending,
} from 'react-icons/md';

// Custom components
import StatCard from 'components/card/StatCard';
import Card from 'components/card/Card';
import LineChart from 'components/charts/LineChart';
import BarChart from 'components/charts/BarChart';
import PieChart from 'components/charts/PieChart';

// Data
import {
  parts,
  sales,
  purchases,
  recentActivities,
  salesOverTime,
  categoryDistribution,
} from 'data/autoPartsData';

export default function Dashboard() {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'navy.700');

  // Calculs KPIs
  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalPurchases = purchases.reduce((acc, purchase) => acc + purchase.total, 0);
  const netProfit = totalSales - totalPurchases;
  const totalStockValue = parts.reduce(
    (acc, part) => acc + part.cost * part.stock,
    0
  );

  // Données pour le graphique des ventes
  const salesChartData = [
    {
      name: 'Ventes',
      data: salesOverTime.map((item) => item.sales),
    },
    {
      name: 'Achats',
      data: salesOverTime.map((item) => item.purchases),
    },
  ];

  const salesChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: salesOverTime.map((item) => item.month),
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
          fontWeight: '500',
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
    },
    grid: {
      show: false,
    },
    colors: ['#4318FF', '#6AD2FF'],
  };

  // Données pour le pie chart des catégories
  const categoryChartData = categoryDistribution.map((item) => item.value);
  const categoryChartOptions = {
    labels: categoryDistribution.map((item) => item.category),
    colors: ['#4318FF', '#6AD2FF', '#EFF4FB', '#868CFF', '#4FD1C5', '#F6AD55'],
    chart: {
      width: '100%',
    },
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
    },
  };

  // Stock bas
  const lowStockParts = parts.filter((part) => part.stock <= part.minStock);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* KPI Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="20px" mb="20px">
        <StatCard
          name="Total Ventes"
          value={`${totalSales.toLocaleString()} DH`}
          growth="+12.5%"
          icon={MdShoppingCart}
        />
        <StatCard
          name="Total Achats"
          value={`${totalPurchases.toLocaleString()} DH`}
          growth="+8.3%"
          icon={MdAttachMoney}
        />
        <StatCard
          name="Bénéfice Net"
          value={`${netProfit.toLocaleString()} DH`}
          growth="+18.2%"
          icon={MdTrendingUp}
        />
        <StatCard
          name="Valeur Stock"
          value={`${totalStockValue.toLocaleString()} DH`}
          icon={MdInventory}
        />
      </SimpleGrid>

      {/* Charts */}
      <Grid
        templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
        gap="20px"
        mb="20px"
      >
        <Card p="20px">
          <Flex direction="column" h="100%">
            <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
              Ventes vs Achats
            </Text>
            <Box h="300px">
              <LineChart
                chartData={salesChartData}
                chartOptions={salesChartOptions}
              />
            </Box>
          </Flex>
        </Card>

        <Card p="20px">
          <Flex direction="column" h="100%">
            <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
              Distribution par Catégorie
            </Text>
            <Box h="300px">
              <PieChart
                chartData={categoryChartData}
                chartOptions={categoryChartOptions}
              />
            </Box>
          </Flex>
        </Card>
      </Grid>

      {/* Activities & Alerts */}
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="20px">
        {/* Activités récentes */}
        <Card p="20px">
          <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
            Activités Récentes
          </Text>
          <Flex direction="column" gap="15px">
            {recentActivities.map((activity) => {
              const statusConfig = {
                success: { color: 'green.500', icon: MdCheckCircle },
                warning: { color: 'orange.500', icon: MdWarning },
                info: { color: 'blue.500', icon: MdCheckCircle },
                pending: { color: 'gray.500', icon: MdPending },
              };

              const config = statusConfig[activity.status];

              return (
                <Flex
                  key={activity.id}
                  align="center"
                  p="15px"
                  bg={boxBg}
                  borderRadius="15px"
                >
                  <Icon
                    as={config.icon}
                    w="24px"
                    h="24px"
                    color={config.color}
                    mr="15px"
                  />
                  <Box flex="1">
                    <Text fontSize="sm" color={textColor} fontWeight="600">
                      {activity.description}
                    </Text>
                    <Text fontSize="xs" color="secondaryGray.600">
                      {activity.date}
                    </Text>
                  </Box>
                  {activity.amount && (
                    <Text
                      fontSize="md"
                      color={brandColor}
                      fontWeight="700"
                      ml="10px"
                    >
                      {activity.amount.toLocaleString()} DH
                    </Text>
                  )}
                </Flex>
              );
            })}
          </Flex>
        </Card>

        {/* Alertes Stock Bas */}
        <Card p="20px">
          <Text fontSize="lg" color={textColor} fontWeight="700" mb="20px">
            Alertes Stock Bas
          </Text>
          <Flex direction="column" gap="15px">
            {lowStockParts.length === 0 ? (
              <Flex align="center" justify="center" h="200px">
                <Text color="secondaryGray.600">Aucune alerte stock</Text>
              </Flex>
            ) : (
              lowStockParts.map((part) => (
                <Flex
                  key={part.id}
                  align="center"
                  p="15px"
                  bg={boxBg}
                  borderRadius="15px"
                  borderLeft="4px solid"
                  borderColor="red.500"
                >
                  <Icon
                    as={MdWarning}
                    w="24px"
                    h="24px"
                    color="red.500"
                    mr="15px"
                  />
                  <Box flex="1">
                    <Text fontSize="sm" color={textColor} fontWeight="600">
                      {part.name}
                    </Text>
                    <Text fontSize="xs" color="secondaryGray.600">
                      Ref: {part.reference}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="lg" color="red.500" fontWeight="700">
                      {part.stock}
                    </Text>
                    <Text fontSize="xs" color="secondaryGray.600">
                      Min: {part.minStock}
                    </Text>
                  </Box>
                </Flex>
              ))
            )}
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
}
